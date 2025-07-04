import { PublicUserSchema } from '@ig-clone/database';
import { RefetchOptions, useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { useTRPC } from '~/lib/trpc';

interface AuthContextValue {
  user?: PublicUserSchema | null;
  refetch: (options?: RefetchOptions) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  refetch: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  user: PublicUserSchema | null;
}

export function AuthProvider({
  children,
  user: defaultUser,
}: AuthProviderProps) {
  const trpc = useTRPC();
  const { data: user, refetch } = useQuery({
    ...trpc.auth.me.queryOptions(),
    placeholderData: defaultUser || undefined,
    staleTime: 0, // 👈 important!
  });
  async function refetchUser() {
    await refetch();
  }
  return (
    <AuthContext.Provider value={{ user, refetch: refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useUser should only be used inside AuthProvider');
  }
  return context;
}
