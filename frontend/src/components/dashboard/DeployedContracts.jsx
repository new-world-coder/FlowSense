import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink, Activity, Fuel, Package } from 'lucide-react';
import { mockDeployedContracts } from '../../data/mockData';

const DeployedContracts = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'deprecated':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
      case 'paused':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };

  const getNetworkBadge = (network) => {
    return network === 'mainnet'
      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Deployed Contracts</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor your live smart contracts on Flow
        </p>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {mockDeployedContracts.map((contract, index) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Contract Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-emerald-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {contract.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getNetworkBadge(contract.network)}`}>
                        {contract.network}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        v{contract.version}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contract Address */}
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3">
                  <Package className="w-4 h-4 text-gray-500" />
                  <code className="text-sm font-mono text-gray-900 dark:text-white flex-1 truncate">
                    {contract.contractAddress}
                  </code>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                    <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transactions</p>
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4 text-emerald-600 dark:text-cyan-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {contract.transactions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gas Used</p>
                    <div className="flex items-center gap-1">
                      <Fuel className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {contract.gasUsed}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Deployed</p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(contract.deployedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex md:flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg text-sm whitespace-nowrap"
                >
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg text-sm whitespace-nowrap"
                >
                  Monitor
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {mockDeployedContracts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 glass-card"
        >
          <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No deployed contracts yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Deploy your first smart contract to see it here
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl">
            Deploy Contract
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DeployedContracts;

