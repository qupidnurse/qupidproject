import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  verified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyAge: (birthDate: string) => Promise<boolean>;
  verifyIdentity: (selfieData: string, idData: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = () => {
      const storedUser = localStorage.getItem('qupid_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    setTimeout(checkAuth, 1000);
  }, []);

  const verifyAge = async (birthDate: string): Promise<boolean> => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= 18;
    }
    
    return age >= 18;
  };

  const verifyIdentity = async (selfieData: string, idData: string): Promise<boolean> => {
    // Simulate identity verification process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // In real app, this would call verification service
      }, 2000);
    });
  };

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    // Simulate login
    const mockUser: User = {
      id: 'user_' + Date.now(),
      email,
      verified: true,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('qupid_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    // Simulate signup
    const mockUser: User = {
      id: 'user_' + Date.now(),
      email,
      verified: false,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('qupid_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const logout = (): void => {
    localStorage.removeItem('qupid_user');
    localStorage.removeItem('qupid_profile');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    verifyAge,
    verifyIdentity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};