import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Heart, Camera, Music, Book, Gamepad2, Coffee, Plane } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  topic: string;
  description: string;
  memberCount: number;
  icon: React.ComponentType<any>;
  color: string;
  recentActivity: string;
  isJoined: boolean;
}

interface RoomMessage {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
  avatar: {
    bodyType: string;
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
  };
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock rooms data
  useEffect(() => {
    const mockRooms: Room[] = [
      {
        id: '1',
        name: 'Photography Enthusiasts',
        topic: 'Photography',
        description: 'Share your best shots and photography tips',
        memberCount: 1247,
        icon: Camera,
        color: 'bg-blue-500',
        recentActivity: '2m ago',
        isJoined: true
      },
      {
        id: '2',
        name: 'Music Lovers',
        topic: 'Music',
        description: 'Discover new artists and share your favorite tracks',
        memberCount: 892,
        icon: Music,
        color: 'bg-purple-500',
        recentActivity: '5m ago',
        isJoined: false
      },
      {
        id: '3',
        name: 'Book Club',
        topic: 'Literature',
        description: 'Monthly book discussions and recommendations',
        memberCount: 634,
        icon: Book,
        color: 'bg-green-500',
        recentActivity: '12m ago',
        isJoined: true
      },
      {
        id: '4',
        name: 'Gaming Community',
        topic: 'Gaming',
        description: 'Connect with fellow gamers and find teammates',
        memberCount: 1523,
        icon: Gamepad2,
        color: 'bg-red-500',
        recentActivity: '1m ago',
        isJoined: false
      },
      {
        id: '5',
        name: 'Coffee Culture',
        topic: 'Coffee',
        description: 'Best coffee shops, brewing tips, and cafe culture',
        memberCount: 456,
        icon: Coffee,
        color: 'bg-yellow-600',
        recentActivity: '8m ago',
        isJoined: true
      },
      {
        id: '6',
        name: 'Travel Stories',
        topic: 'Travel',
        description: 'Share adventures and get travel recommendations',
        memberCount: 789,
        icon: Plane,
        color: 'bg-indigo-500',
        recentActivity: '15m ago',
        isJoined: false
      }
    ];

    setTimeout(() => {
      setRooms(mockRooms);
      setLoading(false);
    }, 500);
  }, []);

  const renderAvatarPreview = (avatar: any) => {
    const bodyEmojis = {
      athletic: '🏃‍♀️',
      curvy: '💃',
      slim: '🧘‍♀️',
      plus: '🤗'
    };

    return (
      <div className="w-8 h-8 bg-gradient-to-b from-purple-100 to-pink-100 rounded-full flex items-center justify-center border border-white shadow-sm">
        <span className="text-sm">{bodyEmojis[avatar.bodyType as keyof typeof bodyEmojis] || '👤'}</span>
      </div>
    );
  };

  const loadRoomMessages = (roomId: string) => {
    // Mock messages for the selected room
    const mockMessages: RoomMessage[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'Alex',
        text: 'Just captured this amazing sunset at the beach! 🌅',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        avatar: {
          bodyType: 'athletic',
          skinTone: 'medium',
          hairStyle: 'medium',
          hairColor: 'brown',
          outfit: 'casual'
        }
      },
      {
        id: '2',
        userId: 'user2',
        username: 'Jordan',
        text: 'Beautiful shot! What camera settings did you use?',
        timestamp: new Date(Date.now() - 240000).toISOString(),
        avatar: {
          bodyType: 'slim',
          skinTone: 'light',
          hairStyle: 'long',
          hairColor: 'blonde',
          outfit: 'creative'
        }
      },
      {
        id: '3',
        userId: 'user1',
        username: 'Alex',
        text: 'Thanks! I used f/8, ISO 100, and a 2-second exposure with a tripod',
        timestamp: new Date(Date.now() - 180000).toISOString(),
        avatar: {
          bodyType: 'athletic',
          skinTone: 'medium',
          hairStyle: 'medium',
          hairColor: 'brown',
          outfit: 'casual'
        }
      }
    ];

    setMessages(mockMessages);
  };

  const handleJoinRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, isJoined: true, memberCount: room.memberCount + 1 } : room
    ));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const message: RoomMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: 'You',
      text: newMessage,
      timestamp: new Date().toISOString(),
      avatar: {
        bodyType: 'athletic',
        skinTone: 'medium',
        hairStyle: 'short',
        hairColor: 'brown',
        outfit: 'casual'
      }
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-gray-600">Loading community rooms...</p>
        </div>
      </div>
    );
  }

  if (selectedRoom) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Room Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setSelectedRoom(null)}
            className="text-purple-600 hover:text-purple-700 mb-3"
          >
            ← Back to Rooms
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${selectedRoom.color} rounded-xl flex items-center justify-center`}>
              <selectedRoom.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{selectedRoom.name}</h3>
              <p className="text-sm text-gray-500">{selectedRoom.memberCount} members</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              {renderAvatarPreview(message.avatar)}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900 text-sm">{message.username}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-gray-700">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Share your thoughts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              <MessageCircle className="w-4 h-4" />
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Community Rooms</h1>
        <p className="text-gray-600">Connect with people who share your interests</p>
      </div>

      {/* Rooms Grid */}
      <div className="space-y-4">
        {rooms.map((room) => {
          const Icon = room.icon;
          return (
            <div key={room.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${room.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{room.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{room.recentActivity}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{room.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {room.memberCount}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {room.isJoined ? (
                        <button
                          onClick={() => {
                            setSelectedRoom(room);
                            loadRoomMessages(room.id);
                          }}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                        >
                          Enter Room
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleJoinRoom(room.id)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                          >
                            Join
                          </button>
                          <button
                            onClick={() => {
                              handleJoinRoom(room.id);
                              setSelectedRoom(room);
                              loadRoomMessages(room.id);
                            }}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                          >
                            Join & Enter
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Guidelines */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Community Guidelines</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Be respectful and kind to all members</li>
          <li>• Stay on topic for each room</li>
          <li>• No harassment, hate speech, or inappropriate content</li>
          <li>• Report any violations to keep our community safe</li>
        </ul>
      </div>
    </div>
  );
};

export default Rooms;