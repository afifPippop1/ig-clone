import { router } from '~/lib/trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { post } from './post';
import { likes } from './like';

export const trpcRouter = router({
  users: usersRouter,
  auth: authRouter,
  post,
  likes,
});

export type AppRouter = typeof trpcRouter;
