import { PublicUserSchema } from '@ig-clone/database';
import { createContext, ReactNode, useContext } from 'react';

interface AuthContextValue {
  user: PublicUserSchema | null;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
});

interface AuthProviderProps {
  children: ReactNode;
  user: PublicUserSchema | null;
}

export function AuthProvider({ children, user }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useUser should only be used inside AuthProvider');
  }
  return context;
}
