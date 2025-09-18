import React, { useState } from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AgeVerificationProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onNext, onBack, canGoBack }) => {
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { verifyAge, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Verify age first
      const isValidAge = await verifyAge(birthDate);
      if (!isValidAge) {
        setError('You must be 18 or older to use Qupid.');
        setIsLoading(false);
        return;
      }

      // Calculate age for profile
      const birth = new Date(birthDate);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const finalAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()) ? age - 1 : age;

      onNext({ age: finalAge, email: user?.email });
    } catch (err) {
      setError('Age verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-6 py-8 min-h-screen flex flex-col">
      {canGoBack && (
        <button
          onClick={onBack}
          className="self-start text-purple-600 mb-4 hover:text-purple-700 transition-colors"
        >
          ← Back
        </button>
      )}

      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Age Verification</h2>
        <p className="text-gray-600">You must be 18 or older to join Qupid</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 rounded-xl border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Why we verify age:</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Legal requirement for dating platforms</li>
            <li>• Ensures a safe community for adults</li>
            <li>• Your birth date is stored securely and never shared</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading || !birthDate}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
        >
          {isLoading ? 'Verifying Age...' : 'Verify Age & Continue'}
        </button>
      </form>
    </div>
  );
};

export default AgeVerification;