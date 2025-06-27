import { z } from 'zod';
import { publicProcedure, router } from '~/config/trpc';
import { JWT } from '~/utils/jwt';

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
});
