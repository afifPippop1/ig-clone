import { prisma } from '@ig-clone/database';
import { userSchema } from '@ig-clone/schema';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';
import { TRPCServerError } from '~/utils/error';

const getUser = authenticatedProcedure
  .input(
    z.object({
      username: z.string(),
    })
  )
  .output(userSchema)
  .query(async ({ input }) => {
    const { username } = input;
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (!user) {
      throw TRPCServerError.notFound('User not found');
    }
    const profile = await prisma.profile.findFirst({
      where: { id: user.id },
    });
    if (!profile) {
      throw TRPCServerError.notFound('User not found');
    }

    return { username: user.username, ...profile };
  });

export const usersRouter = router({
  list: authenticatedProcedure.query(() => {
    return [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];
  }),
  getUser,
});
