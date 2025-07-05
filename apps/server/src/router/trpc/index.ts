import { router } from '~/lib/trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { post } from './post';
import { likes } from './like';
import { comments } from './comments';
import { commentLikes } from './comment-likes';
import { follow } from './follow';

export const trpcRouter = router({
  users: usersRouter,
  auth: authRouter,
  post,
  likes,
  comments,
  commentLikes,
  follow,
});

export type AppRouter = typeof trpcRouter;
