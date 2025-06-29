import { useRouteLoaderData } from '@remix-run/react';
import { authMiddleware } from '~/middlewares/auth-middleware';

export function useUser() {
  const loader = useRouteLoaderData<typeof authMiddleware>('root');

  if (!loader) {
    return { userId: null };
  }
  return loader;
}
