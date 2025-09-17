import React from 'react';
import { Home, MessageCircle, Users, User, ShoppingBag, Settings } from 'lucide-react';

interface NavigationProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentRoute, onRouteChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Discover' },
    { id: 'chat', icon: MessageCircle, label: 'Chats' },
    { id: 'rooms', icon: Users, label: 'Rooms' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'store', icon: ShoppingBag, label: 'Store' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onRouteChange(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;