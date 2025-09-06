'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  uploadedFiles: File[];
}

interface Episode {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  matchPercentage: number;
}

const episodes: Episode[] = [
  {
    id: '1',
    title: 'Episode 1',
    duration: '1:20',
    videoUrl: '/sample-videos/episode-01.mp4',
    description: 'ends on the question “Where’s John?”',
    matchPercentage: 95
  },
  {
    id: '2', 
    title: 'Episode 2',
    duration: '1:25',
    videoUrl: '/sample-videos/episode-02.mp4',
    description: 'carries the early setup forward',
    matchPercentage: 87
  },
  {
    id: '3',
    title: 'Episode 3',
    duration: '1:33',
    videoUrl: '/sample-videos/episode-03.mp4',
    description: 'extended slightly to land on a punchy beat',
    matchPercentage: 82
  },
  {
    id: '4',
    title: 'Episode 4',
    duration: '1:25',
    videoUrl: '/sample-videos/episode-04.mp4',
    description: 'keeps the momentum, clean mid-episode slice',
    matchPercentage: 78
  },
  {
    id: '5',
    title: 'Episode 5',
    duration: '1:25',
    videoUrl: '/sample-videos/episode-05.mp4',
    description: 'closes this first pass cleanly',
    matchPercentage: 76
  }
];

export default function VideoPlayer({ uploadedFiles }: VideoPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState<Episode | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Animate results appearance
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Results Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 
                       bg-clip-text text-transparent">
          Video Edits Generated!
        </h2>
        <p className="text-slate-400">
          Created {episodes.length} video edits based on your uploaded content
        </p>
      </motion.div>

      {/* Main Video Player */}
      {selectedVideo && (
        <motion.div
          className="mb-12 bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-600"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-black aspect-video">
            {/* Actual Video Element */}
            <video
              className="w-full h-full"
              controls
              src={selectedVideo.videoUrl}
              poster="/api/placeholder/800/450"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedVideo.title}</h3>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedVideo.duration}
                </div>
              </div>
            </div>
            <p className="text-slate-300">{selectedVideo.description}</p>
          </div>
        </motion.div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {episodes.map((video, index) => (
          <motion.div
            key={video.id}
            className={`bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border 
                       cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl
                       hover:border-purple-400 ${
                         selectedVideo?.id === video.id ? 'ring-2 ring-purple-500 border-purple-500' : 'border-slate-600'
                       }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showResults ? 1 : 0, 
              y: showResults ? 0 : 20 
            }}
            transition={{ 
              duration: 0.6, 
              delay: showResults ? 0.1 * index : 0 
            }}
            onClick={() => setSelectedVideo(video)}
            whileHover={{ 
              boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.3)'
            }}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-800">
              <video 
                className="w-full h-full object-cover" 
                muted
                preload="metadata"
              >
                <source src={`${video.videoUrl}#t=0.1`} />
              </video>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
              
              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 
                             rounded text-xs font-bold">
                {video.duration}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2">
                {video.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Info */}
      {uploadedFiles.length > 0 && (
        <motion.div
          className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: showResults ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          <h4 className="text-lg font-semibold text-white mb-2">Uploaded Files:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>{file.name}</span>
                <span className="text-slate-500 text-sm">
                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}