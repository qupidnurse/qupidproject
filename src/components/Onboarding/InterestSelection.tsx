import React, { useState } from 'react';
import { Heart, Search, Plus } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface InterestSelectionProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const InterestSelection: React.FC<InterestSelectionProps> = ({ onNext, onBack, canGoBack }) => {
  const { profile, updateProfile } = useUser();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile?.interests || []);
  const [selectedValues, setSelectedValues] = useState<string[]>(profile?.values || []);
  const [customInterest, setCustomInterest] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const interestCategories = {
    'Arts & Culture': [
      'Photography', 'Painting', 'Music', 'Theater', 'Museums', 'Literature',
      'Film & Cinema', 'Dancing', 'Concerts', 'Art Galleries'
    ],
    'Sports & Fitness': [
      'Running', 'Yoga', 'Gym', 'Swimming', 'Rock Climbing', 'Cycling',
      'Basketball', 'Soccer', 'Tennis', 'Hiking'
    ],
    'Food & Drink': [
      'Cooking', 'Wine Tasting', 'Coffee Culture', 'Restaurants', 'Baking',
      'Craft Beer', 'Cocktails', 'Food Photography', 'Farmers Markets'
    ],
    'Travel & Adventure': [
      'Backpacking', 'Road Trips', 'International Travel', 'Camping',
      'Beach Vacations', 'City Exploring', 'Cultural Experiences'
    ],
    'Technology & Gaming': [
      'Video Games', 'Board Games', 'Programming', 'Tech News',
      'Virtual Reality', 'Mobile Games', 'PC Building'
    ],
    'Nature & Outdoors': [
      'Hiking', 'Gardening', 'Beach Days', 'Mountain Biking',
      'Wildlife Photography', 'Stargazing', 'National Parks'
    ],
    'Learning & Growth': [
      'Reading', 'Podcasts', 'Languages', 'Online Courses',
      'Philosophy', 'Psychology', 'History', 'Science'
    ],
    'Social & Community': [
      'Volunteering', 'Meetups', 'Networking', 'Community Events',
      'Local Politics', 'Environmental Causes'
    ]
  };

  const coreValues = [
    'Honesty', 'Kindness', 'Family', 'Adventure', 'Creativity',
    'Ambition', 'Spirituality', 'Humor', 'Loyalty', 'Independence',
    'Community', 'Growth', 'Authenticity', 'Compassion', 'Balance',
    'Justice', 'Fun', 'Stability', 'Passion', 'Integrity'
  ];

  const allInterests = Object.values(interestCategories).flat();
  const filteredInterests = searchTerm 
    ? allInterests.filter(interest => 
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allInterests;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : prev.length < 12 ? [...prev, interest] : prev
    );
  };

  const toggleValue = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : prev.length < 8 ? [...prev, value] : prev
    );
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim()) && selectedInterests.length < 12) {
      setSelectedInterests(prev => [...prev, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleNext = () => {
    updateProfile({ interests: selectedInterests, values: selectedValues });
    onNext({ interests: selectedInterests, values: selectedValues });
  };

  const isValid = selectedInterests.length >= 3 && selectedValues.length >= 3;

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

      <div className="text-center mb-6">
        <Heart className="w-12 h-12 mx-auto text-purple-600 mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Interests & Values</h2>
        <p className="text-gray-600">Help us find your perfect matches</p>
      </div>

      <div className="flex-1 space-y-8">
        {/* Interests Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Interests ({selectedInterests.length}/12)
            </h3>
            <span className="text-sm text-gray-500">Min 3 required</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="Search interests..."
            />
          </div>

          {/* Custom Interest */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="Add custom interest..."
              maxLength={30}
            />
            <button
              onClick={addCustomInterest}
              disabled={!customInterest.trim() || selectedInterests.length >= 12}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Interest Tags */}
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {filteredInterests.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedInterests.includes(interest)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${selectedInterests.length >= 12 && !selectedInterests.includes(interest) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={selectedInterests.length >= 12 && !selectedInterests.includes(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Core Values ({selectedValues.length}/8)
            </h3>
            <span className="text-sm text-gray-500">Min 3 required</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {coreValues.map(value => (
              <button
                key={value}
                onClick={() => toggleValue(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedValues.includes(value)
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${selectedValues.length >= 8 && !selectedValues.includes(value) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={selectedValues.length >= 8 && !selectedValues.includes(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">How we use this info:</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Find people with shared interests and compatible values</li>
            <li>• Suggest conversation starters based on common ground</li>
            <li>• Recommend community rooms you might enjoy</li>
            <li>• All matching is done privately and securely</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!isValid}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg mt-6"
      >
        {isValid ? 'Continue' : `Select ${3 - Math.min(selectedInterests.length, 3)} more interests, ${3 - Math.min(selectedValues.length, 3)} more values`}
      </button>
    </div>
  );
};

export default InterestSelection;