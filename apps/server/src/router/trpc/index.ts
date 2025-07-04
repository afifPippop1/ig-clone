import { router } from '~/lib/trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { post } from './post';
import { likes } from './like';
import { comments } from './comments';

export const trpcRouter = router({
  users: usersRouter,
  auth: authRouter,
  post,
  likes,
  comments,
});

export type AppRouter = typeof trpcRouter;
