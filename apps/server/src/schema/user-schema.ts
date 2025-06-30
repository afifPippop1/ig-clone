import { ZodPrisma } from '@ig-clone/database';
import { z } from 'zod';

export const publicUserSchema = ZodPrisma.UserSchema.merge(
  ZodPrisma.ProfileSchema
).pick({
  id: true,
  username: true,
  name: true,
});

export type PublicUserSchema = z.infer<typeof publicUserSchema>;
