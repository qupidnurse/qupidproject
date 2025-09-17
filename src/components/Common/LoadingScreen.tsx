import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-10 h-10 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Qupid</h1>
        <p className="text-white/80 text-lg font-medium">Avatar-first connections</p>
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;