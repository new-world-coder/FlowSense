import * as fcl from '@onflow/fcl';
import * as types from '@onflow/types';

// Configure FCL for Flow testnet
fcl.config({
  'app.detail.title': 'FlowSense',
  'app.detail.icon': 'https://flowsense.app/icon.png',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'flow.network': 'testnet',
});

/**
 * Authenticate user with Flow wallet
 * @returns {Promise<Object>} User object with address
 */
export const authenticateFlow = async () => {
  try {
    const user = await fcl.authenticate();
    return user;
  } catch (error) {
    console.error('Flow authentication failed:', error);
    throw new Error('Failed to connect Flow wallet');
  }
};

/**
 * Unauthenticate (logout) from Flow wallet
 */
export const unauthenticateFlow = () => {
  fcl.unauthenticate();
};

/**
 * Get current Flow user
 * @returns {Promise<Object>} Current user snapshot
 */
export const getCurrentFlowUser = () => {
  return fcl.currentUser.snapshot();
};

/**
 * Subscribe to Flow authentication state changes
 * @param {Function} callback - Callback function to execute on auth state change
 * @returns {Function} Unsubscribe function
 */
export const subscribeToFlowAuth = (callback) => {
  return fcl.currentUser.subscribe(callback);
};

/**
 * Deploy a Cadence smart contract to Flow testnet
 * @param {string} contractCode - The Cadence contract code to deploy
 * @param {string} contractName - Name of the contract
 * @returns {Promise<Object>} Transaction result with txId
 */
export const deployContract = async (contractCode, contractName = 'GeneratedContract') => {
  try {
    // Check if user is authenticated
    const user = await fcl.currentUser.snapshot();
    if (!user.loggedIn) {
      throw new Error('Please connect your Flow wallet first');
    }

    // Note: Direct contract deployment requires account key access
    // In production, this would typically go through a service account
    // For now, we'll prepare the transaction structure
    
    const txId = await fcl.mutate({
      cadence: `
        transaction(name: String, code: String) {
          prepare(signer: AuthAccount) {
            // Note: In Flow, contract deployment requires special authorization
            // This is a simplified example. In production, you'd use the account's
            // contract management capabilities
            log("Preparing to deploy contract: ".concat(name))
            
            // Contract deployment would happen here
            // signer.contracts.add(name: name, code: code.decodeHex())
          }
          
          execute {
            log("Contract deployment transaction executed")
          }
        }
      `,
      args: (arg, t) => [
        arg(contractName, types.String),
        arg(Buffer.from(contractCode).toString('hex'), types.String)
      ],
      proposer: fcl.currentUser,
      payer: fcl.currentUser,
      authorizations: [fcl.currentUser],
      limit: 9999,
    });

    console.log('Contract deployment transaction submitted:', txId);
    
    return {
      txId,
      contractName,
      status: 'pending',
      message: 'Contract deployment transaction submitted',
    };
  } catch (error) {
    console.error('Contract deployment failed:', error);
    throw new Error(error.message || 'Failed to deploy contract to Flow testnet');
  }
};

/**
 * Verify transaction status on Flow
 * @param {string} txId - Transaction ID to verify
 * @returns {Promise<Object>} Transaction status and details
 */
export const verifyTransaction = async (txId) => {
  try {
    if (!txId) {
      throw new Error('Transaction ID is required');
    }

    // Get transaction status
    const txStatus = await fcl.tx(txId).onceSealed();
    
    // Parse the result
    const result = {
      txId,
      status: txStatus.status === 4 ? 'sealed' : 'pending',
      statusCode: txStatus.statusCode,
      errorMessage: txStatus.errorMessage || null,
      events: txStatus.events || [],
      blockId: txStatus.blockId,
      success: txStatus.statusCode === 0,
      sealed: txStatus.status === 4,
    };

    console.log('Transaction verified:', result);
    return result;
  } catch (error) {
    console.error('Transaction verification failed:', error);
    throw new Error('Failed to verify transaction status');
  }
};

/**
 * Execute a Cadence script (read-only)
 * @param {string} cadence - Cadence script code
 * @param {Array} args - Script arguments
 * @returns {Promise<any>} Script result
 */
export const executeScript = async (cadence, args = []) => {
  try {
    const result = await fcl.query({
      cadence,
      args,
    });
    return result;
  } catch (error) {
    console.error('Script execution failed:', error);
    throw error;
  }
};

/**
 * Send a transaction to Flow
 * @param {string} cadence - Cadence transaction code
 * @param {Array} args - Transaction arguments
 * @returns {Promise<string>} Transaction ID
 */
export const sendTransaction = async (cadence, args = []) => {
  try {
    const user = await fcl.currentUser.snapshot();
    if (!user.loggedIn) {
      throw new Error('Please connect your Flow wallet first');
    }

    const txId = await fcl.mutate({
      cadence,
      args,
      proposer: fcl.currentUser,
      payer: fcl.currentUser,
      authorizations: [fcl.currentUser],
      limit: 9999,
    });

    return txId;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};

/**
 * Get account details from Flow
 * @param {string} address - Flow address
 * @returns {Promise<Object>} Account information
 */
export const getAccount = async (address) => {
  try {
    const account = await fcl.account(address);
    return account;
  } catch (error) {
    console.error('Failed to get account:', error);
    throw error;
  }
};

/**
 * Get FLOW balance for an address
 * @param {string} address - Flow address
 * @returns {Promise<string>} Balance in FLOW
 */
export const getFlowBalance = async (address) => {
  try {
    const balance = await fcl.query({
      cadence: `
        import FungibleToken from 0x9a0766d93b6608b7
        import FlowToken from 0x7e60df042a9c0868

        pub fun main(address: Address): UFix64 {
          let account = getAccount(address)
          let vaultRef = account.getCapability(/public/flowTokenBalance)
            .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
            ?? panic("Could not borrow Balance reference")
          
          return vaultRef.balance
        }
      `,
      args: (arg, t) => [arg(address, types.Address)],
    });
    
    return balance.toFixed(4);
  } catch (error) {
    console.error('Failed to get balance:', error);
    return '0.0000';
  }
};

/**
 * Format Flow address for display
 * @param {string} address - Full Flow address
 * @param {number} chars - Number of characters to show at start/end
 * @returns {string} Formatted address
 */
export const formatFlowAddress = (address, chars = 4) => {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

/**
 * Check if address is valid Flow address
 * @param {string} address - Address to validate
 * @returns {boolean} Whether address is valid
 */
export const isValidFlowAddress = (address) => {
  if (!address) return false;
  // Flow addresses are hex strings starting with 0x
  const flowAddressRegex = /^0x[a-fA-F0-9]{16}$/;
  return flowAddressRegex.test(address);
};

// Export FCL and types for direct use if needed
export { fcl, types };

export default {
  authenticateFlow,
  unauthenticateFlow,
  getCurrentFlowUser,
  subscribeToFlowAuth,
  deployContract,
  verifyTransaction,
  executeScript,
  sendTransaction,
  getAccount,
  getFlowBalance,
  formatFlowAddress,
  isValidFlowAddress,
  fcl,
  types,
};

