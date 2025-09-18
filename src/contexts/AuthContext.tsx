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
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
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

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user exists (simulate checking against database)
      const existingUsers = JSON.parse(localStorage.getItem('qupid_registered_users') || '[]');
      const existingUser = existingUsers.find((u: any) => u.email === email);
      
      if (!existingUser) {
        throw new Error('No account found with this email address');
      }
      
      // Simple password check (in real app, this would be hashed)
      if (existingUser.password !== password) {
        throw new Error('Incorrect password');
      }
      
      const mockUser: User = {
        id: existingUser.id,
        email: existingUser.email,
        verified: existingUser.verified,
        createdAt: existingUser.createdAt
      };
      
      // Store session
      const sessionData = { ...mockUser, rememberMe };
      localStorage.setItem('qupid_user', JSON.stringify(sessionData));
      
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check for existing users
      const existingUsers = JSON.parse(localStorage.getItem('qupid_registered_users') || '[]');
      const existingUser = existingUsers.find((u: any) => u.email === email);
      
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }
      
      const newUser = {
        id: 'user_' + Date.now(),
        email,
        password, // In real app, this would be hashed
        verified: false,
        createdAt: new Date().toISOString()
      };
      
      // Store in "database"
      existingUsers.push(newUser);
      localStorage.setItem('qupid_registered_users', JSON.stringify(existingUsers));
      
      const mockUser: User = {
        id: newUser.id,
        email: newUser.email,
        verified: newUser.verified,
        createdAt: newUser.createdAt
      };
      
      localStorage.setItem('qupid_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user exists
      const existingUsers = JSON.parse(localStorage.getItem('qupid_registered_users') || '[]');
      const existingUser = existingUsers.find((u: any) => u.email === email);
      
      if (!existingUser) {
        throw new Error('No account found with this email address');
      }
      
      // In a real app, this would send an email with a reset token
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
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
    resetPassword,
    verifyAge,
    verifyIdentity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};