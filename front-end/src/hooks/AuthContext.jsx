import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('finfreela_token');
    const savedUser = localStorage.getItem('finfreela_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('finfreela_token');
        localStorage.removeItem('finfreela_user');
      }
    }
    setLoading(false);
  }, []);

  async function register(name, email, password) {
    try {
      const data = await authService.register(name, email, password);
      if (data.user) {
        localStorage.setItem('finfreela_user', JSON.stringify(data.user));
        setUser(data.user);
      }
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar conta.');
    }
  }

  async function login(email, password) {
    try {
      const data = await authService.login(email, password);
      const loggedUser = data.user || { email };
      localStorage.setItem('finfreela_user', JSON.stringify(loggedUser));
      setUser(loggedUser);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'E-mail ou senha inválidos.');
    }
  }

  async function logout() {
    await authService.logout();
    localStorage.removeItem('finfreela_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>');
  }
  return context;
}