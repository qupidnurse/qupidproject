import React, { useState } from 'react';
import { User, Edit3, Camera, Shield, Heart, Star, Settings } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useSubscription } from '../../contexts/SubscriptionContext';

const Profile: React.FC = () => {
  const { profile, updateProfile, saveProfile } = useUser();
  const { subscription } = useSubscription();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: profile?.displayName || '',
    bio: profile?.bio || '',
    interests: profile?.interests || []
  });

  const renderAvatarPreview = () => {
    if (!profile?.avatar) return null;

    const bodyEmojis = {
      athletic: '🏃‍♀️',
      curvy: '💃',
      slim: '🧘‍♀️',
      plus: '🤗',
      muscular: '💪',
      petite: '🌸'
    };

    const skinTones = {
      light: '#FDBCB4',
      'medium-light': '#F1C27D',
      medium: '#E0AC69',
      'medium-dark': '#C68642',
      dark: '#8D5524',
      olive: '#C4A484'
    };

    const outfitEmojis = {
      casual: '👕',
      business: '👔',
      creative: '🎨',
      athletic: '🏃‍♀️',
      elegant: '✨',
      bohemian: '🌻',
      vintage: '📻',
      streetwear: '🛹'
    };

    const accessoryEmojis = {
      glasses: '👓',
      sunglasses: '🕶️',
      hat: '🎩',
      cap: '🧢',
      earrings: '💎',
      necklace: '📿',
      watch: '⌚',
      scarf: '🧣'
    };

    return (
      <div className="w-32 h-40 mx-auto bg-gradient-to-b from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg relative overflow-hidden">
        {/* Background based on skin tone */}
        <div 
          className="absolute inset-0 opacity-20 rounded-2xl"
          style={{ backgroundColor: skinTones[profile.avatar.skinTone as keyof typeof skinTones] || '#E0AC69' }}
        />
        
        <div className="text-center relative z-10">
          <div className="text-4xl mb-2">
            {bodyEmojis[profile.avatar.bodyType as keyof typeof bodyEmojis] || '👤'}
          </div>
          <div className="text-xs text-gray-600 font-medium capitalize">
            {profile.avatar.skinTone.replace('-', ' ')}
          </div>
          <div className="text-xs text-gray-600 capitalize">
            {profile.avatar.hairStyle}
          </div>
          {profile.avatar.accessories && profile.avatar.accessories.length > 0 && (
            <div className="text-xs mt-1">
              {profile.avatar.accessories.slice(0, 2).map(acc => 
                accessoryEmojis[acc as keyof typeof accessoryEmojis]
              ).join(' ')}
            </div>
          )}
        </div>
        
        {/* Outfit indicator */}
        <div className="absolute bottom-2 right-2 text-lg">
          {outfitEmojis[profile.avatar.outfit as keyof typeof outfitEmojis] || '👕'}
        </div>
      </div>
    );
  };

  const handleSaveEdit = async () => {
    if (profile) {
      updateProfile(editForm);
      await saveProfile();
      setIsEditing(false);
    }
  };

  const getSubscriptionBadge = () => {
    switch (subscription.tier) {
      case 'premium':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
            <Star className="w-4 h-4 mr-1" />
            Premium
          </div>
        );
      case 'pioneer':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-medium">
            <Shield className="w-4 h-4 mr-1" />
            Pioneer
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            Free Tier
          </div>
        );
    }
  };

  if (!profile) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your Qupid presence</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        {/* Avatar Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-center relative">
          {renderAvatarPreview()}
          
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all">
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="mt-4">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <h2 className="text-xl font-bold text-gray-900">{profile.displayName}</h2>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{profile.age}</span>
              {profile.verificationStatus === 'verified' && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="mb-3">
              {getSubscriptionBadge()}
            </div>

            <p className="text-gray-600 text-sm">{profile.pronouns} • {profile.orientation}</p>
            <p className="text-gray-500 text-sm">{profile.cityBucket}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                  rows={4}
                  maxLength={300}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {editForm.bio.length}/300 characters
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({
                      displayName: profile.displayName,
                      bio: profile.bio,
                      interests: profile.interests
                    });
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">About</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {profile.bio || "No bio added yet. Tell others about yourself!"}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.slice(0, 8).map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length > 8 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      +{profile.interests.length - 8} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Values</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.values.slice(0, 6).map((value, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                    >
                      {value}
                    </span>
                  ))}
                  {profile.values.length > 6 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      +{profile.values.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <Heart className="w-8 h-8 mx-auto text-purple-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600">Matches</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">4.8</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
          <div className="flex items-center space-x-3">
            <Edit3 className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Edit Avatar</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Privacy Settings</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Safety Center</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;