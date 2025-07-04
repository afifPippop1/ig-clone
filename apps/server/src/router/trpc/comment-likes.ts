import { prisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';

export const commentLikes = router({
  get: authenticatedProcedure
    .input(z.object({ commentId: z.string() }))
    .query(async (opt) => {
      return await prisma.commentLikes.findFirst({
        where: { userId: opt.ctx.user.id, commentId: opt.input.commentId },
      });
    }),
  like: authenticatedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async (opt) => {
      return await prisma.commentLikes.create({
        data: {
          userId: opt.ctx.user.id,
          commentId: opt.input.commentId,
        },
      });
    }),
  dislike: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opt) => {
      return await prisma.commentLikes.delete({
        where: {
          id: opt.input.id,
        },
      });
    }),
});
