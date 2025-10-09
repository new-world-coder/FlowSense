import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  authenticateFlow,
  unauthenticateFlow,
  subscribeToFlowAuth,
  getFlowBalance,
  deployContract as flowDeployContract,
  verifyTransaction as flowVerifyTransaction,
} from '../utils/flow';

const FlowContext = createContext();

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};

export const FlowProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0.0000');
  const [error, setError] = useState(null);

  // Subscribe to Flow authentication state
  useEffect(() => {
    const unsubscribe = subscribeToFlowAuth((currentUser) => {
      if (currentUser.loggedIn) {
        setUser({
          address: currentUser.addr,
          loggedIn: true,
        });
        // Fetch balance when user connects
        fetchBalance(currentUser.addr);
      } else {
        setUser(null);
        setBalance('0.0000');
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const fetchBalance = async (address) => {
    try {
      const bal = await getFlowBalance(address);
      setBalance(bal);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
      setBalance('0.0000');
    }
  };

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await authenticateFlow();
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    unauthenticateFlow();
    setUser(null);
    setBalance('0.0000');
    setError(null);
  };

  const refreshBalance = async () => {
    if (user?.address) {
      await fetchBalance(user.address);
    }
  };

  const deployContract = async (contractCode, contractName) => {
    if (!user?.loggedIn) {
      throw new Error('Please connect your Flow wallet first');
    }

    try {
      const result = await flowDeployContract(contractCode, contractName);
      return result;
    } catch (err) {
      throw new Error(err.message || 'Failed to deploy contract');
    }
  };

  const verifyTransaction = async (txId) => {
    try {
      const result = await flowVerifyTransaction(txId);
      return result;
    } catch (err) {
      throw new Error(err.message || 'Failed to verify transaction');
    }
  };

  const value = {
    user,
    isConnected: !!user?.loggedIn,
    isConnecting,
    balance,
    error,
    connect,
    disconnect,
    refreshBalance,
    deployContract,
    verifyTransaction,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

