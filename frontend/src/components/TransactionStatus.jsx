import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ExternalLink, Clock } from 'lucide-react';
import { useFlow } from '../context/FlowContext';

const TransactionStatus = ({ txId, onClose, autoVerify = true }) => {
  const { verifyTransaction } = useFlow();
  const [status, setStatus] = useState('pending');
  const [txData, setTxData] = useState(null);
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (autoVerify && txId) {
      checkTransaction();
    }
  }, [txId, autoVerify]);

  const checkTransaction = async () => {
    if (!txId) return;
    
    setIsVerifying(true);
    setError(null);

    try {
      const result = await verifyTransaction(txId);
      setTxData(result);
      
      if (result.sealed) {
        setStatus(result.success ? 'success' : 'failed');
      } else {
        setStatus('pending');
      }
    } catch (err) {
      setError(err.message || 'Failed to verify transaction');
      setStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'failed':
      case 'error':
        return <XCircle className="w-12 h-12 text-red-600" />;
      case 'pending':
      default:
        return <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return 'Transaction Successful!';
      case 'failed':
        return 'Transaction Failed';
      case 'error':
        return 'Verification Error';
      case 'pending':
      default:
        return 'Transaction Pending...';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'border-green-500/50 bg-green-100 dark:bg-green-900/30';
      case 'failed':
      case 'error':
        return 'border-red-500/50 bg-red-100 dark:bg-red-900/30';
      case 'pending':
      default:
        return 'border-blue-500/50 bg-blue-100 dark:bg-blue-900/30';
    }
  };

  const getBlockExplorerUrl = () => {
    return `https://testnet.flowdiver.io/tx/${txId}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`glass-card p-6 border-2 ${getStatusColor()}`}
      >
        <div className="flex flex-col items-center text-center">
          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-4"
          >
            {getStatusIcon()}
          </motion.div>

          {/* Status Message */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {getStatusMessage()}
          </h3>

          {/* Transaction ID */}
          {txId && (
            <div className="w-full mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Transaction ID</p>
              <p className="text-sm font-mono text-gray-900 dark:text-white break-all px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {txId}
              </p>
            </div>
          )}

          {/* Transaction Details */}
          {txData && (
            <div className="w-full space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {txData.sealed ? 'Sealed' : 'Pending'}
                </span>
              </div>
              {txData.blockId && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Block ID:</span>
                  <span className="font-mono text-xs text-gray-900 dark:text-white">
                    {txData.blockId.slice(0, 8)}...
                  </span>
                </div>
              )}
              {txData.events && txData.events.length > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Events:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {txData.events.length}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Error from Transaction */}
          {txData?.errorMessage && (
            <div className="w-full mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-400">{txData.errorMessage}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 w-full">
            {!isVerifying && status === 'pending' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={checkTransaction}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                <Clock className="w-4 h-4" />
                Check Status
              </motion.button>
            )}
            
            {txId && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={getBlockExplorerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View on Explorer
              </motion.a>
            )}
          </div>

          {/* Close Button */}
          {onClose && (status === 'success' || status === 'failed' || status === 'error') && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="mt-4 w-full py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
            >
              Close
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionStatus;

