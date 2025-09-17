import React, { useState } from 'react';
import Welcome from './Welcome';
import AgeVerification from './AgeVerification';
import IdentityVerification from './IdentityVerification';
import AvatarBuilder from './AvatarBuilder';
import ProfileSetup from './ProfileSetup';
import InterestSelection from './InterestSelection';
import PreferencesSetup from './PreferencesSetup';
import OnboardingComplete from './OnboardingComplete';

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<any>({});

  const steps = [
    { component: Welcome, title: 'Welcome to Qupid' },
    { component: AgeVerification, title: 'Age Verification' },
    { component: IdentityVerification, title: 'Identity Verification' },
    { component: AvatarBuilder, title: 'Create Your Avatar' },
    { component: ProfileSetup, title: 'Set Up Profile' },
    { component: InterestSelection, title: 'Your Interests' },
    { component: PreferencesSetup, title: 'Dating Preferences' },
    { component: OnboardingComplete, title: 'Welcome Aboard!' }
  ];

  const nextStep = (data?: any) => {
    if (data) {
      setOnboardingData(prev => ({ ...prev, ...data }));
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {steps.length - 1}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round((currentStep / (steps.length - 1)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <CurrentComponent
          onNext={nextStep}
          onBack={prevStep}
          data={onboardingData}
          canGoBack={currentStep > 0}
        />
      </div>
    </div>
  );
};

export default OnboardingFlow;