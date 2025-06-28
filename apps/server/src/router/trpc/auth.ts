import { Prisma } from '@ig-clone/database';
import { signInSchema, signUpSchema } from '@ig-clone/schema';
import { publicProcedure, router } from '~/lib/trpc';
import { createUser, signInService } from '~/services/auth-service';
import { TRPCErrorCode, TRPCServerError } from '~/utils/error';

const LOGIN_ERROR_MESSAGE = 'Invalid email or password';

const signInMuatation = publicProcedure
  .input(signInSchema)
  .mutation(async ({ input }) => {
    try {
      const { email, password } = input;
      const token = await signInService({ email, password });

      return { token };
    } catch (error) {
      if (
        error instanceof TRPCServerError &&
        error.code === TRPCErrorCode.UNAUTHORIZED
      ) {
        throw TRPCServerError.unauthorized(LOGIN_ERROR_MESSAGE);
      }
      throw TRPCServerError.internalError();
    }
  });

const signUpMutation = publicProcedure
  .input(signUpSchema)
  .mutation(async ({ input }) => {
    try {
      const { email, password, confirm } = input;

      await createUser({ email, password, confirm });

      return { ok: true, message: 'User created successfully' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw TRPCServerError.conflict('Email already exists');
      }
      throw TRPCServerError.internalError();
    }
  });

export const authRouter = router({
  signIn: signInMuatation,
  signUp: signUpMutation,
});
