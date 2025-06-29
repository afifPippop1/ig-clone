import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from '@trpc/server/adapters/express';
import { Context } from '~/lib/trpc';
import { trpcRouter } from '~/router/trpc';
import { JWT } from '~/utils/jwt';

function createContext({ req, res }: CreateExpressContextOptions): Context {
  const authorization = req.headers.authorization;
  console.log(`${req.method} ${req.url}`);

  if (authorization) {
    const token = JWT.decode(authorization) as { id: string };

    if (token.id) {
      return {
        req,
        res,
        user: {
          id: token.id,
        },
      };
    }
  }
  return {
    req,
    res,
  };
}

export const trpcMiddleware = createExpressMiddleware({
  router: trpcRouter,
  createContext,
});
