import { prisma, ZodPrisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';
import { TRPCServerError } from '~/utils/error';

export const post = router({
  feed: authenticatedProcedure
    .input(
      ZodPrisma.PostsSchema.pick({
        contentUrl: true,
        caption: true,
      })
    )
    .mutation(async (opts) => {
      try {
        const data = { ...opts.input, userId: opts.ctx.user.id };

        await prisma.posts.create({
          data,
        });

        return { ok: true, message: 'Successfully posting a post' };
      } catch {
        throw TRPCServerError.internalError();
      }
    }),
  getFeed: authenticatedProcedure
    .input(z.object({ username: z.string() }))
    .query(async (opts) => {
      const user = await prisma.user.findFirst({
        where: { username: opts.input.username },
      });
      if (!user) {
        throw TRPCServerError.notFound('User not found');
      }
      return await prisma.posts.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'asc' },
      });
    }),

  getPost: authenticatedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async (opt) => {
      return await prisma.posts.findFirst({ where: { id: opt.input.postId } });
    }),
});
