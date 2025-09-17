import React from 'react';
import { Heart, Shield, Users, Sparkles } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  const features = [
    {
      icon: Heart,
      title: 'Avatar-First Connections',
      description: 'Connect through personality, not just photos'
    },
    {
      icon: Shield,
      title: 'Safety & Privacy',
      description: 'Industry-leading protection and verification'
    },
    {
      icon: Users,
      title: 'Interest Communities',
      description: 'Join rooms around your passions'
    },
    {
      icon: Sparkles,
      title: 'Genuine Matches',
      description: 'AI-powered compatibility based on values'
    }
  ];

  return (
    <div className="px-6 py-8 min-h-screen flex flex-col">
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Qupid</h1>
        <p className="text-lg text-gray-600">Avatar-first dating for genuine connections</p>
      </div>

      <div className="flex-1 space-y-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Get Started
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Welcome;