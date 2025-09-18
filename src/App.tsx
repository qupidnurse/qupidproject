import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import AuthScreen from './components/Auth/AuthScreen';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import Dashboard from './components/Dashboard/Dashboard';
import Chat from './components/Chat/Chat';
import Rooms from './components/Rooms/Rooms';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Store from './components/Store/Store';
import Navigation from './components/Navigation/Navigation';
import LoadingScreen from './components/Common/LoadingScreen';
import { useAuth } from './contexts/AuthContext';
import { useUser } from './contexts/UserContext';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUser();
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  if (authLoading || profileLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (!profile?.onboardingComplete) {
    return <OnboardingFlow />;
  }

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <Chat />;
      case 'rooms':
        return <Rooms />;
      case 'profile':
        return <Profile />;
      case 'store':
        return <Store />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        <main className="pb-20">
          {renderCurrentPage()}
        </main>
        <Navigation currentRoute={currentRoute} onRouteChange={setCurrentRoute} />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <SubscriptionProvider>
          <AppContent />
        </SubscriptionProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;