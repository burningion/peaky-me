'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileVideo } from 'lucide-react';

interface VideoDropZoneProps {
  onFilesUploaded: (files: File[]) => void;
  isAnalyzing: boolean;
}

export default function VideoDropZone({ onFilesUploaded, isAnalyzing }: VideoDropZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const videoFiles = acceptedFiles.filter(file => file.type.startsWith('video/'));
    if (videoFiles.length > 0) {
      onFilesUploaded(videoFiles);
    }
  }, [onFilesUploaded]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv']
    },
    multiple: true
  });

  const getBorderColor = () => {
    if (isDragAccept) return 'border-green-400';
    if (isDragReject) return 'border-red-400';
    if (isDragActive) return 'border-blue-400';
    return 'border-slate-600';
  };

  const getGlowColor = () => {
    if (isDragAccept) return 'shadow-green-500/20';
    if (isDragReject) return 'shadow-red-500/20';
    if (isDragActive) return 'shadow-blue-500/20';
    return 'shadow-purple-500/10';
  };

  if (isAnalyzing) {
    return (
      <motion.div
        className="w-80 h-80 rounded-full border-2 border-blue-400 bg-slate-800/30 
                   flex items-center justify-center backdrop-blur-sm
                   shadow-2xl shadow-blue-500/20"
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 25px 50px -12px rgba(59, 130, 246, 0.2)',
            '0 25px 50px -12px rgba(59, 130, 246, 0.4)',
            '0 25px 50px -12px rgba(59, 130, 246, 0.2)'
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <FileVideo className="w-12 h-12 text-blue-400 mx-auto" />
          </motion.div>
          <p className="text-lg font-semibold text-blue-300">Processing...</p>
        </div>
      </motion.div>
    );
  }

  const { 
    onAnimationStart, 
    onDrag, 
    onDragEnd, 
    onDragStart,
    onTransitionStart,
    ...rootProps 
  } = getRootProps();

  return (
    <motion.div
      {...rootProps}
      className={`w-80 h-80 rounded-full border-2 ${getBorderColor()} 
                 bg-slate-800/30 cursor-pointer transition-all duration-300
                 flex items-center justify-center backdrop-blur-sm
                 shadow-2xl ${getGlowColor()} hover:shadow-purple-500/30
                 hover:scale-105 hover:border-purple-400`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      animate={isDragActive ? {
        scale: [1, 1.1, 1],
        boxShadow: [
          '0 25px 50px -12px rgba(59, 130, 246, 0.2)',
          '0 25px 50px -12px rgba(59, 130, 246, 0.5)',
          '0 25px 50px -12px rgba(59, 130, 246, 0.2)'
        ]
      } : {}}
      transition={{ 
        duration: 0.6,
        repeat: isDragActive ? Infinity : 0,
        ease: "easeInOut"
      }}
    >
      <input {...getInputProps()} />
      
      <div className="text-center">
        {isDragActive ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            </motion.div>
            <p className="text-xl font-bold text-blue-300">
              {isDragAccept ? 'Drop videos here!' : 'Invalid file type'}
            </p>
          </>
        ) : (
          <>
            <div className="relative">
              <FileVideo className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full 
                           flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Upload className="w-3 h-3 text-white" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 
                           bg-clip-text text-transparent">
              Generate Episodes
            </h2>
            <p className="text-slate-400 text-sm">
              Drag & drop videos or click to browse
            </p>
          </>
        )}
      </div>

      {/* Ripple effect on drag */}
      {isDragActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400/30"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </motion.div>
  );
}