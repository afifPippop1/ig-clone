import { prisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, publicProcedure, router } from '~/lib/trpc';

export const follow = router({
  isFollow: authenticatedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opt) => {
      const isFollow = await prisma.follow.findFirst({
        where: {
          followerId: opt.ctx.user.id,
          followingId: opt.input.userId,
        },
      });
      return { isFollow };
    }),
  follow: authenticatedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async (opt) => {
      await prisma.follow.create({
        data: {
          followerId: opt.ctx.user.id,
          followingId: opt.input.userId,
        },
      });
      return { ok: true, message: 'Follow success' };
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
  follower: publicProcedure
    .input(z.object({ followingId: z.string() }))
    .query(async (opt) => {
      const followingId = opt.input.followingId;
      return await prisma.follow.count({ where: { followingId } });
    }),

  following: publicProcedure
    .input(z.object({ followerId: z.string() }))
    .query(async (opt) => {
      const followerId = opt.input.followerId;
      return await prisma.follow.count({ where: { followerId } });
    }),
});
