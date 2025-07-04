import { prisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';

export const comments = router({
  comments: authenticatedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async (opt) => {
      const postId = opt.input.postId;
      return await prisma.comments.findMany({
        where: { postId },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
    }),
  post: authenticatedProcedure
    .input(z.object({ postId: z.string(), comments: z.string() }))
    .mutation(async (opt) => {
      return await prisma.comments.create({
        data: {
          comments: opt.input.comments,
          postId: opt.input.postId,
          userId: opt.ctx.user.id,
        },
      });
    }),
});
