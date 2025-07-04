import { prisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';

export const likes = router({
  get: authenticatedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async (opt) => {
      return await prisma.likes.findFirst({
        where: {
          postId: opt.input.postId,
          userId: opt.ctx.user.id,
        },
      });
    }),
  like: authenticatedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async (opt) => {
      return await prisma.likes.create({
        data: {
          postId: opt.input.postId,
          userId: opt.ctx.user.id,
        },
      });
    }),
  dislike: authenticatedProcedure
    .input(z.object({ likeId: z.string() }))
    .mutation(async (opt) => {
      return await prisma.likes.delete({
        where: {
          id: opt.input.likeId,
        },
      });
    }),
});
