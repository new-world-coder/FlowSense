import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, Coins, ShoppingCart, Users, Lock } from 'lucide-react';

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: 'NFT Collection',
      description: 'Create and manage NFT collections with metadata',
      icon: Code,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    },
    {
      id: 2,
      name: 'Fungible Token',
      description: 'Deploy your own fungible token on Flow',
      icon: Coins,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    },
    {
      id: 3,
      name: 'Marketplace',
      description: 'Build a decentralized marketplace for trading',
      icon: ShoppingCart,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    },
    {
      id: 4,
      name: 'DAO Governance',
      description: 'Implement decentralized governance system',
      icon: Users,
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
    },
    {
      id: 5,
      name: 'Staking Contract',
      description: 'Create a staking mechanism for tokens',
      icon: Lock,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    },
    {
      id: 6,
      name: 'Custom Contract',
      description: 'Start from a blank template',
      icon: FileText,
      color: 'bg-gray-100 dark:bg-gray-700 text-gray-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4">Smart Contract Templates</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Choose from our collection of pre-built templates to kickstart your dApp development
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => {
          const Icon = template.icon;
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="card cursor-pointer"
            >
              <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{template.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {template.description}
              </p>
              <button className="btn-secondary w-full">
                Use Template
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;

