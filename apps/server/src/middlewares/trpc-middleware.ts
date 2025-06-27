import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from '@trpc/server/adapters/express';
import { Context } from '~/config/trpc';
import { trpcRouter } from '~/router/trpc';
import { JWT } from '~/utils/jwt';

function createContext(opts: CreateExpressContextOptions): Context {
  const authorization = opts.req.get('authorization') || '';
  const token = JWT.decode(authorization);

  console.log(`${opts.req.method} ${opts.req.url}`);

  if (!token) {
    return {
      req: opts.req,
    };
  }

  return {
    req: opts.req,
    user: {
      id: token as string,
    },
  };
}

export const trpcMiddleware = createExpressMiddleware({
  router: trpcRouter,
  createContext,
});
