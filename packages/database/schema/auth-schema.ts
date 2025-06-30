import { z } from 'zod';
import { ProfileSchema, UserSchema } from '../prisma/generated/zod';

export const signUpSchema = UserSchema.merge(ProfileSchema).pick({
  email: true,
  password: true,
  birthdate: true,
  name: true,
  username: true,
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = UserSchema.pick({
  email: true,
  password: true,
});
export type SignInSchema = z.infer<typeof signInSchema>;
