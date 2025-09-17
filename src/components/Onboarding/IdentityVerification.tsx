import React, { useState } from 'react';
import { Camera, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface IdentityVerificationProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const IdentityVerification: React.FC<IdentityVerificationProps> = ({ onNext, onBack, canGoBack }) => {
  const [step, setStep] = useState(1); // 1: instructions, 2: selfie, 3: id, 4: processing
  const [selfieData, setSelfieData] = useState<string>('');
  const [idData, setIdData] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { verifyIdentity } = useAuth();

  const handleSelfieCapture = () => {
    // Simulate camera capture
    const mockSelfieData = `selfie_${Date.now()}`;
    setSelfieData(mockSelfieData);
    setStep(3);
  };

  const handleIdCapture = () => {
    // Simulate ID capture
    const mockIdData = `id_${Date.now()}`;
    setIdData(mockIdData);
    setStep(4);
  };

  const processVerification = async () => {
    setIsProcessing(true);
    try {
      const result = await verifyIdentity(selfieData, idData);
      if (result) {
        onNext({ verified: true });
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (step === 4 && selfieData && idData && !isProcessing) {
      processVerification();
    }
  }, [step, selfieData, idData]);

  const renderInstructions = () => (
    <div className="flex-1 space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2>
        <p className="text-gray-600">Help us keep Qupid safe for everyone</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
          <div>
            <h4 className="font-medium text-blue-900">Take a selfie</h4>
            <p className="text-blue-700 text-sm">We'll use liveness detection to verify it's really you</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
          <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
          <div>
            <h4 className="font-medium text-purple-900">Scan your ID</h4>
            <p className="text-purple-700 text-sm">Government-issued photo ID for age verification</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
        <h4 className="font-medium text-green-900 mb-2">Your privacy is protected:</h4>
        <ul className="text-green-800 text-sm space-y-1">
          <li>• ID data is encrypted and automatically deleted after verification</li>
          <li>• We only verify age and authenticity</li>
          <li>• Verification is required before sharing any photos</li>
          <li>• This helps prevent fake profiles and underage users</li>
        </ul>
      </div>

      <button
        onClick={() => setStep(2)}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        Start Verification
      </button>
    </div>
  );

  const renderSelfieStep = () => (
    <div className="flex-1 space-y-6">
      <div className="text-center mb-8">
        <Camera className="w-16 h-16 mx-auto text-purple-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Take a Selfie</h3>
        <p className="text-gray-600">Make sure your face is clearly visible and well-lit</p>
      </div>

      <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center mb-6">
        <div className="text-center">
          <Camera className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">Camera preview would appear here</p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleSelfieCapture}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
        >
          Capture Selfie
        </button>
        <button
          onClick={() => setStep(1)}
          className="w-full text-gray-600 py-2"
        >
          Back to Instructions
        </button>
      </div>
    </div>
  );

  const renderIdStep = () => (
    <div className="flex-1 space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Scan Your ID</h3>
        <p className="text-gray-600">Position your government ID within the frame</p>
      </div>

      <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="w-48 h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-gray-500 text-sm">ID Frame</span>
          </div>
          <p className="text-gray-500">Position ID here</p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleIdCapture}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
        >
          Scan ID
        </button>
        <button
          onClick={() => setStep(2)}
          className="w-full text-gray-600 py-2"
        >
          Back to Selfie
        </button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <Shield className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Verifying Identity</h3>
        <p className="text-gray-600 mb-6">This usually takes just a few seconds...</p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-6 py-8 min-h-screen flex flex-col">
      {canGoBack && step === 1 && (
        <button
          onClick={onBack}
          className="self-start text-purple-600 mb-4 hover:text-purple-700 transition-colors"
        >
          ← Back
        </button>
      )}

      {step === 1 && renderInstructions()}
      {step === 2 && renderSelfieStep()}
      {step === 3 && renderIdStep()}
      {step === 4 && renderProcessing()}
    </div>
  );
};

export default IdentityVerification;