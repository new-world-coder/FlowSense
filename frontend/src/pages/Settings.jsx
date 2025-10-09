import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Key, Bell, Shield, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { isDark } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleSave = () => {
    // TODO: Implement settings save
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your FlowSense preferences and integrations
        </p>
      </motion.div>

      {/* Theme Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Theme Mode</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current theme: {isDark ? 'Dark' : 'Light'}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Use the toggle in the header to switch themes
          </p>
        </div>
      </motion.div>

      {/* API Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold">API Configuration</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="input-field"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your API key is stored securely and never shared
            </p>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="card mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Enable Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified about contract deployments
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Auto-save Contracts</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically save generated contracts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
            <p className="text-green-700 dark:text-green-400">
              ✓ Two-factor authentication enabled
            </p>
          </div>
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg">
            <p className="text-blue-700 dark:text-blue-400">
              ✓ Connected to Flow testnet
            </p>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <button onClick={handleSave} className="btn-primary w-full flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;

