import { z } from 'zod';
import { ProfileSchema, UserSchema } from '../prisma/generated/zod';

export const publicUserSchema = UserSchema.merge(ProfileSchema).pick({
  id: true,
  username: true,
  name: true,
});

export type PublicUserSchema = z.infer<typeof publicUserSchema>;
