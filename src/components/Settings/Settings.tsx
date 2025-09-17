import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Eye, Heart, LogOut, HelpCircle, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const { profile } = useUser();
  const [notifications, setNotifications] = useState({
    matches: true,
    messages: true,
    roomActivity: false,
    marketing: false
  });

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          icon: Eye,
          label: 'Privacy Settings',
          description: 'Control who can see your profile',
          action: () => console.log('Privacy settings')
        },
        {
          icon: Shield,
          label: 'Safety & Security',
          description: 'Manage your safety preferences',
          action: () => console.log('Safety settings')
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Customize your notification preferences',
          action: () => console.log('Notification settings')
        }
      ]
    },
    {
      title: 'Dating Preferences',
      items: [
        {
          icon: Heart,
          label: 'Match Preferences',
          description: 'Update your dating criteria',
          action: () => console.log('Match preferences')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Get help or report issues',
          action: () => console.log('Help')
        },
        {
          icon: Mail,
          label: 'Contact Us',
          description: 'Reach out to our team',
          action: () => console.log('Contact')
        }
      ]
    }
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {profile?.displayName?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile?.displayName || 'User'}</h3>
            <p className="text-sm text-gray-600">{profile?.age} • {profile?.cityBucket}</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Notification Settings */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Notification Settings</h2>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'matches' && 'Get notified about new matches'}
                  {key === 'messages' && 'Get notified about new messages'}
                  {key === 'roomActivity' && 'Get notified about room activity'}
                  {key === 'marketing' && 'Receive promotional emails'}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-purple-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-center space-x-2 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="font-medium text-red-600">Log Out</span>
        </button>
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Qupid v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">Avatar-first connections</p>
      </div>
    </div>
  );
};

export default Settings;