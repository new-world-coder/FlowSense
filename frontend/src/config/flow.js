import * as fcl from '@onflow/fcl';

// Configure FCL for Flow testnet
fcl.config({
  'app.detail.title': 'FlowSense',
  'app.detail.icon': 'https://flowsense.app/icon.png',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'flow.network': 'testnet',
  '0xProfile': '0xba1132bc08f82fe2', // Example contract address
});

// Utility functions for Flow interactions
export const authenticate = async () => {
  try {
    await fcl.authenticate();
    return true;
  } catch (error) {
    console.error('Authentication failed:', error);
    return false;
  }
};

export const unauthenticate = () => {
  fcl.unauthenticate();
};

export const getCurrentUser = () => {
  return fcl.currentUser.snapshot();
};

export const deployContract = async (contractCode, contractName) => {
  try {
    // This is a placeholder for actual deployment logic
    // In production, this would use FCL transactions
    console.log('Deploying contract:', contractName);
    console.log('Contract code:', contractCode);
    
    // TODO: Implement actual deployment using FCL
    return {
      success: true,
      transactionId: 'placeholder-transaction-id',
    };
  } catch (error) {
    console.error('Deployment failed:', error);
    throw error;
  }
};

export default fcl;

