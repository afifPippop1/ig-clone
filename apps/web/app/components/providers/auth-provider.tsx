import { UserSchema } from '@ig-clone/schema';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { useTRPC } from '~/lib/trpc';

interface AuthContextValue {
  user?: UserSchema | null;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const trpc = useTRPC();
  const userQuery = useQuery(trpc.auth.me.queryOptions());
  const user = userQuery.data;
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
