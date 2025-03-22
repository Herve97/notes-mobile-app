import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    const response: any = await authService.getUser();

    if (response?.error) {
      setUser(null);
    } else {
      setUser(response);
    }

    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response: any = await authService.login(email, password);

    if (response?.error) {
      return response;
    }

    await checkUser();
    return { success: true };
  };

  const register = async (email: string, password: string) => {
    const response: any = await authService.register(email, password);

    if (response?.error) {
      return response;
    }

    return login(email, password); // Auto-login after register
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  // return (
  //   <AuthContext.Provider
  //     value={{
  //       user,
  //       login,
  //       register,
  //       logout,
  //       loading,
  //     }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );
};

export const useAuth = () => useContext(AuthContext);
