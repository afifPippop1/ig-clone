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
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          throw TRPCServerError.unauthorized();
        }
        const confirmPassword = bcrypt.compareSync(password, user.password);
        if (!confirmPassword) {
          throw TRPCServerError.unauthorized();
        }

        const token = JWT.encode({ id: user.id });
        return { token };
      } catch (error: any) {
        if (error instanceof TRPCServerError && error.code === 'UNAUTHORIZED') {
          throw TRPCServerError.unauthorized('Invalid email or password');
        }
        throw TRPCServerError.internalError('Internal Server Error');
      }
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
        await prisma.user.create({
          data: {
            email,
            password: encryptedPassword,
          },
        });
        return { ok: true, message: 'User created successfully' };
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
