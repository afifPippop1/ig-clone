import { prisma, publicUserSchema, ZodPrisma } from '@ig-clone/database';
import { z } from 'zod';
import { authenticatedProcedure, router } from '~/lib/trpc';
import { TRPCServerError } from '~/utils/error';

const getUser = authenticatedProcedure
  .input(
    z.object({
      username: z.string(),
    })
  )
  .output(publicUserSchema)
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

const updateUser = authenticatedProcedure
  .input(ZodPrisma.ProfileSchema.partial())
  .mutation(async ({ ctx, input }) => {
    try {
      await prisma.profile.update({
        where: { id: ctx.user.id },
        data: input,
      });
      return {
        ok: true,
        message: 'User successfully updated',
      };
    } catch {
      throw TRPCServerError.internalError();
    }
  });

export const usersRouter = router({
  getUser,
  updateUser,
});
