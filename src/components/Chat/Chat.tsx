import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Heart, Clock, Crown } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext';

interface ChatMatch {
  id: string;
  displayName: string;
  avatar: {
    bodyType: string;
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const Chat: React.FC = () => {
  const { subscription, checkUsage } = useSubscription();
  const [matches, setMatches] = useState<ChatMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<ChatMatch | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const usage = checkUsage();

  // Mock data
  useEffect(() => {
    const mockMatches: ChatMatch[] = [
      {
        id: '1',
        displayName: 'Alex',
        avatar: {
          bodyType: 'athletic',
          skinTone: 'medium',
          hairStyle: 'medium',
          hairColor: 'brown',
          outfit: 'casual'
        },
        lastMessage: 'That hiking spot looks amazing! 📸',
        lastMessageTime: '2m ago',
        unreadCount: 2,
        isOnline: true
      },
      {
        id: '2',
        displayName: 'Jordan',
        avatar: {
          bodyType: 'slim',
          skinTone: 'light',
          hairStyle: 'long',
          hairColor: 'blonde',
          outfit: 'creative'
        },
        lastMessage: 'Thanks for the yoga studio recommendation!',
        lastMessageTime: '1h ago',
        unreadCount: 0,
        isOnline: false
      }
    ];

    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 500);
  }, []);

  const renderAvatarPreview = (avatar: any, size: 'sm' | 'md' = 'sm') => {
    const bodyEmojis = {
      athletic: '🏃‍♀️',
      curvy: '💃',
      slim: '🧘‍♀️',
      plus: '🤗'
    };

    const sizeClasses = size === 'sm' ? 'w-12 h-12 text-lg' : 'w-16 h-16 text-2xl';

    return (
      <div className={`${sizeClasses} bg-gradient-to-b from-purple-100 to-pink-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
        <span>{bodyEmojis[avatar.bodyType as keyof typeof bodyEmojis] || '👤'}</span>
      </div>
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !usage.canSendMessages) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      text: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update usage tracking
    const today = new Date().toDateString();
    const usageKey = `qupid_usage_${today}`;
    const currentUsage = JSON.parse(localStorage.getItem(usageKey) || '{"suggestions": 0, "messages": 0}');
    currentUsage.messages += 1;
    localStorage.setItem(usageKey, JSON.stringify(currentUsage));
  };

  const loadMessages = (matchId: string) => {
    // Mock messages for the selected match
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: matchId,
        text: 'Hey! I saw we both love photography 📸',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isOwn: false
      },
      {
        id: '2',
        senderId: 'current-user',
        text: 'Yes! Your travel photos are incredible. Where was that mountain shot taken?',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        isOwn: true
      },
      {
        id: '3',
        senderId: matchId,
        text: 'That was from my trip to the Rockies last summer. The sunrise was absolutely magical!',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        isOwn: false
      }
    ];

    setMessages(mockMessages);
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <MessageCircle className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-gray-600">Loading your conversations...</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="p-6 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Your conversations will appear here</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
          <Heart className="w-12 h-12 mx-auto text-purple-600 mb-4" />
          <h3 className="font-semibold text-purple-900 mb-2">No matches yet</h3>
          <p className="text-purple-800 mb-4">
            Start liking profiles to create connections and begin conversations!
          </p>
        </div>
      </div>
    );
  }

  if (selectedMatch) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center space-x-3">
          <button
            onClick={() => setSelectedMatch(null)}
            className="text-purple-600 hover:text-purple-700"
          >
            ← Back
          </button>
          {renderAvatarPreview(selectedMatch.avatar)}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{selectedMatch.displayName}</h3>
            <p className="text-sm text-gray-500">
              {selectedMatch.isOnline ? 'Online now' : 'Last seen recently'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.isOwn
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          {!usage.canSendMessages && (
            <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-800">
                  Daily message limit reached ({usage.messagesUsed}/{subscription.features.messagesPerDay})
                </span>
                {subscription.tier === 'free' && (
                  <Crown className="w-4 h-4 text-orange-600" />
                )}
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={usage.canSendMessages ? "Type a message..." : "Upgrade for unlimited messages"}
              disabled={!usage.canSendMessages}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !usage.canSendMessages}
              className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">
          {usage.messagesUsed}/{subscription.features.messagesPerDay === -1 ? '∞' : subscription.features.messagesPerDay} messages used today
        </p>
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        {matches.map((match) => (
          <button
            key={match.id}
            onClick={() => {
              setSelectedMatch(match);
              loadMessages(match.id);
            }}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                {renderAvatarPreview(match.avatar)}
                {match.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{match.displayName}</h3>
                  <span className="text-xs text-gray-500">{match.lastMessageTime}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{match.lastMessage}</p>
              </div>
              
              {match.unreadCount > 0 && (
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {match.unreadCount}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chat;