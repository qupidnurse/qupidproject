import React, { useState, useEffect } from 'react';
import { Palette, User, Shirt, Loader, AlertCircle, Check } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import type { Avatar } from '../../contexts/UserContext';

interface AvatarBuilderProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

interface AvatarItem {
  id: string;
  name: string;
  category: string;
  emoji: string;
  color?: string;
  premium?: boolean;
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
  
  const [activeCategory, setActiveCategory] = useState('body');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Avatar customization data
  const avatarData = {
    body: [
      { id: 'athletic', name: 'Athletic', category: 'body', emoji: '🏃‍♀️' },
      { id: 'curvy', name: 'Curvy', category: 'body', emoji: '💃' },
      { id: 'slim', name: 'Slim', category: 'body', emoji: '🧘‍♀️' },
      { id: 'plus', name: 'Plus Size', category: 'body', emoji: '🤗' },
      { id: 'muscular', name: 'Muscular', category: 'body', emoji: '💪' },
      { id: 'petite', name: 'Petite', category: 'body', emoji: '🌸' }
    ],
    skin: [
      { id: 'light', name: 'Light', category: 'skin', color: '#FDBCB4' },
      { id: 'medium-light', name: 'Medium Light', category: 'skin', color: '#F1C27D' },
      { id: 'medium', name: 'Medium', category: 'skin', color: '#E0AC69' },
      { id: 'medium-dark', name: 'Medium Dark', category: 'skin', color: '#C68642' },
      { id: 'dark', name: 'Dark', category: 'skin', color: '#8D5524' },
      { id: 'olive', name: 'Olive', category: 'skin', color: '#C4A484' }
    ],
    hair: [
      { id: 'short', name: 'Short & Neat', category: 'hair', emoji: '✂️' },
      { id: 'medium', name: 'Shoulder Length', category: 'hair', emoji: '💇‍♀️' },
      { id: 'long', name: 'Long & Flowing', category: 'hair', emoji: '👩‍🦳' },
      { id: 'curly', name: 'Curly', category: 'hair', emoji: '🌀' },
      { id: 'braids', name: 'Braids', category: 'hair', emoji: '🎀' },
      { id: 'buzz', name: 'Buzz Cut', category: 'hair', emoji: '⚡' },
      { id: 'wavy', name: 'Wavy', category: 'hair', emoji: '🌊' },
      { id: 'pixie', name: 'Pixie Cut', category: 'hair', emoji: '✨' }
    ],
    hairColor: [
      { id: 'black', name: 'Black', category: 'hairColor', color: '#1a1a1a' },
      { id: 'brown', name: 'Brown', category: 'hairColor', color: '#8b4513' },
      { id: 'blonde', name: 'Blonde', category: 'hairColor', color: '#ffd700' },
      { id: 'red', name: 'Red', category: 'hairColor', color: '#cc4125' },
      { id: 'auburn', name: 'Auburn', category: 'hairColor', color: '#a52a2a' },
      { id: 'gray', name: 'Gray', category: 'hairColor', color: '#808080' },
      { id: 'silver', name: 'Silver', category: 'hairColor', color: '#c0c0c0' },
      { id: 'colorful', name: 'Colorful', category: 'hairColor', color: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)' }
    ],
    outfit: [
      { id: 'casual', name: 'Casual Cool', category: 'outfit', emoji: '👕' },
      { id: 'business', name: 'Professional', category: 'outfit', emoji: '👔' },
      { id: 'creative', name: 'Creative', category: 'outfit', emoji: '🎨' },
      { id: 'athletic', name: 'Active Wear', category: 'outfit', emoji: '🏃‍♀️' },
      { id: 'elegant', name: 'Elegant', category: 'outfit', emoji: '✨' },
      { id: 'bohemian', name: 'Bohemian', category: 'outfit', emoji: '🌻', premium: true },
      { id: 'vintage', name: 'Vintage', category: 'outfit', emoji: '📻', premium: true },
      { id: 'streetwear', name: 'Streetwear', category: 'outfit', emoji: '🛹' }
    ],
    accessories: [
      { id: 'glasses', name: 'Glasses', category: 'accessories', emoji: '👓' },
      { id: 'sunglasses', name: 'Sunglasses', category: 'accessories', emoji: '🕶️' },
      { id: 'hat', name: 'Hat', category: 'accessories', emoji: '🎩' },
      { id: 'cap', name: 'Baseball Cap', category: 'accessories', emoji: '🧢' },
      { id: 'earrings', name: 'Earrings', category: 'accessories', emoji: '💎' },
      { id: 'necklace', name: 'Necklace', category: 'accessories', emoji: '📿' },
      { id: 'watch', name: 'Watch', category: 'accessories', emoji: '⌚' },
      { id: 'scarf', name: 'Scarf', category: 'accessories', emoji: '🧣', premium: true }
    ]
  };

  const categories = [
    { id: 'body', name: 'Body Type', icon: User },
    { id: 'skin', name: 'Skin Tone', icon: Palette },
    { id: 'hair', name: 'Hair Style', icon: Shirt },
    { id: 'hairColor', name: 'Hair Color', icon: Palette },
    { id: 'outfit', name: 'Outfit', icon: Shirt },
    { id: 'accessories', name: 'Accessories', icon: Palette }
  ];

