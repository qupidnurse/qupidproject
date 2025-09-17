import React, { useState } from 'react';
import { ShoppingBag, Crown, Star, Sparkles, Zap, Heart, Users, MessageCircle } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'avatar' | 'boost' | 'subscription';
  icon: React.ComponentType<any>;
  color: string;
  premium?: boolean;
  popular?: boolean;
}

const Store: React.FC = () => {
  const { subscription, upgrade } = useSubscription();
  const [loading, setLoading] = useState<string | null>(null);

  const subscriptionPlans = [
    {
      id: 'premium',
      name: 'Premium',
      price: 14.99,
      period: 'month',
      features: [
        '20 daily suggestions',
        'Unlimited messages',
        'Advanced filters',
        'Audio intros',
        'Video chat',
        'Location discovery',
        'Store discounts'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'pioneer',
      name: 'Pioneer',
      price: 0,
      period: 'invite only',
      features: [
        'All Premium features',
        'Weekly boost windows',
        'Referral revenue share',
        'Custom avatar badge',
        'Early access to features',
        'Priority support'
      ],
      color: 'from-yellow-500 to-orange-500',
      exclusive: true
    }
  ];

  const storeItems: StoreItem[] = [
    {
      id: 'boost-1',
      name: 'Profile Boost',
      description: 'Get 3x more visibility for 24 hours',
      price: 2.99,
      type: 'boost',
      icon: Zap,
      color: 'bg-yellow-500'
    },
    {
      id: 'boost-2',
      name: 'Super Boost',
      description: 'Get 5x more visibility for 48 hours',
      price: 4.99,
      type: 'boost',
      icon: Sparkles,
      color: 'bg-orange-500',
      popular: true
    },
    {
      id: 'avatar-1',
      name: 'Elegant Outfit Pack',
      description: 'Premium clothing options for your avatar',
      price: 1.99,
      type: 'avatar',
      icon: Crown,
      color: 'bg-purple-500',
      premium: true
    },
    {
      id: 'avatar-2',
      name: 'Seasonal Collection',
      description: 'Limited time seasonal avatar items',
      price: 3.99,
      type: 'avatar',
      icon: Star,
      color: 'bg-pink-500',
      premium: true
    }
  ];

  const handleUpgrade = async (tier: 'premium' | 'pioneer') => {
    if (tier === 'pioneer') {
      alert('Pioneer tier is invite-only. Keep being awesome and you might get invited!');
      return;
    }

    setLoading(tier);
    try {
      const success = await upgrade(tier);
      if (success) {
        alert('Successfully upgraded to Premium! 🎉');
      }
    } catch (error) {
      alert('Upgrade failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handlePurchase = (item: StoreItem) => {
    if (item.premium && subscription.tier === 'free') {
      alert('This item requires Premium subscription. Upgrade to unlock!');
      return;
    }
    
    alert(`Purchased ${item.name}! This would integrate with your payment system.`);
  };

  const getCurrentPlanFeatures = () => {
    switch (subscription.tier) {
      case 'premium':
        return [
          `${subscription.features.dailySuggestions} daily suggestions`,
          'Unlimited messages',
          'Advanced filters',
          'Audio intros',
          'Video chat',
          'Location discovery'
        ];
      case 'pioneer':
        return [
          'All Premium features',
          'Weekly boosts',
          'Referral earnings',
          'Custom badge',
          'Early access'
        ];
      default:
        return [
          `${subscription.features.dailySuggestions} daily suggestions`,
          `${subscription.features.messagesPerDay} messages per day`,
          'Basic avatar customization',
          'Community rooms access'
        ];
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Store</h1>
        <p className="text-gray-600">Enhance your Qupid experience</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Current Plan</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.tier === 'free' 
              ? 'bg-gray-100 text-gray-700'
              : subscription.tier === 'premium'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
          }`}>
            {subscription.tier === 'free' ? 'Free' : subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
          </div>
        </div>
        
        <div className="space-y-2">
          {getCurrentPlanFeatures().map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Plans */}
      {subscription.tier === 'free' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Your Experience</h2>
          <div className="space-y-4">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                {plan.exclusive && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    EXCLUSIVE
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    {plan.price > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold text-gray-600">{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleUpgrade(plan.id as 'premium' | 'pioneer')}
                  disabled={loading === plan.id || plan.exclusive}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                    plan.exclusive
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg transform hover:scale-[1.02]`
                  } ${loading === plan.id ? 'opacity-50' : ''}`}
                >
                  {loading === plan.id ? 'Processing...' : plan.exclusive ? 'Invite Only' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Store Items */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Store Items</h2>
        <div className="grid grid-cols-1 gap-4">
          {storeItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative">
                {item.popular && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                    POPULAR
                  </div>
                )}
                {item.premium && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                    PREMIUM
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${item.price}</span>
                      <button
                        onClick={() => handlePurchase(item)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                      >
                        Purchase
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Store Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Store Information</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• All purchases are processed securely through Stripe</li>
          <li>• Premium items require an active subscription</li>
          <li>• Boosts are one-time purchases with immediate effect</li>
          <li>• Refunds available within 24 hours of purchase</li>
        </ul>
      </div>
    </div>
  );
};

export default Store;