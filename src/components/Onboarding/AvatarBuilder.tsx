import React, { useState } from 'react';
import { Palette, User, Shirt } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import type { Avatar } from '../../contexts/UserContext';

interface AvatarBuilderProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const AvatarBuilder: React.FC<AvatarBuilderProps> = ({ onNext, onBack, canGoBack }) => {
  const { profile, updateProfile } = useUser();
  const [avatar, setAvatar] = useState<Avatar>(profile?.avatar || {
    bodyType: 'athletic',
    skinTone: 'medium',
    hairStyle: 'short',
    hairColor: 'brown',
    outfit: 'casual',
    accessories: []
  });

  const bodyTypes = [
    { id: 'athletic', name: 'Athletic', emoji: '🏃‍♀️' },
    { id: 'curvy', name: 'Curvy', emoji: '💃' },
    { id: 'slim', name: 'Slim', emoji: '🧘‍♀️' },
    { id: 'plus', name: 'Plus Size', emoji: '🤗' }
  ];

  const skinTones = [
    { id: 'light', name: 'Light', color: '#FDBCB4' },
    { id: 'medium-light', name: 'Medium Light', color: '#F1C27D' },
    { id: 'medium', name: 'Medium', color: '#E0AC69' },
    { id: 'medium-dark', name: 'Medium Dark', color: '#C68642' },
    { id: 'dark', name: 'Dark', color: '#8D5524' }
  ];

  const hairStyles = [
    { id: 'short', name: 'Short & Neat' },
    { id: 'medium', name: 'Shoulder Length' },
    { id: 'long', name: 'Long & Flowing' },
    { id: 'curly', name: 'Curly' },
    { id: 'braids', name: 'Braids' },
    { id: 'buzz', name: 'Buzz Cut' }
  ];

  const hairColors = [
    { id: 'black', name: 'Black', color: '#1a1a1a' },
    { id: 'brown', name: 'Brown', color: '#8b4513' },
    { id: 'blonde', name: 'Blonde', color: '#ffd700' },
    { id: 'red', name: 'Red', color: '#cc4125' },
    { id: 'gray', name: 'Gray', color: '#808080' },
    { id: 'colorful', name: 'Colorful', color: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)' }
  ];

  const outfits = [
    { id: 'casual', name: 'Casual Cool', emoji: '👕' },
    { id: 'business', name: 'Professional', emoji: '👔' },
    { id: 'creative', name: 'Creative', emoji: '🎨' },
    { id: 'athletic', name: 'Active Wear', emoji: '🏃‍♀️' },
    { id: 'elegant', name: 'Elegant', emoji: '✨' }
  ];

  const handleNext = () => {
    updateProfile({ avatar });
    onNext({ avatar });
  };

  const renderAvatarPreview = () => (
    <div className="w-32 h-40 mx-auto bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 border-4 border-white shadow-lg">
      <div className="text-center">
        <div className="text-4xl mb-2">
          {bodyTypes.find(b => b.id === avatar.bodyType)?.emoji || '👤'}
        </div>
        <div className="text-xs text-gray-600 font-medium">
          {skinTones.find(s => s.id === avatar.skinTone)?.name}
        </div>
        <div className="text-xs text-gray-600">
          {hairStyles.find(h => h.id === avatar.hairStyle)?.name}
        </div>
      </div>
    </div>
  );

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
        <User className="w-12 h-12 mx-auto text-purple-600 mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Avatar</h2>
        <p className="text-gray-600">Express yourself through your unique avatar</p>
      </div>

      {renderAvatarPreview()}

      <div className="flex-1 space-y-8">
        {/* Body Type */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Body Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {bodyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setAvatar(prev => ({ ...prev, bodyType: type.id }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  avatar.bodyType === type.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{type.emoji}</div>
                <div className="text-sm font-medium">{type.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Skin Tone */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Skin Tone</h3>
          <div className="flex flex-wrap gap-3">
            {skinTones.map((tone) => (
              <button
                key={tone.id}
                onClick={() => setAvatar(prev => ({ ...prev, skinTone: tone.id }))}
                className={`w-12 h-12 rounded-full border-4 transition-all ${
                  avatar.skinTone === tone.id
                    ? 'border-purple-500 scale-110'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ backgroundColor: tone.color }}
                title={tone.name}
              />
            ))}
          </div>
        </div>

        {/* Hair Style */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Hair Style</h3>
          <div className="space-y-2">
            {hairStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setAvatar(prev => ({ ...prev, hairStyle: style.id }))}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  avatar.hairStyle === style.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Hair Color */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Hair Color</h3>
          <div className="flex flex-wrap gap-3">
            {hairColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setAvatar(prev => ({ ...prev, hairColor: color.id }))}
                className={`w-10 h-10 rounded-full border-4 transition-all ${
                  avatar.hairColor === color.id
                    ? 'border-purple-500 scale-110'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ 
                  background: color.color.includes('gradient') ? color.color : color.color
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Outfit */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Style</h3>
          <div className="grid grid-cols-2 gap-3">
            {outfits.map((outfit) => (
              <button
                key={outfit.id}
                onClick={() => setAvatar(prev => ({ ...prev, outfit: outfit.id }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  avatar.outfit === outfit.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{outfit.emoji}</div>
                <div className="text-sm font-medium">{outfit.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-8"
      >
        Continue with Avatar
      </button>
    </div>
  );
};

export default AvatarBuilder;