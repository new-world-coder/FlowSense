import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Download } from 'lucide-react';
import { mockTemplates } from '../../data/mockData';

const TemplatesTab = () => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Contract Templates</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Pre-built templates to accelerate your development
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-6 cursor-pointer group"
          >
            {/* Icon and Category */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-3xl">
                {template.icon}
              </div>
              <div className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-semibold">
                {template.category}
              </div>
            </div>

            {/* Template Info */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-cyan-400 transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {template.description}
              </p>
            </div>

            {/* Difficulty Badge */}
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getDifficultyColor(template.difficulty)}`}>
              {template.difficulty}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {template.uses.toLocaleString()} uses
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                {template.rating}
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group-hover:shadow-lg transition-shadow"
            >
              <Download className="w-4 h-4" />
              Use Template
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesTab;

