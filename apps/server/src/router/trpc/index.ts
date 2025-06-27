import { authenticatedProcedure, publicProcedure, router } from '~/config/trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';

export const trpcRouter = router({
  users: usersRouter,
  auth: authRouter,
});
