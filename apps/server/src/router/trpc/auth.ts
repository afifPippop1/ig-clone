import { Prisma } from '@ig-clone/database';
import { signInSchema, signUpSchema, userSchema } from '@ig-clone/schema';
import { authenticatedProcedure, publicProcedure, router } from '~/lib/trpc';
import { createUser, signInService } from '~/services/auth-service';
import { getUserById } from '~/services/user-service';
import { TRPCErrorCode, TRPCServerError } from '~/utils/error';

const LOGIN_ERROR_MESSAGE = 'Invalid email or password';

const COOKIE_NAME = 'auth';

function createAuthCookie(token: string) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${
    60 * 60 * 24 * 30
  }; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`;
}

const signInMuatation = publicProcedure
  .input(signInSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const { email, password } = input;
      const token = await signInService({ email, password });

      ctx.res.setHeader('Set-Cookie', createAuthCookie(token));

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
      const { email, password, confirm, birthdate, name, username } = input;

      await createUser({ email, password, confirm, birthdate, name, username });

      return { ok: true, message: 'User created successfully' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const field = (error?.meta?.target as string[]).join(', ') || 'email';

        throw TRPCServerError.conflict(`${field} already exists`);
      }
      throw TRPCServerError.internalError();
    }
  });

const me = authenticatedProcedure.output(userSchema).query(async ({ ctx }) => {
  try {
    const user = await getUserById(ctx.user.id);
    if (!user) {
      throw TRPCServerError.unauthorized();
    }
    return {
      id: user.id,
      username: user.username,
    };
  } catch (error) {
    console.log(error);
    throw TRPCServerError.internalError();
  }
});

export const authRouter = router({
  signIn: signInMuatation,
  signUp: signUpMutation,
  me,
});
