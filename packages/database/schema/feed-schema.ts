import { Likes } from '@prisma/client';
import {
  LikesSchema,
  PostsSchema,
  ProfileSchema,
  UserSchema,
} from '../prisma/generated/zod';
import { z } from 'zod';

export const feedOutput = PostsSchema.extend({
  user: UserSchema.pick({
    id: true,
    username: true,
  }).extend({
    profile: ProfileSchema.pick({
      photoProfilePath: true,
    }),
  }),
  Likes: LikesSchema,
  _count: z.object({
    Likes: z.number(),
  }),
});

export type FeedOutput = z.infer<typeof feedOutput>;
