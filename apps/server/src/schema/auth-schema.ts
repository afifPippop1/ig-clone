import { ZodPrisma } from '@ig-clone/database';
import { z } from 'zod';

export const signUpSchema = ZodPrisma.UserSchema.merge(
  ZodPrisma.ProfileSchema
).pick({
  email: true,
  password: true,
  birthdate: true,
  name: true,
  username: true,
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = ZodPrisma.UserSchema.pick({
  email: true,
  password: true,
});
export type SignInSchema = z.infer<typeof signInSchema>;
