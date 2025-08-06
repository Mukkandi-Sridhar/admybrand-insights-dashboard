'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap, Star, Award, Target } from 'lucide-react';

export function BrandHeader() {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white shadow-2xl"
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
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
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
                className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-7 h-7" />
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  AdMyBrand
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-300 fill-current" />
                  <span className="text-sm text-blue-100 font-medium">Premium Analytics Suite</span>
                </div>
              </div>
            </div>
            <motion.div
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-sm font-bold text-gray-900 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4 inline mr-1" />
              Enterprise
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-blue-100 text-xl lg:text-2xl max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Transform your marketing performance with AI-powered insights, real-time analytics, and advanced campaign optimization
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="flex items-center gap-2 bg-white/15 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Real-time Tracking</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-white/15 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Zap className="w-5 h-5" />
              <span className="font-medium">AI Optimization</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-white/15 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Target className="w-5 h-5" />
              <span className="font-medium">Advanced Analytics</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-col items-center lg:items-end gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center lg:text-right">
            <motion.div 
              className="text-3xl lg:text-4xl font-bold mb-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              $152.4K
            </motion.div>
            <div className="text-blue-100 text-sm font-medium">Monthly Revenue</div>
          </div>
          <motion.div 
            className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-5 h-5 text-green-300" />
            <span className="text-green-300 font-bold text-lg">+12.5%</span>
            <span className="text-green-200 text-sm">vs last month</span>
          </motion.div>
          
          <div className="flex gap-2 mt-2">
            <motion.div 
              className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              8,943 Users
            </motion.div>
            <motion.div 
              className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              1,247 Conversions
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Brand tagline */}
      <motion.div 
        className="absolute bottom-4 left-8 text-xs text-blue-200/80 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Powered by AdMyBrand Intelligence Engine™
      </motion.div>
    </motion.div>
  );
}