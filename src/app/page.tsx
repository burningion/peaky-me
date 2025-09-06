'use client';

import { useState } from 'react';
import VideoDropZone from '@/components/VideoDropZone';
import ActionButtons from '@/components/ActionButtons';
import VideoPlayer from '@/components/VideoPlayer';
import AnalyzingAnimation from '@/components/AnalyzingAnimation';

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files);
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Mock analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Minerama
            </h1>
            <p className="text-xl text-slate-300 font-medium">Upload Asset</p>
          </div>
          
          {/* Prompt Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full max-w-md px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       placeholder-slate-400 text-white backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col items-center space-y-8">
          {/* Drop Zone */}
          {!showResults && (
            <VideoDropZone 
              onFilesUploaded={handleFilesUploaded}
              isAnalyzing={isAnalyzing}
            />
          )}

          {/* Analyzing Animation */}
          {isAnalyzing && (
            <AnalyzingAnimation />
          )}

          {/* Results */}
          {showResults && (
            <VideoPlayer uploadedFiles={uploadedFiles} />
          )}

          {/* Action Buttons */}
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}
