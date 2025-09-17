import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, MapPin, MessageCircle, Star } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useSubscription } from '../../contexts/SubscriptionContext';

interface SuggestionProfile {
  id: string;
  displayName: string;
  age: number;
  cityBucket: string;
  bio: string;
  interests: string[];
  avatar: {
    bodyType: string;
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
  };
  compatibility: number;
  hasAudioIntro: boolean;
}

const Dashboard: React.FC = () => {
  const { profile } = useUser();
  const { subscription, checkUsage } = useSubscription();
  const [suggestions, setSuggestions] = useState<SuggestionProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);
  const usage = checkUsage();

  // Mock suggestions data
  useEffect(() => {
    const mockSuggestions: SuggestionProfile[] = [
      {
        id: '1',
        displayName: 'Alex',
        age: 26,
        cityBucket: 'Downtown',
        bio: 'Love hiking, photography, and trying new coffee shops. Always up for an adventure!',
        interests: ['Photography', 'Hiking', 'Coffee Culture', 'Travel'],
        avatar: {
          bodyType: 'athletic',
          skinTone: 'medium',
          hairStyle: 'medium',
          hairColor: 'brown',
          outfit: 'casual'
        },
        compatibility: 92,
        hasAudioIntro: true
      },
      {
        id: '2',
        displayName: 'Jordan',
        age: 24,
        cityBucket: 'North Side',
        bio: 'Artist and yoga instructor. Passionate about sustainability and mindful living.',
        interests: ['Yoga', 'Art', 'Sustainability', 'Meditation'],
        avatar: {
          bodyType: 'slim',
          skinTone: 'light',
          hairStyle: 'long',
          hairColor: 'blonde',
          outfit: 'creative'
        },
        compatibility: 88,
        hasAudioIntro: false
      },
      {
        id: '3',
        displayName: 'Sam',
        age: 29,
        cityBucket: 'East Side',
        bio: 'Tech enthusiast who loves cooking and board games. Looking for genuine connections.',
        interests: ['Cooking', 'Board Games', 'Technology', 'Reading'],
        avatar: {
          bodyType: 'curvy',
          skinTone: 'dark',
          hairStyle: 'short',
          hairColor: 'black',
          outfit: 'business'
        },
        compatibility: 85,
        hasAudioIntro: true
      }
    ];

    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = () => {
    if (!usage.canUseSuggestions) return;
    
    const currentProfile = suggestions[currentIndex];
    setLikedProfiles(prev => [...prev, currentProfile.id]);
    
    // Simulate match (20% chance)
    if (Math.random() < 0.2) {
      // Show match animation/modal here
      console.log('It\'s a match!');
    }
    
    nextProfile();
  };

  const handleSkip = () => {
    if (!usage.canUseSuggestions) return;
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const renderAvatarPreview = (avatar: any) => {
    const bodyEmojis = {
      athletic: '🏃‍♀️',
      curvy: '💃',
      slim: '🧘‍♀️',
      plus: '🤗'
    };

    return (
      <div className="w-32 h-40 mx-auto bg-gradient-to-b from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">
            {bodyEmojis[avatar.bodyType as keyof typeof bodyEmojis] || '👤'}
          </div>
          <div className="text-xs text-gray-600 font-medium capitalize">
            {avatar.skinTone}
          </div>
          <div className="text-xs text-gray-600 capitalize">
            {avatar.hairStyle}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-gray-600">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  if (!usage.canUseSuggestions) {
    return (
      <div className="p-6 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Suggestions</h1>
          <p className="text-gray-600">Discover meaningful connections</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <Clock className="w-12 h-12 mx-auto text-orange-600 mb-4" />
          <h3 className="font-semibold text-orange-900 mb-2">Daily Limit Reached</h3>
          <p className="text-orange-800 mb-4">
            You've used all {subscription.features.dailySuggestions} of your daily suggestions.
          </p>
          <p className="text-sm text-orange-700">
            Come back tomorrow for fresh matches, or upgrade to Premium for more suggestions!
          </p>
        </div>
      </div>
    );
  }

  if (currentIndex >= suggestions.length) {
    return (
      <div className="p-6 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Suggestions</h1>
          <p className="text-gray-600">Discover meaningful connections</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <h3 className="font-semibold text-green-900 mb-2">All Caught Up!</h3>
          <p className="text-green-800 mb-4">
            You've seen all your suggestions for today.
          </p>
          <p className="text-sm text-green-700">
            Check back tomorrow for new matches, or explore community rooms!
          </p>
        </div>
      </div>
    );
  }

  const currentProfile = suggestions[currentIndex];

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Suggestions</h1>
        <p className="text-gray-600">
          {usage.suggestionsUsed}/{subscription.features.dailySuggestions} used today
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        {/* Avatar Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-center">
          {renderAvatarPreview(currentProfile.avatar)}
          
          <div className="mt-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <h2 className="text-xl font-bold text-gray-900">{currentProfile.displayName}</h2>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{currentProfile.age}</span>
              {currentProfile.hasAudioIntro && (
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🎵</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              {currentProfile.cityBucket}
            </div>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {currentProfile.compatibility}% compatibility
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Shared Interests</h3>
            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.slice(0, 4).map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleSkip}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200"
            >
              Skip
            </button>
            <button
              onClick={handleLike}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Heart className="w-5 h-5 inline mr-2" />
              Like
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-2">
        {suggestions.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-purple-500 w-6'
                : index < currentIndex
                ? 'bg-green-400'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;