  useEffect(() => {
    // Simulate loading avatar data
    const loadAvatarData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Validate avatar data exists
        if (!avatarData.body.length) {
          throw new Error('Failed to load avatar customization options');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load avatar builder. Please try again.');
        setLoading(false);
      }
    };

    loadAvatarData();
  }, []);

  const renderAvatarPreview = () => {
    if (loading) {
      return (
        <div className="w-32 h-40 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-6 border-4 border-white shadow-lg animate-pulse">
          <Loader className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      );
    }

    const bodyItem = avatarData.body.find(b => b.id === avatar.bodyType);
    const skinItem = avatarData.skin.find(s => s.id === avatar.skinTone);
    const hairItem = avatarData.hair.find(h => h.id === avatar.hairStyle);
    const outfitItem = avatarData.outfit.find(o => o.id === avatar.outfit);

    return (
      <div className="w-32 h-40 mx-auto bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 border-4 border-white shadow-lg relative overflow-hidden">
        {/* Background based on skin tone */}
        <div 
          className="absolute inset-0 opacity-20 rounded-2xl"
          style={{ backgroundColor: skinItem?.color || '#E0AC69' }}
        />
        
        <div className="text-center relative z-10">
          <div className="text-4xl mb-2">
            {bodyItem?.emoji || '👤'}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {skinItem?.name || 'Medium'}
          </div>
          <div className="text-xs text-gray-600">
            {hairItem?.name || 'Short'}
          </div>
          {avatar.accessories.length > 0 && (
            <div className="text-xs mt-1">
              {avatar.accessories.slice(0, 2).map(acc => {
                const accItem = avatarData.accessories.find(a => a.id === acc);
                return accItem?.emoji;
              }).join(' ')}
            </div>
          )}
        </div>
        
        {/* Outfit indicator */}
        <div className="absolute bottom-2 right-2 text-lg">
          {outfitItem?.emoji || '👕'}
        </div>
      </div>
    );
  };

  const renderCategoryItems = () => {
    const items = avatarData[activeCategory as keyof typeof avatarData] || [];
    
    if (activeCategory === 'accessories') {
      return (
        <div className="grid grid-cols-2 gap-3">
          {items.map((item: AvatarItem) => {
            const isSelected = avatar.accessories.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleAccessoryToggle(item.id)}
                className={`p-4 rounded-xl border-2 transition-all relative ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${item.premium ? 'ring-2 ring-yellow-300' : ''}`}
              >
                {item.premium && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">✨</span>
                  </div>
                )}
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="text-sm font-medium">{item.name}</div>
                {isSelected && (
                  <div className="absolute top-2 left-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      );
    }

    if (activeCategory === 'skin' || activeCategory === 'hairColor') {
      return (
        <div className="flex flex-wrap gap-3">
          {items.map((item: AvatarItem) => {
            const isSelected = 
              (activeCategory === 'skin' && avatar.skinTone === item.id) ||
              (activeCategory === 'hairColor' && avatar.hairColor === item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemSelect(activeCategory, item.id)}
                className={`w-12 h-12 rounded-full border-4 transition-all ${
                  isSelected
                    ? 'border-purple-500 scale-110'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ 
                  background: item.color?.includes('gradient') ? item.color : item.color
                }}
                title={item.name}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-3">
        {items.map((item: AvatarItem) => {
          const isSelected = 
            (activeCategory === 'body' && avatar.bodyType === item.id) ||
            (activeCategory === 'hair' && avatar.hairStyle === item.id) ||
            (activeCategory === 'outfit' && avatar.outfit === item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemSelect(activeCategory, item.id)}
              className={`p-4 rounded-xl border-2 transition-all relative ${
                isSelected
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${item.premium ? 'ring-2 ring-yellow-300' : ''}`}
            >
              {item.premium && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">✨</span>
                </div>
              )}
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="text-sm font-medium">{item.name}</div>
            </button>
          );
        })}
      </div>
    );
  };

  const handleItemSelect = (category: string, itemId: string) => {
    setAvatar(prev => ({
      ...prev,
      [category === 'body' ? 'bodyType' : 
       category === 'skin' ? 'skinTone' :
       category === 'hair' ? 'hairStyle' :
       category === 'hairColor' ? 'hairColor' :
       category === 'outfit' ? 'outfit' : category]: itemId
    }));
  };

  const handleAccessoryToggle = (accessoryId: string) => {
    setAvatar(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter(id => id !== accessoryId)
        : [...prev.accessories, accessoryId]
    }));
  };

  const handleNext = async () => {
    setSaving(true);
    try {
      updateProfile({ avatar });
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save delay
      onNext({ avatar });
    } catch (err) {
      setError('Failed to save avatar. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="px-6 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Loader className="w-8 h-8 text-purple-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Avatar Builder</h3>
          <p className="text-gray-600">Preparing your customization options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      {/* Category Tabs */}
      <div className="flex overflow-x-auto mb-6 pb-2">
        <div className="flex space-x-2 min-w-full">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4 inline mr-1" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Items */}
      <div className="flex-1 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 capitalize">
          {categories.find(c => c.id === activeCategory)?.name}
        </h3>
        <div className="max-h-80 overflow-y-auto">
          {renderCategoryItems()}
        </div>
      </div>

      {/* Premium Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">✨</span>
          <h4 className="font-medium text-yellow-900">Premium Items</h4>
        </div>
        <p className="text-yellow-800 text-sm">
          Some items are premium-only. Upgrade to unlock the full collection!
        </p>
      </div>

      <button
        onClick={handleNext}
        disabled={saving}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
      >
        {saving ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Saving Avatar...
          </>
        ) : (
          'Continue with Avatar'
        )}
      </button>
    </div>
  );
};

export default AvatarBuilder;