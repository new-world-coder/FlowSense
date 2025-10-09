import React from 'react';
import { motion } from 'framer-motion';
import { User, Wallet, Trophy, Star } from 'lucide-react';

const Profile = () => {
  const achievements = [
    { id: 1, name: 'First Contract', description: 'Generated your first smart contract', icon: Star },
    { id: 2, name: 'Quick Learner', description: 'Deployed 5 contracts', icon: Trophy },
    { id: 3, name: 'Early Adopter', description: 'One of the first 100 users', icon: Star },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Profile</h1>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card mb-8"
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Flow Developer</h2>
            <p className="text-gray-600 dark:text-gray-400">Member since October 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-5 h-5 text-primary-600" />
              <span className="font-semibold">Flow Address</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              0x1234...5678
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-primary-600" />
              <span className="font-semibold">Achievements</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {achievements.length} unlocked
            </p>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-6">Achievements</h2>
        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

