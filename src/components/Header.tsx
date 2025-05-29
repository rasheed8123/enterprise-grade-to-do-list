import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-white p-2 rounded-lg shadow-lg"
            >
              <CheckCircle2 className="h-8 w-8 text-indigo-600" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold"
              >
                TaskFlow
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-indigo-100"
              >
                Your AI-Powered Task Manager
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-200" />
              <span className="text-sm text-indigo-100">Real-time Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-indigo-200" />
              <span className="text-sm text-indigo-100">Smart Organization</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="relative h-16 overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="flex space-x-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-white opacity-20"
                style={{ transform: `scale(${0.5 + Math.random()})` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}