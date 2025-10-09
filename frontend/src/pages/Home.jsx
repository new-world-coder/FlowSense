import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, ArrowRight, Rocket, Shield, Zap } from 'lucide-react';
import CollapsibleCodePanel from '../components/CollapsibleCodePanel';
import FlowLogo from '../components/FlowLogo';
import TransactionStatus from '../components/TransactionStatus';
import { useFlow } from '../context/FlowContext';
import { contractTemplates, generateFromTemplate } from '../utils/templates';

const Home = () => {
  const [mode, setMode] = useState('safe'); // 'safe' or 'ai'
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateVariables, setTemplateVariables] = useState({});
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [deploymentTxId, setDeploymentTxId] = useState(null);
  const [showTxStatus, setShowTxStatus] = useState(false);
  const { deployContract, isConnected } = useFlow();

  const handleDeploy = async () => {
    if (!generatedCode || !isConnected) {
      alert('Please connect your Flow wallet and generate a contract first');
      return;
    }

    try {
      const result = await deployContract(generatedCode, 'GeneratedContract');
      setDeploymentTxId(result.txId);
      setShowTxStatus(true);
    } catch (error) {
      alert(error.message || 'Failed to deploy contract');
    }
  };

  const handleGenerateFromTemplate = () => {
    if (!selectedTemplate) {
      alert('Please select a contract template');
      return;
    }

    setIsGenerating(true);
    setShowTxStatus(false);
    setDeploymentTxId(null);

    // Simulate processing
    setTimeout(() => {
      try {
        const code = generateFromTemplate(selectedTemplate, templateVariables);
        setGeneratedCode(code);
        setIsPanelOpen(true);
      } catch (error) {
        alert(error.message || 'Failed to generate contract');
      } finally {
        setIsGenerating(false);
      }
    }, 800);
  };

  const handleGenerateAI = () => {
    if (!description.trim()) {
      alert('Please describe your dApp idea');
      return;
    }

    setIsGenerating(true);
    setShowTxStatus(false);
    setDeploymentTxId(null);

    // Simulate AI generation
    setTimeout(() => {
      const mockContract = `// FlowSense AI-Generated Smart Contract
// Description: ${description}

pub contract AIGeneratedContract {
    
    // Contract state
    pub var totalSupply: UInt64
    
    // Events
    pub event ContractInitialized()
    pub event ItemCreated(id: UInt64)
    
    init() {
        self.totalSupply = 0
        emit ContractInitialized()
    }
    
    // Public functions
    pub fun createItem(): UInt64 {
        let itemId = self.totalSupply
        self.totalSupply = self.totalSupply + 1
        
        emit ItemCreated(id: itemId)
        return itemId
    }
    
    pub fun getTotalSupply(): UInt64 {
        return self.totalSupply
    }
}`;
      
      setGeneratedCode(mockContract);
      setIsGenerating(false);
      setIsPanelOpen(true);
    }, 2000);
  };

  const currentTemplate = contractTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FlowLogo className="w-16 h-16" />
            <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
              FlowSense
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-white/90 drop-shadow-lg font-light"
          >
            Transform ideas into smart contracts with AI
          </motion.p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center gap-4 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('safe')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              mode === 'safe'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                : 'bg-white/20 backdrop-blur-md text-white border border-white/30'
            }`}
          >
            <Shield className="w-5 h-5" />
            Safe Mode
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('ai')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              mode === 'ai'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/20 backdrop-blur-md text-white border border-white/30'
            }`}
          >
            <Zap className="w-5 h-5" />
            AI Mode
          </motion.button>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          className="glass-card p-10"
        >
          <AnimatePresence mode="wait">
            {/* Safe Mode - Template Selection */}
            {mode === 'safe' && (
              <motion.div
                key="safe"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-white text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Select Contract Type
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => {
                      setSelectedTemplate(e.target.value);
                      setTemplateVariables({});
                    }}
                    className="w-full px-6 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-white/30 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:border-emerald-400 dark:focus:border-cyan-400 text-gray-900 dark:text-white text-lg font-medium"
                    disabled={isGenerating}
                  >
                    <option value="">Choose a template...</option>
                    {contractTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.icon} {template.name} - {template.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Template Variables */}
                {currentTemplate && currentTemplate.variables.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-white text-md font-semibold">Customize Template</h3>
                    {currentTemplate.variables.map((variable) => (
                      <div key={variable.key}>
                        <label className="block text-white/90 text-sm font-medium mb-2">
                          {variable.label}
                        </label>
                        <input
                          type={variable.type}
                          value={templateVariables[variable.key] || variable.default}
                          onChange={(e) => setTemplateVariables({
                            ...templateVariables,
                            [variable.key]: e.target.value
                          })}
                          placeholder={variable.default}
                          className="w-full px-4 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-white/30 dark:border-gray-700/50 rounded-xl focus:outline-none focus:border-emerald-400 dark:focus:border-cyan-400 text-gray-900 dark:text-white"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Template Description */}
                {currentTemplate && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{currentTemplate.icon}</span>
                      <div>
                        <p className="text-white font-semibold mb-1">{currentTemplate.name}</p>
                        <p className="text-white/80 text-sm">{currentTemplate.description}</p>
                        <p className="text-white/60 text-xs mt-1">Category: {currentTemplate.category}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Generate Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateFromTemplate}
                  disabled={isGenerating || !selectedTemplate}
                  className="w-full py-5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-purple-700 text-white text-xl font-bold rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-6 h-6" />
                      </motion.div>
                      Generating from template...
                    </>
                  ) : (
                    <>
                      <Shield className="w-6 h-6" />
                      Generate Safe Contract
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-white/70 text-sm">
                  Pre-audited templates • Production ready • Best practices included
                </p>
              </motion.div>
            )}

            {/* AI Mode - Custom Generation */}
            {mode === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-white text-lg font-semibold mb-3 flex items-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    Describe your dApp idea
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Example: Create an NFT marketplace where users can mint, buy, and sell digital art with royalties..."
                    className="w-full h-40 px-6 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-white/30 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:border-purple-400 dark:focus:border-pink-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-300 text-lg"
                    disabled={isGenerating}
                  />
                </div>

                {/* Generate Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateAI}
                  disabled={isGenerating || !description.trim()}
                  className="w-full py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-6 h-6" />
                      </motion.div>
                      AI is generating your contract...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Generate with AI
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-white/70 text-sm">
                  Powered by AI • Optimized for Flow Blockchain • Production Ready
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Deploy Button - Show when contract is generated */}
        {generatedCode && !showTxStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDeploy}
              disabled={!isConnected}
              className="w-full py-5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white text-xl font-bold rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Rocket className="w-6 h-6" />
              {isConnected ? 'Deploy to Flow Testnet' : 'Connect Wallet to Deploy'}
            </motion.button>
            <p className="text-center text-white/60 text-sm mt-2">
              {isConnected ? 'Deploy your generated contract to Flow testnet' : 'Connect your Flow wallet first'}
            </p>
          </motion.div>
        )}

        {/* Transaction Status - Show when deploying */}
        {showTxStatus && deploymentTxId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <TransactionStatus
              txId={deploymentTxId}
              onClose={() => setShowTxStatus(false)}
              autoVerify={true}
            />
          </motion.div>
        )}

        {/* Features Pills */}
        {!generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {mode === 'safe' 
              ? ['Pre-Audited', 'Production Ready', 'Best Practices', 'Instant Deploy'].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-emerald-400/30"
                  >
                    {feature}
                  </motion.div>
                ))
              : ['AI-Powered', 'Custom Logic', 'Optimized', 'Secure'].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2 bg-purple-500/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-purple-400/30"
                  >
                    {feature}
                  </motion.div>
                ))
            }
          </motion.div>
        )}
      </motion.div>

      {/* Flow Logo Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-8 right-8 pointer-events-none"
      >
        <FlowLogo className="w-32 h-32 opacity-30" />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <div className="flex items-center justify-center gap-3 text-white/60 text-sm">
          <FlowLogo className="w-5 h-5" />
          <span>Powered by Flow & AI</span>
        </div>
      </motion.div>

      {/* Collapsible Code Panel */}
      <CollapsibleCodePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        code={generatedCode}
        title={mode === 'safe' ? 'Generated from Template' : 'AI-Generated Smart Contract'}
      />
    </div>
  );
};

export default Home;
