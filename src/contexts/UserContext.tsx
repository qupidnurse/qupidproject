import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Avatar {
  bodyType: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  accessories: string[];
}

export interface UserProfile {
  id: string;
  displayName: string;
  pronouns: string;
  orientation: string;
  age: number;
  bio: string;
  interests: string[];
  values: string[];
  avatar: Avatar;
  cityBucket: string;
  preferences: {
    ageMin: number;
    ageMax: number;
    distance: string;
    dealBreakers: string[];
  };
  onboardingComplete: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

interface UserContextType {
  profile: UserProfile | null;
  loading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  saveProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const storedProfile = localStorage.getItem('qupid_profile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        // Initialize empty profile
        const newProfile: UserProfile = {
          id: user.id,
          displayName: '',
          pronouns: '',
          orientation: '',
          age: 18,
          bio: '',
          interests: [],
          values: [],
          avatar: {
            bodyType: 'athletic',
            skinTone: 'medium',
            hairStyle: 'short',
            hairColor: 'brown',
            outfit: 'casual',
            accessories: []
          },
          cityBucket: '',
          preferences: {
            ageMin: 18,
            ageMax: 35,
            distance: 'nearby',
            dealBreakers: []
          },
          onboardingComplete: false,
          verificationStatus: 'pending'
        };
        setProfile(newProfile);
      }
    }
    setLoading(false);
  }, [user]);

  const updateProfile = (updates: Partial<UserProfile>): void => {
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
    }
  };

  const saveProfile = async (): Promise<void> => {
    if (profile) {
      localStorage.setItem('qupid_profile', JSON.stringify(profile));
    }
  };

  const value: UserContextType = {
    profile,
    loading,
    updateProfile,
    saveProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};