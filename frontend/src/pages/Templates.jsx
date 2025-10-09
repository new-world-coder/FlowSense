import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { contractTemplates, generateFromTemplate } from '../utils/templates';
import CollapsibleCodePanel from '../components/CollapsibleCodePanel';

const Templates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [templateVariables, setTemplateVariables] = useState({});
  const [showVariableModal, setShowVariableModal] = useState(false);

  const handleUseTemplate = (template) => {
    if (template.variables && template.variables.length > 0) {
      // Show modal for variable input
      setSelectedTemplate(template);
      setShowVariableModal(true);
      // Initialize with default values
      const defaults = {};
      template.variables.forEach(v => {
        defaults[v.key] = v.default;
      });
      setTemplateVariables(defaults);
    } else {
      // Generate directly if no variables
      generateContract(template, {});
    }
  };

  const generateContract = (template, variables) => {
    try {
      const code = generateFromTemplate(template.id, variables);
      setGeneratedCode(code);
      setIsPanelOpen(true);
      setShowVariableModal(false);
    } catch (error) {
      alert(error.message || 'Failed to generate contract');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Smart Contract Templates</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Choose from our collection of pre-built templates to kickstart your dApp development
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contractTemplates.map((template, index) => {
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card cursor-pointer"
            >
              <div className="text-4xl mb-4">
                {template.icon}
              </div>
              <div className="mb-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                  {template.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{template.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {template.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUseTemplate(template)}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Use Template
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Variable Input Modal */}
      {showVariableModal && selectedTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowVariableModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-w-lg w-full p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Customize {selectedTemplate.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedTemplate.description}
            </p>

            <div className="space-y-4 mb-6">
              {selectedTemplate.variables.map((variable) => (
                <div key={variable.key}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {variable.label}
                  </label>
                  <input
                    type={variable.type}
                    value={templateVariables[variable.key] || ''}
                    onChange={(e) => setTemplateVariables({
                      ...templateVariables,
                      [variable.key]: e.target.value
                    })}
                    placeholder={variable.default}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => generateContract(selectedTemplate, templateVariables)}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg"
              >
                Generate Contract
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowVariableModal(false)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Code Panel */}
      <CollapsibleCodePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        code={generatedCode}
        title="Generated from Template"
      />
    </div>
  );
};

export default Templates;

