import { prisma, ZodPrisma } from '@ig-clone/database';
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
  getFeed: authenticatedProcedure.query(async (opts) => {
    return await prisma.posts.findMany({
      where: { userId: opts.ctx.user.id },
      orderBy: { createdAt: 'asc' },
    });
  }),
});
