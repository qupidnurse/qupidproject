import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import AuthForm from './AuthForm';

const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Qupid</h1>
          <p className="text-white/80 text-lg font-medium">Avatar-first connections</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <AuthForm mode={mode} onModeChange={setMode} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="text-white/80 hover:text-white underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-white/80 hover:text-white underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;