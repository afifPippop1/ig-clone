import { router } from '~/lib/trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';

export const trpcRouter = router({
  users: usersRouter,
  auth: authRouter,
});

export type AppRouter = typeof trpcRouter;
