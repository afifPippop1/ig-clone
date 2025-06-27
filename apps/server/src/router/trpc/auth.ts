import { Prisma, prisma } from '@ig-clone/database';
import { z } from 'zod';
import { publicProcedure, router } from '~/lib/trpc';
import { JWT } from '~/utils/jwt';
import bcrypt from 'bcrypt';
import { TRPCServerError } from '~/utils/error';

export const authRouter = router({
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(({ input }) => {
      const { email, password } = input;
      const token = JWT.encode({ id: '12345' });
      return { token };
    }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const encryptedPassword = bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
      );
      try {
        const user = await prisma.user.create({
          data: {
            email,
            password: encryptedPassword,
          },
        });
        const token = JWT.encode({ id: user.id });
        return { token };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          throw TRPCServerError.conflict('Email already exists');
        }
        throw TRPCServerError.internalError('Internal Server Error');
      }
    }),
});
