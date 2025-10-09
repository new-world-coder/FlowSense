import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LogOut, Loader2, RefreshCw } from 'lucide-react';
import { useFlow } from '../context/FlowContext';
import { formatFlowAddress } from '../utils/flow';

const FlowWalletButton = ({ minimal = false }) => {
  const { user, isConnected, isConnecting, balance, connect, disconnect, refreshBalance } = useFlow();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    try {
      await refreshBalance();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (minimal) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isConnected ? () => setShowDropdown(!showDropdown) : connect}
        disabled={isConnecting}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 text-white"
      >
        {isConnecting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Connecting...
          </>
        ) : isConnected ? (
          <>
            <Wallet className="w-4 h-4" />
            {formatFlowAddress(user.address)}
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </>
        )}
      </motion.button>
    );
  }

  return (
    <div className="relative">
      {!isConnected ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={connect}
          disabled={isConnecting}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              Connect Flow Wallet
            </>
          )}
        </motion.button>
      ) : (
        <>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatFlowAddress(user.address, 6)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {balance} FLOW
              </p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                showDropdown ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>

          <AnimatePresence>
            {showDropdown && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Flow Address</p>
                    <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                      {user.address}
                    </p>
                  </div>

                  <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Balance</p>
                      <button
                        onClick={handleRefreshBalance}
                        disabled={isRefreshing}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                        title="Refresh balance"
                      >
                        <RefreshCw className={`w-3 h-3 text-gray-600 dark:text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {balance} <span className="text-sm font-normal text-gray-600 dark:text-gray-400">FLOW</span>
                    </p>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        disconnect();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Disconnect Wallet</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default FlowWalletButton;

