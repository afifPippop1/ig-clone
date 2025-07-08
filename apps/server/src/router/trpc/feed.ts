import { feedOutput, FeedOutput, prisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';

export const feed = router({
  recomendation: authenticatedProcedure.query(async (opt) => {
    const currentUser = opt.ctx.user;
    const feed = await prisma.posts.findMany({
      where: {
        userId: {
          in: (
            await prisma.follow.findMany({
              where: { followerId: currentUser.id },
              select: { followingId: true },
            })
          ).map((f) => f.followingId),
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                photoProfilePath: true,
              },
            },
          },
        },
        _count: {
          select: { Likes: true },
        },
        Likes: {
          where: {
            userId: currentUser.id,
          },
          select: { id: true },
        },
      },
    });
    return feed;
  }),
});
