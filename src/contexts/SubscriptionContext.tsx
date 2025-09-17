import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export type SubscriptionTier = 'free' | 'premium' | 'pioneer';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  expiresAt: string | null;
  features: {
    dailySuggestions: number;
    messagesPerDay: number;
    hasAdvancedFilters: boolean;
    hasAudioIntros: boolean;
    hasVideoChat: boolean;
    hasLocationDiscovery: boolean;
    hasBoosts: boolean;
    hasReferralSharing: boolean;
  };
}

interface SubscriptionContextType {
  subscription: SubscriptionStatus;
  loading: boolean;
  upgrade: (tier: SubscriptionTier) => Promise<boolean>;
  checkUsage: () => {
    suggestionsUsed: number;
    messagesUsed: number;
    canUseSuggestions: boolean;
    canSendMessages: boolean;
  };
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

const getFeaturesByTier = (tier: SubscriptionTier) => {
  switch (tier) {
    case 'free':
      return {
        dailySuggestions: 5,
        messagesPerDay: 3,
        hasAdvancedFilters: false,
        hasAudioIntros: false,
        hasVideoChat: false,
        hasLocationDiscovery: false,
        hasBoosts: false,
        hasReferralSharing: false,
      };
    case 'premium':
      return {
        dailySuggestions: 20,
        messagesPerDay: -1, // unlimited
        hasAdvancedFilters: true,
        hasAudioIntros: true,
        hasVideoChat: true,
        hasLocationDiscovery: true,
        hasBoosts: false,
        hasReferralSharing: false,
      };
    case 'pioneer':
      return {
        dailySuggestions: 20,
        messagesPerDay: -1, // unlimited
        hasAdvancedFilters: true,
        hasAudioIntros: true,
        hasVideoChat: true,
        hasLocationDiscovery: true,
        hasBoosts: true,
        hasReferralSharing: true,
      };
    default:
      return getFeaturesByTier('free');
  }
};

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    tier: 'free',
    expiresAt: null,
    features: getFeaturesByTier('free')
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const storedSub = localStorage.getItem('qupid_subscription');
      if (storedSub) {
        setSubscription(JSON.parse(storedSub));
      }
    }
    setLoading(false);
  }, [user]);

  const upgrade = async (tier: SubscriptionTier): Promise<boolean> => {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSubscription: SubscriptionStatus = {
          tier,
          expiresAt: tier !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
          features: getFeaturesByTier(tier)
        };
        
        setSubscription(newSubscription);
        localStorage.setItem('qupid_subscription', JSON.stringify(newSubscription));
        resolve(true);
      }, 2000);
    });
  };

  const checkUsage = () => {
    const today = new Date().toDateString();
    const usageKey = `qupid_usage_${today}`;
    const usage = JSON.parse(localStorage.getItem(usageKey) || '{"suggestions": 0, "messages": 0}');

    return {
      suggestionsUsed: usage.suggestions,
      messagesUsed: usage.messages,
      canUseSuggestions: subscription.features.dailySuggestions === -1 || usage.suggestions < subscription.features.dailySuggestions,
      canSendMessages: subscription.features.messagesPerDay === -1 || usage.messages < subscription.features.messagesPerDay
    };
  };

  const value: SubscriptionContextType = {
    subscription,
    loading,
    upgrade,
    checkUsage
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};