import { prisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';
import { TRPCServerError } from '~/utils/error';

export const follow = router({
  isFollow: authenticatedProcedure
    .input(z.object({ username: z.string() }))
    .query(async (opt) => {
      const user = await prisma.user.findFirst({
        where: { username: opt.input.username },
      });
      const isFollow = await prisma.follow.findFirst({
        where: {
          followerId: opt.ctx.user.id,
          followingId: user?.id,
        },
      });
      return { isFollow };
    }),
  follow: authenticatedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async (opt) => {
      const user = await prisma.user.findFirst({
        where: { username: opt.input.username },
      });
      if (user) {
        await prisma.follow.create({
          data: {
            followerId: opt.ctx.user.id,
            followingId: user?.id,
          },
        });
        return { ok: true, message: 'Follow success' };
      }
      throw TRPCServerError.badRequest('Follow failed');
    }),

  unfollow: authenticatedProcedure
    .input(z.object({ followerId: z.string(), followingId: z.string() }))
    .mutation(async (opt) => {
      const { followerId, followingId } = opt.input;
      await prisma.follow.delete({
        where: {
          followerId_followingId: { followerId, followingId },
        },
      });
    }),
});
