'use client';

import { motion } from 'framer-motion';
import { Languages, Shuffle, List, ArrowRight } from 'lucide-react';

const buttons = [
  {
    id: 'translate',
    label: 'Translate',
    icon: Languages,
    color: 'from-blue-500 to-cyan-500',
    hoverColor: 'hover:shadow-blue-500/30'
  },
  {
    id: 'remix',
    label: 'Remix',
    icon: Shuffle,
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'hover:shadow-purple-500/30'
  },
  {
    id: 'all-entries',
    label: 'All Entries',
    icon: List,
    color: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:shadow-green-500/30'
  }
];

export default function ActionButtons() {
  const handleButtonClick = (buttonId: string) => {
    console.log(`${buttonId} button clicked`);
    // Add your button logic here
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {buttons.map((button, index) => {
        const IconComponent = button.icon;
        
        return (
          <motion.button
            key={button.id}
            className={`group relative px-8 py-4 bg-gradient-to-r ${button.color} 
                       rounded-xl font-semibold text-white shadow-xl 
                       transition-all duration-300 ${button.hoverColor}
                       hover:scale-105 active:scale-95 overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleButtonClick(button.id)}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            {/* Button content */}
            <div className="relative flex items-center space-x-3">
              <motion.div
                className="flex items-center justify-center"
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <IconComponent className="w-5 h-5" />
              </motion.div>
              
              <span className="text-lg font-medium">{button.label}</span>
              
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
            
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-xl border border-white/20 
                           group-hover:border-white/40 transition-colors duration-300" />
          </motion.button>
        );
      })}
    </div>
  );
}