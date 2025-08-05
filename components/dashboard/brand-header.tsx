'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

export function BrandHeader() {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                AdMyBrand
              </h1>
            </div>
            <motion.div
              className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              Pro Analytics
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-blue-100 text-lg lg:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Transform your marketing performance with AI-powered insights and real-time analytics
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span>AI Optimization</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Advanced Analytics</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-col items-center lg:items-end gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-right">
            <div className="text-2xl lg:text-3xl font-bold">$152.4K</div>
            <div className="text-blue-100 text-sm">Monthly Revenue</div>
          </div>
          <div className="flex items-center gap-1 text-green-300 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% vs last month</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}