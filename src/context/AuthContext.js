import React, { createContext, useContext, useState } from 'react';
import { ADMIN_PASSWORD } from '../utils/data';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('admin_auth') === 'true');
  const [error, setError] = useState('');

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAdmin(true);
      setError('');
      return true;
    }
    setError('كلمة المرور غير صحيحة، حاولي مجدداً');
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
