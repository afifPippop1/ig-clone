import { router } from '~/lib/trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { post } from './post';

export const trpcRouter = router({
  users: usersRouter,
  auth: authRouter,
  post,
});

export type AppRouter = typeof trpcRouter;
