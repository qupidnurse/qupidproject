import React, { useState } from 'react';
import { User, MapPin } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface ProfileSetupProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  data: any;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onNext, onBack, canGoBack, data }) => {
  const { profile, updateProfile } = useUser();
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || '',
    pronouns: profile?.pronouns || '',
    orientation: profile?.orientation || '',
    bio: profile?.bio || '',
    cityBucket: profile?.cityBucket || ''
  });

  const pronounOptions = [
    'she/her',
    'he/him',
    'they/them',
    'she/they',
    'he/they',
    'other'
  ];

  const orientationOptions = [
    'Straight',
    'Gay',
    'Lesbian',
    'Bisexual',
    'Pansexual',
    'Asexual',
    'Queer',
    'Other'
  ];

  const cityBuckets = [
    'Downtown',
    'North Side',
    'South Side',
    'East Side',
    'West Side',
    'Suburbs',
    'Nearby Cities'
  ];

  const handleNext = () => {
    const profileData = {
      ...formData,
      age: data.age
    };
    updateProfile(profileData);
    onNext(profileData);
  };

  const isValid = formData.displayName.trim().length > 0 && 
                  formData.pronouns && 
                  formData.orientation && 
                  formData.cityBucket;

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
        <User className="w-12 h-12 mx-auto text-purple-600 mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About You</h2>
        <p className="text-gray-600">Help others get to know the real you</p>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Name *
          </label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            placeholder="What should we call you?"
            maxLength={50}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pronouns *
          </label>
          <select
            value={formData.pronouns}
            onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          >
            <option value="">Select pronouns</option>
            {pronounOptions.map(pronoun => (
              <option key={pronoun} value={pronoun}>{pronoun}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sexual Orientation *
          </label>
          <select
            value={formData.orientation}
            onChange={(e) => setFormData(prev => ({ ...prev, orientation: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          >
            <option value="">Select orientation</option>
            {orientationOptions.map(orientation => (
              <option key={orientation} value={orientation}>{orientation}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Area *
          </label>
          <select
            value={formData.cityBucket}
            onChange={(e) => setFormData(prev => ({ ...prev, cityBucket: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          >
            <option value="">Select area</option>
            {cityBuckets.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            We use general areas to protect your privacy
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
            placeholder="Tell us about yourself, your passions, what makes you unique..."
            rows={4}
            maxLength={300}
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.bio.length}/300 characters
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <h4 className="font-medium text-purple-900 mb-2">Privacy First 🛡️</h4>
          <ul className="text-purple-800 text-sm space-y-1">
            <li>• Your exact location is never shared</li>
            <li>• We use general area buckets for safety</li>
            <li>• You control what information others see</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!isValid}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg mt-8"
      >
        Continue
      </button>
    </div>
  );
};

export default ProfileSetup;