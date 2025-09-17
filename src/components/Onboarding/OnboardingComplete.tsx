import React, { useEffect } from 'react';
import { Sparkles, Heart, Users, Shield } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface OnboardingCompleteProps {
  onNext: () => void;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onNext }) => {
  const { updateProfile, saveProfile } = useUser();

  useEffect(() => {
    // Mark onboarding as complete
    updateProfile({ 
      onboardingComplete: true,
      verificationStatus: 'verified' 
    });
    saveProfile();
  }, [updateProfile, saveProfile]);

  const features = [
    {
      icon: Heart,
      title: 'Daily Matches',
      description: '5 personalized suggestions every day'
    },
    {
      icon: Users,
      title: 'Community Rooms',
      description: 'Join conversations around your interests'
    },
    {
      icon: Shield,
      title: 'Safe Messaging',
      description: 'Protected conversations with verified users'
    }
  ];

  return (
    <div className="px-6 py-8 min-h-screen flex flex-col">
      <div className="text-center mb-8">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <Heart className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to Qupid!</h2>
        <p className="text-lg text-gray-600">Your avatar-first dating journey begins now</p>
      </div>

      <div className="flex-1 space-y-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Icon className="w-7 h-7 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          );
        })}

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-900 mb-3">🎉 Your Free Tier Includes:</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              5 daily personalized matches
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              3 messages per day
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Access to all community rooms
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Avatar customization basics
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
          <h4 className="font-bold text-orange-900 mb-2">💡 Pro Tips for Success:</h4>
          <ul className="text-orange-800 text-sm space-y-1">
            <li>• Be authentic in your messages</li>
            <li>• Join rooms that match your interests</li>
            <li>• Take time to read profiles thoroughly</li>
            <li>• Always meet in public places when ready</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-5 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg mt-8"
      >
        Start Discovering Connections ✨
      </button>
    </div>
  );
};

export default OnboardingComplete;