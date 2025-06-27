import { initTRPC } from '@trpc/server';
import { Request } from 'express';
import { TRPCServerError } from '~/utils/error';

export interface Context {
  req: Request;
  user?: {
    id: string;
  };
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw TRPCServerError.unauthorized(
      'You must be logged in to access this resource.'
    );
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
