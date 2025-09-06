'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Eye } from 'lucide-react';

export default function AnalyzingAnimation() {
  const floatingParticles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative w-full max-w-2xl mx-auto py-12">
      {/* Main analyzing text */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                       bg-clip-text text-transparent">
          Analyzing Videos
        </h2>
        <p className="text-slate-400 text-lg">
          AI is processing your content and finding matching episodes...
        </p>
      </motion.div>

      {/* Central brain icon with pulse */}
      <div className="relative flex justify-center mb-12">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain className="w-20 h-20 text-purple-400" />
          
          {/* Pulsing rings around brain */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border border-purple-400/20"
              animate={{
                scale: [1, 2 + ring * 0.5],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: ring * 0.6,
                ease: "easeOut"
              }}
              style={{
                width: '80px',
                height: '80px'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating analysis indicators */}
      <div className="relative h-32 mb-8">
        {/* Processing icons orbiting */}
        {[
          { Icon: Eye, delay: 0, color: 'text-blue-400' },
          { Icon: Sparkles, delay: 1, color: 'text-purple-400' },
          { Icon: Zap, delay: 2, color: 'text-pink-400' }
        ].map(({ Icon, delay, color }, index) => (
          <motion.div
            key={index}
            className={`absolute ${color}`}
            animate={{
              x: [0, 100, 0, -100, 0],
              y: [0, -50, -100, -50, 0],
              rotate: 360
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
            style={{
              left: `${30 + index * 20}%`,
              top: '50%'
            }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
            animate={{
              y: [-20, -80, -20],
              x: [0, Math.sin(particle) * 40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: particle * 0.2,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + (particle * 80) / floatingParticles.length}%`,
              top: '80%'
            }}
          />
        ))}
      </div>

      {/* Progress steps */}
      <div className="space-y-4">
        {[
          { text: 'Processing video content', delay: 0 },
          { text: 'Analyzing visual elements', delay: 1.5 },
          { text: 'Matching with database', delay: 3 },
          { text: 'Generating results', delay: 4.5 }
        ].map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.5 }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: step.delay
              }}
            />
            <span className="text-slate-300">{step.text}</span>
            
            {/* Animated dots */}
            <motion.span
              className="text-slate-500"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: step.delay + 0.5
              }}
            >
              ...
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Bottom scanning line */}
      <div className="relative mt-12 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r 
                     from-transparent via-blue-400 to-transparent"
          animate={{
            x: [-128, 800]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
}