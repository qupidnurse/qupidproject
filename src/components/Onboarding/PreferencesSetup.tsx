import React, { useState } from 'react';
import { Settings, Heart, X } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface PreferencesSetupProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const PreferencesSetup: React.FC<PreferencesSetupProps> = ({ onNext, onBack, canGoBack }) => {
  const { profile, updateProfile } = useUser();
  const [preferences, setPreferences] = useState({
    ageMin: profile?.preferences?.ageMin || 18,
    ageMax: profile?.preferences?.ageMax || 35,
    distance: profile?.preferences?.distance || 'nearby',
    dealBreakers: profile?.preferences?.dealBreakers || []
  });

  const distanceOptions = [
    { id: 'close', label: 'Very Close (1-5 km)', description: 'Walking/biking distance' },
    { id: 'nearby', label: 'Nearby (5-15 km)', description: 'Short drive or transit' },
    { id: 'city', label: 'Same City (15-50 km)', description: 'Within metro area' },
    { id: 'region', label: 'Regional (50+ km)', description: 'Willing to travel' }
  ];

  const dealBreakerOptions = [
    'Smoking',
    'Heavy Drinking',
    'No Exercise',
    'Different Religion',
    'Doesn\'t Want Kids',
    'Wants Kids',
    'Lives with Parents',
    'No Career Ambition',
    'Party Lifestyle',
    'Very Different Politics',
    'Doesn\'t Like Animals',
    'Long Distance'
  ];

  const toggleDealBreaker = (dealBreaker: string) => {
    setPreferences(prev => ({
      ...prev,
      dealBreakers: prev.dealBreakers.includes(dealBreaker)
        ? prev.dealBreakers.filter(d => d !== dealBreaker)
        : [...prev.dealBreakers, dealBreaker]
    }));
  };

  const handleNext = () => {
    updateProfile({ preferences });
    onNext({ preferences });
  };

  return (
    <div className="px-6 py-8 min-h-screen flex flex-col">
      {canGoBack && (
        <button
          onClick={onBack}
          className="self-start text-purple-600 mb-4 hover:text-purple-700 transition-colors"
        >
          ← Back
        </button>
      )}

      <div className="text-center mb-8">
        <Settings className="w-12 h-12 mx-auto text-purple-600 mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dating Preferences</h2>
        <p className="text-gray-600">Help us find your ideal matches</p>
      </div>

      <div className="flex-1 space-y-8">
        {/* Age Range */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Age Range</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">{preferences.ageMin} - {preferences.ageMax} years old</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Age: {preferences.ageMin}
                </label>
                <input
                  type="range"
                  min={18}
                  max={preferences.ageMax - 1}
                  value={preferences.ageMin}
                  onChange={(e) => setPreferences(prev => ({ ...prev, ageMin: parseInt(e.target.value) }))}
                  className="w-full accent-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Age: {preferences.ageMax}
                </label>
                <input
                  type="range"
                  min={preferences.ageMin + 1}
                  max={65}
                  value={preferences.ageMax}
                  onChange={(e) => setPreferences(prev => ({ ...prev, ageMax: parseInt(e.target.value) }))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Distance */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Distance</h3>
          <div className="space-y-3">
            {distanceOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setPreferences(prev => ({ ...prev, distance: option.id }))}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  preferences.distance === option.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                  {preferences.distance === option.id && (
                    <Heart className="w-5 h-5 text-purple-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deal Breakers */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Deal Breakers (Optional)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select things that are important incompatibilities for you
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {dealBreakerOptions.map(dealBreaker => (
              <button
                key={dealBreaker}
                onClick={() => toggleDealBreaker(dealBreaker)}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                  preferences.dealBreakers.includes(dealBreaker)
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className={`font-medium ${
                  preferences.dealBreakers.includes(dealBreaker) ? 'text-red-700' : 'text-gray-700'
                }`}>
                  {dealBreaker}
                </span>
                {preferences.dealBreakers.includes(dealBreaker) && (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h4 className="font-medium text-green-900 mb-2">Smart Matching 🎯</h4>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• We'll prioritize profiles that match your preferences</li>
            <li>• Deal breakers help filter out incompatible matches</li>
            <li>• You can always adjust these settings later</li>
            <li>• We also consider personality compatibility beyond these basics</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-8"
      >
        Continue
      </button>
    </div>
  );
};

export default PreferencesSetup;