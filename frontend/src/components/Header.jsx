import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import FlowLogo from './FlowLogo';
import FlowWalletButton from './FlowWalletButton';

const Header = ({ minimal = false }) => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  if (minimal) {
    // Minimal floating header for home page
    return (
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <FlowLogo className="w-8 h-8" />
              <span className="text-white font-bold text-xl drop-shadow-lg hidden sm:inline">
                FlowSense
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-2 mr-4">
              {isAuthenticated ? (
                <>
                  {[
                    { to: '/dashboard', label: 'Dashboard' },
                    { to: '/templates', label: 'Templates' },
                  ].map((link) => (
                    <Link key={link.to} to={link.to}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/20"
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  ))}
                </>
              ) : (
                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </motion.div>
                </Link>
              )}
            </nav>

            {/* Flow Wallet Button */}
            <FlowWalletButton minimal={true} />

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </header>
    );
  }

  // Standard header for other pages
  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome to FlowSense
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI-powered smart contract generation for Flow blockchain
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
