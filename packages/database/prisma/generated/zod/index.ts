import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','username','password','createdAt','updatedAt']);

export const ProfileScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','birthdate','photoProfilePath']);

export const PostsScalarFieldEnumSchema = z.enum(['id','userId','contentUrl','caption','createdAt','updatedAt']);

export const CommentsScalarFieldEnumSchema = z.enum(['id','userId','postId','comments','createdAt','updatedAt']);

export const LikesScalarFieldEnumSchema = z.enum(['id','userId','postId','createdAt','updatedAt']);

export const FollowScalarFieldEnumSchema = z.enum(['followerId','followingId','createdAt']);

export const CommentLikesScalarFieldEnumSchema = z.enum(['id','commentId','userId','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  birthdate: z.coerce.date(),
  photoProfilePath: z.string().nullable(),
})

export type Profile = z.infer<typeof ProfileSchema>

/////////////////////////////////////////
// POSTS SCHEMA
/////////////////////////////////////////

export const PostsSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  contentUrl: z.string(),
  caption: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Posts = z.infer<typeof PostsSchema>

/////////////////////////////////////////
// COMMENTS SCHEMA
/////////////////////////////////////////

export const CommentsSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  postId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Comments = z.infer<typeof CommentsSchema>

/////////////////////////////////////////
// LIKES SCHEMA
/////////////////////////////////////////

export const LikesSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  postId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Likes = z.infer<typeof LikesSchema>

/////////////////////////////////////////
// FOLLOW SCHEMA
/////////////////////////////////////////

export const FollowSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.coerce.date(),
})

export type Follow = z.infer<typeof FollowSchema>

/////////////////////////////////////////
// COMMENT LIKES SCHEMA
/////////////////////////////////////////

export const CommentLikesSchema = z.object({
  id: z.string().uuid(),
  commentId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

export type CommentLikes = z.infer<typeof CommentLikesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Posts: z.union([z.boolean(),z.lazy(() => PostsFindManyArgsSchema)]).optional(),
  Comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
  Likes: z.union([z.boolean(),z.lazy(() => LikesFindManyArgsSchema)]).optional(),
  Followers: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  Following: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  CommentLikes: z.union([z.boolean(),z.lazy(() => CommentLikesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Posts: z.boolean().optional(),
  Comments: z.boolean().optional(),
  Likes: z.boolean().optional(),
  Followers: z.boolean().optional(),
  Following: z.boolean().optional(),
  CommentLikes: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Posts: z.union([z.boolean(),z.lazy(() => PostsFindManyArgsSchema)]).optional(),
  Comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
  Likes: z.union([z.boolean(),z.lazy(() => LikesFindManyArgsSchema)]).optional(),
  Followers: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  Following: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  CommentLikes: z.union([z.boolean(),z.lazy(() => CommentLikesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFILE
//------------------------------------------------------

export const ProfileSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  birthdate: z.boolean().optional(),
  photoProfilePath: z.boolean().optional(),
}).strict()

// POSTS
//------------------------------------------------------

export const PostsIncludeSchema: z.ZodType<Prisma.PostsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
  Likes: z.union([z.boolean(),z.lazy(() => LikesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PostsArgsSchema: z.ZodType<Prisma.PostsDefaultArgs> = z.object({
  select: z.lazy(() => PostsSelectSchema).optional(),
  include: z.lazy(() => PostsIncludeSchema).optional(),
}).strict();

export const PostsCountOutputTypeArgsSchema: z.ZodType<Prisma.PostsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PostsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PostsCountOutputTypeSelectSchema: z.ZodType<Prisma.PostsCountOutputTypeSelect> = z.object({
  Comments: z.boolean().optional(),
  Likes: z.boolean().optional(),
}).strict();

export const PostsSelectSchema: z.ZodType<Prisma.PostsSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  contentUrl: z.boolean().optional(),
  caption: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
  Likes: z.union([z.boolean(),z.lazy(() => LikesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENTS
//------------------------------------------------------

export const CommentsIncludeSchema: z.ZodType<Prisma.CommentsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostsArgsSchema)]).optional(),
  CommentLikes: z.union([z.boolean(),z.lazy(() => CommentLikesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CommentsArgsSchema: z.ZodType<Prisma.CommentsDefaultArgs> = z.object({
  select: z.lazy(() => CommentsSelectSchema).optional(),
  include: z.lazy(() => CommentsIncludeSchema).optional(),
}).strict();

export const CommentsCountOutputTypeArgsSchema: z.ZodType<Prisma.CommentsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CommentsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CommentsCountOutputTypeSelectSchema: z.ZodType<Prisma.CommentsCountOutputTypeSelect> = z.object({
  CommentLikes: z.boolean().optional(),
}).strict();

export const CommentsSelectSchema: z.ZodType<Prisma.CommentsSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  postId: z.boolean().optional(),
  comments: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostsArgsSchema)]).optional(),
  CommentLikes: z.union([z.boolean(),z.lazy(() => CommentLikesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LIKES
//------------------------------------------------------

export const LikesIncludeSchema: z.ZodType<Prisma.LikesInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostsArgsSchema)]).optional(),
}).strict()

export const LikesArgsSchema: z.ZodType<Prisma.LikesDefaultArgs> = z.object({
  select: z.lazy(() => LikesSelectSchema).optional(),
  include: z.lazy(() => LikesIncludeSchema).optional(),
}).strict();

export const LikesSelectSchema: z.ZodType<Prisma.LikesSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  postId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostsArgsSchema)]).optional(),
}).strict()

// FOLLOW
//------------------------------------------------------

export const FollowIncludeSchema: z.ZodType<Prisma.FollowInclude> = z.object({
  follower: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  following: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FollowArgsSchema: z.ZodType<Prisma.FollowDefaultArgs> = z.object({
  select: z.lazy(() => FollowSelectSchema).optional(),
  include: z.lazy(() => FollowIncludeSchema).optional(),
}).strict();

export const FollowSelectSchema: z.ZodType<Prisma.FollowSelect> = z.object({
  followerId: z.boolean().optional(),
  followingId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  follower: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  following: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// COMMENT LIKES
//------------------------------------------------------

export const CommentLikesIncludeSchema: z.ZodType<Prisma.CommentLikesInclude> = z.object({
  comment: z.union([z.boolean(),z.lazy(() => CommentsArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CommentLikesArgsSchema: z.ZodType<Prisma.CommentLikesDefaultArgs> = z.object({
  select: z.lazy(() => CommentLikesSelectSchema).optional(),
  include: z.lazy(() => CommentLikesIncludeSchema).optional(),
}).strict();

export const CommentLikesSelectSchema: z.ZodType<Prisma.CommentLikesSelect> = z.object({
  id: z.boolean().optional(),
  commentId: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  comment: z.union([z.boolean(),z.lazy(() => CommentsArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Posts: z.lazy(() => PostsListRelationFilterSchema).optional(),
  Comments: z.lazy(() => CommentsListRelationFilterSchema).optional(),
  Likes: z.lazy(() => LikesListRelationFilterSchema).optional(),
  Followers: z.lazy(() => FollowListRelationFilterSchema).optional(),
  Following: z.lazy(() => FollowListRelationFilterSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Posts: z.lazy(() => PostsOrderByRelationAggregateInputSchema).optional(),
  Comments: z.lazy(() => CommentsOrderByRelationAggregateInputSchema).optional(),
  Likes: z.lazy(() => LikesOrderByRelationAggregateInputSchema).optional(),
  Followers: z.lazy(() => FollowOrderByRelationAggregateInputSchema).optional(),
  Following: z.lazy(() => FollowOrderByRelationAggregateInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string(),
    username: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    username: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Posts: z.lazy(() => PostsListRelationFilterSchema).optional(),
  Comments: z.lazy(() => CommentsListRelationFilterSchema).optional(),
  Likes: z.lazy(() => LikesListRelationFilterSchema).optional(),
  Followers: z.lazy(() => FollowListRelationFilterSchema).optional(),
  Following: z.lazy(() => FollowListRelationFilterSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProfileWhereInputSchema: z.ZodType<Prisma.ProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthdate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  photoProfilePath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  photoProfilePath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const ProfileWhereUniqueInputSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthdate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  photoProfilePath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  photoProfilePath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthdate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  photoProfilePath: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PostsWhereInputSchema: z.ZodType<Prisma.PostsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostsWhereInputSchema),z.lazy(() => PostsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostsWhereInputSchema),z.lazy(() => PostsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contentUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsListRelationFilterSchema).optional(),
  Likes: z.lazy(() => LikesListRelationFilterSchema).optional()
}).strict();

export const PostsOrderByWithRelationInputSchema: z.ZodType<Prisma.PostsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  contentUrl: z.lazy(() => SortOrderSchema).optional(),
  caption: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Comments: z.lazy(() => CommentsOrderByRelationAggregateInputSchema).optional(),
  Likes: z.lazy(() => LikesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PostsWhereUniqueInputSchema: z.ZodType<Prisma.PostsWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => PostsWhereInputSchema),z.lazy(() => PostsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostsWhereInputSchema),z.lazy(() => PostsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contentUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsListRelationFilterSchema).optional(),
  Likes: z.lazy(() => LikesListRelationFilterSchema).optional()
}).strict());

export const PostsOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  contentUrl: z.lazy(() => SortOrderSchema).optional(),
  caption: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostsMinOrderByAggregateInputSchema).optional()
}).strict();

export const PostsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostsScalarWhereWithAggregatesInputSchema),z.lazy(() => PostsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostsScalarWhereWithAggregatesInputSchema),z.lazy(() => PostsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  contentUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentsWhereInputSchema: z.ZodType<Prisma.CommentsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentsWhereInputSchema),z.lazy(() => CommentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentsWhereInputSchema),z.lazy(() => CommentsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comments: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostsScalarRelationFilterSchema),z.lazy(() => PostsWhereInputSchema) ]).optional(),
  CommentLikes: z.lazy(() => CommentLikesListRelationFilterSchema).optional()
}).strict();

export const CommentsOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  post: z.lazy(() => PostsOrderByWithRelationInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CommentsWhereUniqueInputSchema: z.ZodType<Prisma.CommentsWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => CommentsWhereInputSchema),z.lazy(() => CommentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentsWhereInputSchema),z.lazy(() => CommentsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comments: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostsScalarRelationFilterSchema),z.lazy(() => PostsWhereInputSchema) ]).optional(),
  CommentLikes: z.lazy(() => CommentLikesListRelationFilterSchema).optional()
}).strict());

export const CommentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentsMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  comments: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LikesWhereInputSchema: z.ZodType<Prisma.LikesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikesWhereInputSchema),z.lazy(() => LikesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikesWhereInputSchema),z.lazy(() => LikesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostsScalarRelationFilterSchema),z.lazy(() => PostsWhereInputSchema) ]).optional(),
}).strict();

export const LikesOrderByWithRelationInputSchema: z.ZodType<Prisma.LikesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  post: z.lazy(() => PostsOrderByWithRelationInputSchema).optional()
}).strict();

export const LikesWhereUniqueInputSchema: z.ZodType<Prisma.LikesWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => LikesWhereInputSchema),z.lazy(() => LikesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikesWhereInputSchema),z.lazy(() => LikesWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostsScalarRelationFilterSchema),z.lazy(() => PostsWhereInputSchema) ]).optional(),
}).strict());

export const LikesOrderByWithAggregationInputSchema: z.ZodType<Prisma.LikesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LikesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LikesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LikesMinOrderByAggregateInputSchema).optional()
}).strict();

export const LikesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LikesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LikesScalarWhereWithAggregatesInputSchema),z.lazy(() => LikesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikesScalarWhereWithAggregatesInputSchema),z.lazy(() => LikesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FollowWhereInputSchema: z.ZodType<Prisma.FollowWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  followerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followingId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  follower: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  following: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const FollowOrderByWithRelationInputSchema: z.ZodType<Prisma.FollowOrderByWithRelationInput> = z.object({
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followingId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  follower: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  following: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const FollowWhereUniqueInputSchema: z.ZodType<Prisma.FollowWhereUniqueInput> = z.object({
  followerId_followingId: z.lazy(() => FollowFollowerIdFollowingIdCompoundUniqueInputSchema)
})
.and(z.object({
  followerId_followingId: z.lazy(() => FollowFollowerIdFollowingIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  followerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followingId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  follower: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  following: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const FollowOrderByWithAggregationInputSchema: z.ZodType<Prisma.FollowOrderByWithAggregationInput> = z.object({
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followingId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FollowCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FollowMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FollowMinOrderByAggregateInputSchema).optional()
}).strict();

export const FollowScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FollowScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FollowScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  followerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  followingId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentLikesWhereInputSchema: z.ZodType<Prisma.CommentLikesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentLikesWhereInputSchema),z.lazy(() => CommentLikesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentLikesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentLikesWhereInputSchema),z.lazy(() => CommentLikesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comment: z.union([ z.lazy(() => CommentsScalarRelationFilterSchema),z.lazy(() => CommentsWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CommentLikesOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentLikesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => CommentsOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentLikesWhereUniqueInputSchema: z.ZodType<Prisma.CommentLikesWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    commentId_userId: z.lazy(() => CommentLikesCommentIdUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    commentId_userId: z.lazy(() => CommentLikesCommentIdUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  commentId_userId: z.lazy(() => CommentLikesCommentIdUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CommentLikesWhereInputSchema),z.lazy(() => CommentLikesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentLikesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentLikesWhereInputSchema),z.lazy(() => CommentLikesWhereInputSchema).array() ]).optional(),
  commentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comment: z.union([ z.lazy(() => CommentsScalarRelationFilterSchema),z.lazy(() => CommentsWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const CommentLikesOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentLikesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentLikesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentLikesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentLikesMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentLikesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentLikesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentLikesScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentLikesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentLikesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentLikesScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentLikesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  commentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileCreateInputSchema: z.ZodType<Prisma.ProfileCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  birthdate: z.coerce.date(),
  photoProfilePath: z.string().optional().nullable()
}).strict();

export const ProfileUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  birthdate: z.coerce.date(),
  photoProfilePath: z.string().optional().nullable()
}).strict();

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  photoProfilePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  photoProfilePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  birthdate: z.coerce.date(),
  photoProfilePath: z.string().optional().nullable()
}).strict();

export const ProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  photoProfilePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  photoProfilePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PostsCreateInputSchema: z.ZodType<Prisma.PostsCreateInput> = z.object({
  id: z.string().uuid().optional(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutPostInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsUncheckedCreateInputSchema: z.ZodType<Prisma.PostsUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsUpdateInputSchema: z.ZodType<Prisma.PostsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutPostNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostsUncheckedUpdateInputSchema: z.ZodType<Prisma.PostsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostsCreateManyInputSchema: z.ZodType<Prisma.PostsCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostsUpdateManyMutationInputSchema: z.ZodType<Prisma.PostsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsCreateInputSchema: z.ZodType<Prisma.CommentsCreateInput> = z.object({
  id: z.string().uuid().optional(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  post: z.lazy(() => PostsCreateNestedOneWithoutCommentsInputSchema),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentsUncheckedCreateInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  postId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentsUpdateInputSchema: z.ZodType<Prisma.CommentsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  post: z.lazy(() => PostsUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentsUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentsCreateManyInputSchema: z.ZodType<Prisma.CommentsCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  postId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentsUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikesCreateInputSchema: z.ZodType<Prisma.LikesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema),
  post: z.lazy(() => PostsCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikesUncheckedCreateInputSchema: z.ZodType<Prisma.LikesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  postId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikesUpdateInputSchema: z.ZodType<Prisma.LikesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema).optional(),
  post: z.lazy(() => PostsUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikesUncheckedUpdateInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikesCreateManyInputSchema: z.ZodType<Prisma.LikesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  postId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikesUpdateManyMutationInputSchema: z.ZodType<Prisma.LikesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowCreateInputSchema: z.ZodType<Prisma.FollowCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  follower: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema),
  following: z.lazy(() => UserCreateNestedOneWithoutFollowersInputSchema)
}).strict();

export const FollowUncheckedCreateInputSchema: z.ZodType<Prisma.FollowUncheckedCreateInput> = z.object({
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowUpdateInputSchema: z.ZodType<Prisma.FollowUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  follower: z.lazy(() => UserUpdateOneRequiredWithoutFollowingNestedInputSchema).optional(),
  following: z.lazy(() => UserUpdateOneRequiredWithoutFollowersNestedInputSchema).optional()
}).strict();

export const FollowUncheckedUpdateInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateInput> = z.object({
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowCreateManyInputSchema: z.ZodType<Prisma.FollowCreateManyInput> = z.object({
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowUpdateManyMutationInputSchema: z.ZodType<Prisma.FollowUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyInput> = z.object({
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentLikesCreateInputSchema: z.ZodType<Prisma.CommentLikesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  comment: z.lazy(() => CommentsCreateNestedOneWithoutCommentLikesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentLikesInputSchema)
}).strict();

export const CommentLikesUncheckedCreateInputSchema: z.ZodType<Prisma.CommentLikesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  commentId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentLikesUpdateInputSchema: z.ZodType<Prisma.CommentLikesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentsUpdateOneRequiredWithoutCommentLikesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentLikesNestedInputSchema).optional()
}).strict();

export const CommentLikesUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentLikesCreateManyInputSchema: z.ZodType<Prisma.CommentLikesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  commentId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentLikesUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentLikesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentLikesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PostsListRelationFilterSchema: z.ZodType<Prisma.PostsListRelationFilter> = z.object({
  every: z.lazy(() => PostsWhereInputSchema).optional(),
  some: z.lazy(() => PostsWhereInputSchema).optional(),
  none: z.lazy(() => PostsWhereInputSchema).optional()
}).strict();

export const CommentsListRelationFilterSchema: z.ZodType<Prisma.CommentsListRelationFilter> = z.object({
  every: z.lazy(() => CommentsWhereInputSchema).optional(),
  some: z.lazy(() => CommentsWhereInputSchema).optional(),
  none: z.lazy(() => CommentsWhereInputSchema).optional()
}).strict();

export const LikesListRelationFilterSchema: z.ZodType<Prisma.LikesListRelationFilter> = z.object({
  every: z.lazy(() => LikesWhereInputSchema).optional(),
  some: z.lazy(() => LikesWhereInputSchema).optional(),
  none: z.lazy(() => LikesWhereInputSchema).optional()
}).strict();

export const FollowListRelationFilterSchema: z.ZodType<Prisma.FollowListRelationFilter> = z.object({
  every: z.lazy(() => FollowWhereInputSchema).optional(),
  some: z.lazy(() => FollowWhereInputSchema).optional(),
  none: z.lazy(() => FollowWhereInputSchema).optional()
}).strict();

export const CommentLikesListRelationFilterSchema: z.ZodType<Prisma.CommentLikesListRelationFilter> = z.object({
  every: z.lazy(() => CommentLikesWhereInputSchema).optional(),
  some: z.lazy(() => CommentLikesWhereInputSchema).optional(),
  none: z.lazy(() => CommentLikesWhereInputSchema).optional()
}).strict();

export const PostsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LikesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FollowOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentLikesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentLikesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  photoProfilePath: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  photoProfilePath: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  photoProfilePath: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PostsCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  contentUrl: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  contentUrl: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostsMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  contentUrl: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostsScalarRelationFilterSchema: z.ZodType<Prisma.PostsScalarRelationFilter> = z.object({
  is: z.lazy(() => PostsWhereInputSchema).optional(),
  isNot: z.lazy(() => PostsWhereInputSchema).optional()
}).strict();

export const CommentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikesCountOrderByAggregateInputSchema: z.ZodType<Prisma.LikesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LikesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikesMinOrderByAggregateInputSchema: z.ZodType<Prisma.LikesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowFollowerIdFollowingIdCompoundUniqueInputSchema: z.ZodType<Prisma.FollowFollowerIdFollowingIdCompoundUniqueInput> = z.object({
  followerId: z.string(),
  followingId: z.string()
}).strict();

export const FollowCountOrderByAggregateInputSchema: z.ZodType<Prisma.FollowCountOrderByAggregateInput> = z.object({
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followingId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FollowMaxOrderByAggregateInput> = z.object({
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followingId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowMinOrderByAggregateInputSchema: z.ZodType<Prisma.FollowMinOrderByAggregateInput> = z.object({
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followingId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentsScalarRelationFilterSchema: z.ZodType<Prisma.CommentsScalarRelationFilter> = z.object({
  is: z.lazy(() => CommentsWhereInputSchema).optional(),
  isNot: z.lazy(() => CommentsWhereInputSchema).optional()
}).strict();

export const CommentLikesCommentIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.CommentLikesCommentIdUserIdCompoundUniqueInput> = z.object({
  commentId: z.string(),
  userId: z.string()
}).strict();

export const CommentLikesCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentLikesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentLikesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentLikesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentLikesMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentLikesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PostsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutUserInputSchema),z.lazy(() => PostsCreateWithoutUserInputSchema).array(),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutUserInputSchema),z.lazy(() => CommentsCreateWithoutUserInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikesCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutUserInputSchema),z.lazy(() => LikesCreateWithoutUserInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowCreateNestedManyWithoutFollowingInputSchema: z.ZodType<Prisma.FollowCreateNestedManyWithoutFollowingInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowingInputSchema),z.lazy(() => FollowCreateWithoutFollowingInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowCreateNestedManyWithoutFollowerInputSchema: z.ZodType<Prisma.FollowCreateNestedManyWithoutFollowerInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentLikesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutUserInputSchema),z.lazy(() => CommentLikesCreateWithoutUserInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PostsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutUserInputSchema),z.lazy(() => PostsCreateWithoutUserInputSchema).array(),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutUserInputSchema),z.lazy(() => CommentsCreateWithoutUserInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikesUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutUserInputSchema),z.lazy(() => LikesCreateWithoutUserInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedCreateNestedManyWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowingInputSchema),z.lazy(() => FollowCreateWithoutFollowingInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedCreateNestedManyWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentLikesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutUserInputSchema),z.lazy(() => CommentLikesCreateWithoutUserInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PostsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PostsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutUserInputSchema),z.lazy(() => PostsCreateWithoutUserInputSchema).array(),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PostsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PostsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PostsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostsScalarWhereInputSchema),z.lazy(() => PostsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutUserInputSchema),z.lazy(() => CommentsCreateWithoutUserInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikesUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutUserInputSchema),z.lazy(() => LikesCreateWithoutUserInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LikesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikesScalarWhereInputSchema),z.lazy(() => LikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUpdateManyWithoutFollowingNestedInputSchema: z.ZodType<Prisma.FollowUpdateManyWithoutFollowingNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowingInputSchema),z.lazy(() => FollowCreateWithoutFollowingInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowingInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowingInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFollowingInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFollowingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUpdateManyWithoutFollowerNestedInputSchema: z.ZodType<Prisma.FollowUpdateManyWithoutFollowerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentLikesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentLikesUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutUserInputSchema),z.lazy(() => CommentLikesCreateWithoutUserInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentLikesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentLikesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentLikesScalarWhereInputSchema),z.lazy(() => CommentLikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PostsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutUserInputSchema),z.lazy(() => PostsCreateWithoutUserInputSchema).array(),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => PostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PostsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostsWhereUniqueInputSchema),z.lazy(() => PostsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PostsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PostsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostsScalarWhereInputSchema),z.lazy(() => PostsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutUserInputSchema),z.lazy(() => CommentsCreateWithoutUserInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutUserInputSchema),z.lazy(() => LikesCreateWithoutUserInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LikesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikesScalarWhereInputSchema),z.lazy(() => LikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFollowingNestedInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowingInputSchema),z.lazy(() => FollowCreateWithoutFollowingInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowingInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowingInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFollowingInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFollowingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentLikesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutUserInputSchema),z.lazy(() => CommentLikesCreateWithoutUserInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentLikesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentLikesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentLikesScalarWhereInputSchema),z.lazy(() => CommentLikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentsCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentsCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutPostInputSchema),z.lazy(() => CommentsCreateWithoutPostInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikesCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.LikesCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutPostInputSchema),z.lazy(() => LikesCreateWithoutPostInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentsUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutPostInputSchema),z.lazy(() => CommentsCreateWithoutPostInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikesUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.LikesUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutPostInputSchema),z.lazy(() => LikesCreateWithoutPostInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const CommentsUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentsUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutPostInputSchema),z.lazy(() => CommentsCreateWithoutPostInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentsUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentsUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentsUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentsUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentsUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentsUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikesUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.LikesUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutPostInputSchema),z.lazy(() => LikesCreateWithoutPostInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikesUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikesUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikesUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikesUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikesUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => LikesUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikesScalarWhereInputSchema),z.lazy(() => LikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentsUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutPostInputSchema),z.lazy(() => CommentsCreateWithoutPostInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentsUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentsUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentsUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentsUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentsUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentsUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikesUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikesCreateWithoutPostInputSchema),z.lazy(() => LikesCreateWithoutPostInputSchema).array(),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikesCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikesUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikesUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikesCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikesWhereUniqueInputSchema),z.lazy(() => LikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikesUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikesUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikesUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => LikesUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikesScalarWhereInputSchema),z.lazy(() => LikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostsCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostsCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutCommentsInputSchema),z.lazy(() => PostsUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostsCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostsWhereUniqueInputSchema).optional()
}).strict();

export const CommentLikesCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesCreateNestedManyWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyCommentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentLikesUncheckedCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUncheckedCreateNestedManyWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyCommentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const PostsUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostsUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutCommentsInputSchema),z.lazy(() => PostsUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostsCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PostsUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostsUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => PostsUpdateWithoutCommentsInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const CommentLikesUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.CommentLikesUpdateManyWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyCommentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentLikesUpdateManyWithWhereWithoutCommentInputSchema),z.lazy(() => CommentLikesUpdateManyWithWhereWithoutCommentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentLikesScalarWhereInputSchema),z.lazy(() => CommentLikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentLikesUncheckedUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateManyWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentLikesCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentLikesUpsertWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentLikesCreateManyCommentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentLikesWhereUniqueInputSchema),z.lazy(() => CommentLikesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentLikesUpdateWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentLikesUpdateManyWithWhereWithoutCommentInputSchema),z.lazy(() => CommentLikesUpdateManyWithWhereWithoutCommentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentLikesScalarWhereInputSchema),z.lazy(() => CommentLikesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostsCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.PostsCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutLikesInputSchema),z.lazy(() => PostsUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostsCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => PostsWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const PostsUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.PostsUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostsCreateWithoutLikesInputSchema),z.lazy(() => PostsUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostsCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => PostsUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => PostsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostsUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => PostsUpdateWithoutLikesInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutFollowersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutFollowingNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowingInputSchema),z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFollowersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowersInputSchema),z.lazy(() => UserUpdateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowersInputSchema) ]).optional(),
}).strict();

export const CommentsCreateNestedOneWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsCreateNestedOneWithoutCommentLikesInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutCommentLikesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutCommentLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentsCreateOrConnectWithoutCommentLikesInputSchema).optional(),
  connect: z.lazy(() => CommentsWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentLikesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentsUpdateOneRequiredWithoutCommentLikesNestedInputSchema: z.ZodType<Prisma.CommentsUpdateOneRequiredWithoutCommentLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutCommentLikesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutCommentLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentsCreateOrConnectWithoutCommentLikesInputSchema).optional(),
  upsert: z.lazy(() => CommentsUpsertWithoutCommentLikesInputSchema).optional(),
  connect: z.lazy(() => CommentsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommentsUpdateToOneWithWhereWithoutCommentLikesInputSchema),z.lazy(() => CommentsUpdateWithoutCommentLikesInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutCommentLikesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCommentLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentLikesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentLikesInputSchema),z.lazy(() => UserUpdateWithoutCommentLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentLikesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PostsCreateWithoutUserInputSchema: z.ZodType<Prisma.PostsCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutPostInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PostsUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PostsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PostsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostsCreateWithoutUserInputSchema),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PostsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PostsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostsCreateManyUserInputSchema),z.lazy(() => PostsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentsCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentsCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostsCreateNestedOneWithoutCommentsInputSchema),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  postId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentsCreateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommentsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentsCreateManyUserInputSchema),z.lazy(() => CommentsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LikesCreateWithoutUserInputSchema: z.ZodType<Prisma.LikesCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostsCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LikesUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  postId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LikesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LikesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikesCreateWithoutUserInputSchema),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LikesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LikesCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikesCreateManyUserInputSchema),z.lazy(() => LikesCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FollowCreateWithoutFollowingInputSchema: z.ZodType<Prisma.FollowCreateWithoutFollowingInput> = z.object({
  createdAt: z.coerce.date().optional(),
  follower: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema)
}).strict();

export const FollowUncheckedCreateWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUncheckedCreateWithoutFollowingInput> = z.object({
  followerId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowCreateOrConnectWithoutFollowingInputSchema: z.ZodType<Prisma.FollowCreateOrConnectWithoutFollowingInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema) ]),
}).strict();

export const FollowCreateManyFollowingInputEnvelopeSchema: z.ZodType<Prisma.FollowCreateManyFollowingInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowCreateManyFollowingInputSchema),z.lazy(() => FollowCreateManyFollowingInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FollowCreateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowCreateWithoutFollowerInput> = z.object({
  createdAt: z.coerce.date().optional(),
  following: z.lazy(() => UserCreateNestedOneWithoutFollowersInputSchema)
}).strict();

export const FollowUncheckedCreateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedCreateWithoutFollowerInput> = z.object({
  followingId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowCreateOrConnectWithoutFollowerInputSchema: z.ZodType<Prisma.FollowCreateOrConnectWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema) ]),
}).strict();

export const FollowCreateManyFollowerInputEnvelopeSchema: z.ZodType<Prisma.FollowCreateManyFollowerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowCreateManyFollowerInputSchema),z.lazy(() => FollowCreateManyFollowerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentLikesCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  comment: z.lazy(() => CommentsCreateNestedOneWithoutCommentLikesInputSchema)
}).strict();

export const CommentLikesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  commentId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentLikesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CommentLikesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentLikesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommentLikesCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentLikesCreateManyUserInputSchema),z.lazy(() => CommentLikesCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PostsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PostsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostsUpdateWithoutUserInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PostsCreateWithoutUserInputSchema),z.lazy(() => PostsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PostsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PostsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PostsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostsUpdateWithoutUserInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PostsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PostsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PostsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostsUpdateManyMutationInputSchema),z.lazy(() => PostsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PostsScalarWhereInputSchema: z.ZodType<Prisma.PostsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostsScalarWhereInputSchema),z.lazy(() => PostsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostsScalarWhereInputSchema),z.lazy(() => PostsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contentUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentsUpdateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CommentsCreateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentsUpdateWithoutUserInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CommentsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommentsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CommentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentsUpdateManyMutationInputSchema),z.lazy(() => CommentsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CommentsScalarWhereInputSchema: z.ZodType<Prisma.CommentsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comments: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LikesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikesUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LikesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikesUpdateWithoutUserInputSchema),z.lazy(() => LikesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LikesCreateWithoutUserInputSchema),z.lazy(() => LikesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LikesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikesUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LikesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikesUpdateWithoutUserInputSchema),z.lazy(() => LikesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LikesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LikesUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LikesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikesUpdateManyMutationInputSchema),z.lazy(() => LikesUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const LikesScalarWhereInputSchema: z.ZodType<Prisma.LikesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikesScalarWhereInputSchema),z.lazy(() => LikesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikesScalarWhereInputSchema),z.lazy(() => LikesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FollowUpsertWithWhereUniqueWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUpsertWithWhereUniqueWithoutFollowingInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowUpdateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFollowingInputSchema) ]),
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowingInputSchema) ]),
}).strict();

export const FollowUpdateWithWhereUniqueWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUpdateWithWhereUniqueWithoutFollowingInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateWithoutFollowingInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFollowingInputSchema) ]),
}).strict();

export const FollowUpdateManyWithWhereWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUpdateManyWithWhereWithoutFollowingInput> = z.object({
  where: z.lazy(() => FollowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateManyMutationInputSchema),z.lazy(() => FollowUncheckedUpdateManyWithoutFollowingInputSchema) ]),
}).strict();

export const FollowScalarWhereInputSchema: z.ZodType<Prisma.FollowScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
  followerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followingId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FollowUpsertWithWhereUniqueWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpsertWithWhereUniqueWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowUpdateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFollowerInputSchema) ]),
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema) ]),
}).strict();

export const FollowUpdateWithWhereUniqueWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpdateWithWhereUniqueWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFollowerInputSchema) ]),
}).strict();

export const FollowUpdateManyWithWhereWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpdateManyWithWhereWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateManyMutationInputSchema),z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerInputSchema) ]),
}).strict();

export const CommentLikesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentLikesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentLikesUpdateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentLikesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentLikesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentLikesUpdateWithoutUserInputSchema),z.lazy(() => CommentLikesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CommentLikesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CommentLikesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentLikesUpdateManyMutationInputSchema),z.lazy(() => CommentLikesUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CommentLikesScalarWhereInputSchema: z.ZodType<Prisma.CommentLikesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentLikesScalarWhereInputSchema),z.lazy(() => CommentLikesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentLikesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentLikesScalarWhereInputSchema),z.lazy(() => CommentLikesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const CommentsCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentsCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentsUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentsCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentsCreateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentsCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.CommentsCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentsCreateManyPostInputSchema),z.lazy(() => CommentsCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LikesCreateWithoutPostInputSchema: z.ZodType<Prisma.LikesCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikesUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.LikesUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikesCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.LikesCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => LikesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikesCreateWithoutPostInputSchema),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LikesCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.LikesCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikesCreateManyPostInputSchema),z.lazy(() => LikesCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CommentsUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentsUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentsUpdateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => CommentsCreateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentsUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentsUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentsUpdateWithoutPostInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const CommentsUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.CommentsUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => CommentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentsUpdateManyMutationInputSchema),z.lazy(() => CommentsUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const LikesUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.LikesUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => LikesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikesUpdateWithoutPostInputSchema),z.lazy(() => LikesUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => LikesCreateWithoutPostInputSchema),z.lazy(() => LikesUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LikesUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.LikesUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => LikesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikesUpdateWithoutPostInputSchema),z.lazy(() => LikesUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const LikesUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.LikesUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => LikesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikesUpdateManyMutationInputSchema),z.lazy(() => LikesUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const PostsCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostsCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostsUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostsCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostsCreateWithoutCommentsInputSchema),z.lazy(() => PostsUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const CommentLikesCreateWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesCreateWithoutCommentInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentLikesInputSchema)
}).strict();

export const CommentLikesUncheckedCreateWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUncheckedCreateWithoutCommentInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentLikesCreateOrConnectWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesCreateOrConnectWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentLikesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const CommentLikesCreateManyCommentInputEnvelopeSchema: z.ZodType<Prisma.CommentLikesCreateManyCommentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentLikesCreateManyCommentInputSchema),z.lazy(() => CommentLikesCreateManyCommentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostsUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostsUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => PostsUpdateWithoutCommentsInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PostsCreateWithoutCommentsInputSchema),z.lazy(() => PostsUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => PostsWhereInputSchema).optional()
}).strict();

export const PostsUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PostsUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostsUpdateWithoutCommentsInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const PostsUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostsUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostsUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostsUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const CommentLikesUpsertWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUpsertWithWhereUniqueWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentLikesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentLikesUpdateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedUpdateWithoutCommentInputSchema) ]),
  create: z.union([ z.lazy(() => CommentLikesCreateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const CommentLikesUpdateWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUpdateWithWhereUniqueWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentLikesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentLikesUpdateWithoutCommentInputSchema),z.lazy(() => CommentLikesUncheckedUpdateWithoutCommentInputSchema) ]),
}).strict();

export const CommentLikesUpdateManyWithWhereWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUpdateManyWithWhereWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentLikesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentLikesUpdateManyMutationInputSchema),z.lazy(() => CommentLikesUncheckedUpdateManyWithoutCommentInputSchema) ]),
}).strict();

export const UserCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const PostsCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostsCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostsUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostsCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.PostsCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => PostsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostsCreateWithoutLikesInputSchema),z.lazy(() => PostsUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const UserUpsertWithoutLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const UserUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostsUpsertWithoutLikesInputSchema: z.ZodType<Prisma.PostsUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => PostsUpdateWithoutLikesInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => PostsCreateWithoutLikesInputSchema),z.lazy(() => PostsUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => PostsWhereInputSchema).optional()
}).strict();

export const PostsUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.PostsUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => PostsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostsUpdateWithoutLikesInputSchema),z.lazy(() => PostsUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const PostsUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostsUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostsUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostsUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowingInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowCreateNestedManyWithoutFollowingInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowingInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowingInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
}).strict();

export const UserCreateWithoutFollowersInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowersInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutUserInputSchema).optional(),
  Following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFollowersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowersInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFollowersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]),
}).strict();

export const UserUpsertWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowingInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
}).strict();

export const UserUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowingInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUpdateManyWithoutFollowingNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowingInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowingNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutFollowersInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFollowersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowersInputSchema) ]),
}).strict();

export const UserUpdateWithoutFollowersInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutUserNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFollowersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CommentsCreateWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsCreateWithoutCommentLikesInput> = z.object({
  id: z.string().uuid().optional(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  post: z.lazy(() => PostsCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentsUncheckedCreateWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateWithoutCommentLikesInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  postId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentsCreateOrConnectWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutCommentLikesInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentsCreateWithoutCommentLikesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutCommentLikesInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentLikesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentLikesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Posts: z.lazy(() => PostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowingInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentLikesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentLikesInputSchema) ]),
}).strict();

export const CommentsUpsertWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsUpsertWithoutCommentLikesInput> = z.object({
  update: z.union([ z.lazy(() => CommentsUpdateWithoutCommentLikesInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutCommentLikesInputSchema) ]),
  create: z.union([ z.lazy(() => CommentsCreateWithoutCommentLikesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutCommentLikesInputSchema) ]),
  where: z.lazy(() => CommentsWhereInputSchema).optional()
}).strict();

export const CommentsUpdateToOneWithWhereWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsUpdateToOneWithWhereWithoutCommentLikesInput> = z.object({
  where: z.lazy(() => CommentsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommentsUpdateWithoutCommentLikesInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutCommentLikesInputSchema) ]),
}).strict();

export const CommentsUpdateWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsUpdateWithoutCommentLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  post: z.lazy(() => PostsUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentsUncheckedUpdateWithoutCommentLikesInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateWithoutCommentLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentLikesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentLikesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentLikesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentLikesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentLikesInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Posts: z.lazy(() => PostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowingNestedInputSchema).optional(),
  Following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional()
}).strict();

export const PostsCreateManyUserInputSchema: z.ZodType<Prisma.PostsCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  contentUrl: z.string(),
  caption: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentsCreateManyUserInputSchema: z.ZodType<Prisma.CommentsCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  postId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikesCreateManyUserInputSchema: z.ZodType<Prisma.LikesCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  postId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FollowCreateManyFollowingInputSchema: z.ZodType<Prisma.FollowCreateManyFollowingInput> = z.object({
  followerId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowCreateManyFollowerInputSchema: z.ZodType<Prisma.FollowCreateManyFollowerInput> = z.object({
  followingId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentLikesCreateManyUserInputSchema: z.ZodType<Prisma.CommentLikesCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  commentId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PostsUpdateWithoutUserInputSchema: z.ZodType<Prisma.PostsUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsUpdateManyWithoutPostNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PostsUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  Likes: z.lazy(() => LikesUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PostsUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentsUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostsUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikesUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikesUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostsUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUpdateWithoutFollowingInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  follower: z.lazy(() => UserUpdateOneRequiredWithoutFollowingNestedInputSchema).optional()
}).strict();

export const FollowUncheckedUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateWithoutFollowingInput> = z.object({
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFollowingInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFollowingInput> = z.object({
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUpdateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpdateWithoutFollowerInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  following: z.lazy(() => UserUpdateOneRequiredWithoutFollowersNestedInputSchema).optional()
}).strict();

export const FollowUncheckedUpdateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateWithoutFollowerInput> = z.object({
  followingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFollowerInput> = z.object({
  followingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentLikesUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentsUpdateOneRequiredWithoutCommentLikesNestedInputSchema).optional()
}).strict();

export const CommentLikesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentLikesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsCreateManyPostInputSchema: z.ZodType<Prisma.CommentsCreateManyPostInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  comments: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikesCreateManyPostInputSchema: z.ZodType<Prisma.LikesCreateManyPostInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentsUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentsUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  CommentLikes: z.lazy(() => CommentLikesUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentsUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  CommentLikes: z.lazy(() => CommentLikesUncheckedUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentsUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikesUpdateWithoutPostInputSchema: z.ZodType<Prisma.LikesUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikesUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikesUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.LikesUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentLikesCreateManyCommentInputSchema: z.ZodType<Prisma.CommentLikesCreateManyCommentInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentLikesUpdateWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentLikesNestedInputSchema).optional()
}).strict();

export const CommentLikesUncheckedUpdateWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentLikesUncheckedUpdateManyWithoutCommentInputSchema: z.ZodType<Prisma.CommentLikesUncheckedUpdateManyWithoutCommentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindFirstArgsSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindFirstOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindManyArgsSchema: z.ZodType<Prisma.ProfileFindManyArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileAggregateArgsSchema: z.ZodType<Prisma.ProfileAggregateArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileGroupByArgsSchema: z.ZodType<Prisma.ProfileGroupByArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithAggregationInputSchema.array(),ProfileOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileScalarFieldEnumSchema.array(),
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileFindUniqueArgsSchema: z.ZodType<Prisma.ProfileFindUniqueArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindUniqueOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const PostsFindFirstArgsSchema: z.ZodType<Prisma.PostsFindFirstArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  where: PostsWhereInputSchema.optional(),
  orderBy: z.union([ PostsOrderByWithRelationInputSchema.array(),PostsOrderByWithRelationInputSchema ]).optional(),
  cursor: PostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostsScalarFieldEnumSchema,PostsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostsFindFirstOrThrowArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  where: PostsWhereInputSchema.optional(),
  orderBy: z.union([ PostsOrderByWithRelationInputSchema.array(),PostsOrderByWithRelationInputSchema ]).optional(),
  cursor: PostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostsScalarFieldEnumSchema,PostsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostsFindManyArgsSchema: z.ZodType<Prisma.PostsFindManyArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  where: PostsWhereInputSchema.optional(),
  orderBy: z.union([ PostsOrderByWithRelationInputSchema.array(),PostsOrderByWithRelationInputSchema ]).optional(),
  cursor: PostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostsScalarFieldEnumSchema,PostsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostsAggregateArgsSchema: z.ZodType<Prisma.PostsAggregateArgs> = z.object({
  where: PostsWhereInputSchema.optional(),
  orderBy: z.union([ PostsOrderByWithRelationInputSchema.array(),PostsOrderByWithRelationInputSchema ]).optional(),
  cursor: PostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostsGroupByArgsSchema: z.ZodType<Prisma.PostsGroupByArgs> = z.object({
  where: PostsWhereInputSchema.optional(),
  orderBy: z.union([ PostsOrderByWithAggregationInputSchema.array(),PostsOrderByWithAggregationInputSchema ]).optional(),
  by: PostsScalarFieldEnumSchema.array(),
  having: PostsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostsFindUniqueArgsSchema: z.ZodType<Prisma.PostsFindUniqueArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  where: PostsWhereUniqueInputSchema,
}).strict() ;

export const PostsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostsFindUniqueOrThrowArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  where: PostsWhereUniqueInputSchema,
}).strict() ;

export const CommentsFindFirstArgsSchema: z.ZodType<Prisma.CommentsFindFirstArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentsScalarFieldEnumSchema,CommentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentsFindFirstOrThrowArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentsScalarFieldEnumSchema,CommentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentsFindManyArgsSchema: z.ZodType<Prisma.CommentsFindManyArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentsScalarFieldEnumSchema,CommentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentsAggregateArgsSchema: z.ZodType<Prisma.CommentsAggregateArgs> = z.object({
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentsGroupByArgsSchema: z.ZodType<Prisma.CommentsGroupByArgs> = z.object({
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithAggregationInputSchema.array(),CommentsOrderByWithAggregationInputSchema ]).optional(),
  by: CommentsScalarFieldEnumSchema.array(),
  having: CommentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentsFindUniqueArgsSchema: z.ZodType<Prisma.CommentsFindUniqueArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
}).strict() ;

export const CommentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentsFindUniqueOrThrowArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
}).strict() ;

export const LikesFindFirstArgsSchema: z.ZodType<Prisma.LikesFindFirstArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  where: LikesWhereInputSchema.optional(),
  orderBy: z.union([ LikesOrderByWithRelationInputSchema.array(),LikesOrderByWithRelationInputSchema ]).optional(),
  cursor: LikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikesScalarFieldEnumSchema,LikesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LikesFindFirstOrThrowArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  where: LikesWhereInputSchema.optional(),
  orderBy: z.union([ LikesOrderByWithRelationInputSchema.array(),LikesOrderByWithRelationInputSchema ]).optional(),
  cursor: LikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikesScalarFieldEnumSchema,LikesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikesFindManyArgsSchema: z.ZodType<Prisma.LikesFindManyArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  where: LikesWhereInputSchema.optional(),
  orderBy: z.union([ LikesOrderByWithRelationInputSchema.array(),LikesOrderByWithRelationInputSchema ]).optional(),
  cursor: LikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikesScalarFieldEnumSchema,LikesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikesAggregateArgsSchema: z.ZodType<Prisma.LikesAggregateArgs> = z.object({
  where: LikesWhereInputSchema.optional(),
  orderBy: z.union([ LikesOrderByWithRelationInputSchema.array(),LikesOrderByWithRelationInputSchema ]).optional(),
  cursor: LikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikesGroupByArgsSchema: z.ZodType<Prisma.LikesGroupByArgs> = z.object({
  where: LikesWhereInputSchema.optional(),
  orderBy: z.union([ LikesOrderByWithAggregationInputSchema.array(),LikesOrderByWithAggregationInputSchema ]).optional(),
  by: LikesScalarFieldEnumSchema.array(),
  having: LikesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikesFindUniqueArgsSchema: z.ZodType<Prisma.LikesFindUniqueArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  where: LikesWhereUniqueInputSchema,
}).strict() ;

export const LikesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LikesFindUniqueOrThrowArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  where: LikesWhereUniqueInputSchema,
}).strict() ;

export const FollowFindFirstArgsSchema: z.ZodType<Prisma.FollowFindFirstArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowScalarFieldEnumSchema,FollowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FollowFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FollowFindFirstOrThrowArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowScalarFieldEnumSchema,FollowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FollowFindManyArgsSchema: z.ZodType<Prisma.FollowFindManyArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowScalarFieldEnumSchema,FollowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FollowAggregateArgsSchema: z.ZodType<Prisma.FollowAggregateArgs> = z.object({
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FollowGroupByArgsSchema: z.ZodType<Prisma.FollowGroupByArgs> = z.object({
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithAggregationInputSchema.array(),FollowOrderByWithAggregationInputSchema ]).optional(),
  by: FollowScalarFieldEnumSchema.array(),
  having: FollowScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FollowFindUniqueArgsSchema: z.ZodType<Prisma.FollowFindUniqueArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const FollowFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FollowFindUniqueOrThrowArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const CommentLikesFindFirstArgsSchema: z.ZodType<Prisma.CommentLikesFindFirstArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  where: CommentLikesWhereInputSchema.optional(),
  orderBy: z.union([ CommentLikesOrderByWithRelationInputSchema.array(),CommentLikesOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentLikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentLikesScalarFieldEnumSchema,CommentLikesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentLikesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentLikesFindFirstOrThrowArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  where: CommentLikesWhereInputSchema.optional(),
  orderBy: z.union([ CommentLikesOrderByWithRelationInputSchema.array(),CommentLikesOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentLikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentLikesScalarFieldEnumSchema,CommentLikesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentLikesFindManyArgsSchema: z.ZodType<Prisma.CommentLikesFindManyArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  where: CommentLikesWhereInputSchema.optional(),
  orderBy: z.union([ CommentLikesOrderByWithRelationInputSchema.array(),CommentLikesOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentLikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentLikesScalarFieldEnumSchema,CommentLikesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentLikesAggregateArgsSchema: z.ZodType<Prisma.CommentLikesAggregateArgs> = z.object({
  where: CommentLikesWhereInputSchema.optional(),
  orderBy: z.union([ CommentLikesOrderByWithRelationInputSchema.array(),CommentLikesOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentLikesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentLikesGroupByArgsSchema: z.ZodType<Prisma.CommentLikesGroupByArgs> = z.object({
  where: CommentLikesWhereInputSchema.optional(),
  orderBy: z.union([ CommentLikesOrderByWithAggregationInputSchema.array(),CommentLikesOrderByWithAggregationInputSchema ]).optional(),
  by: CommentLikesScalarFieldEnumSchema.array(),
  having: CommentLikesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentLikesFindUniqueArgsSchema: z.ZodType<Prisma.CommentLikesFindUniqueArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  where: CommentLikesWhereUniqueInputSchema,
}).strict() ;

export const CommentLikesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentLikesFindUniqueOrThrowArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  where: CommentLikesWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileCreateArgsSchema: z.ZodType<Prisma.ProfileCreateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  data: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfileUpsertArgsSchema: z.ZodType<Prisma.ProfileUpsertArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
  create: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
  update: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfileCreateManyArgsSchema: z.ZodType<Prisma.ProfileCreateManyArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileDeleteArgsSchema: z.ZodType<Prisma.ProfileDeleteArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateArgsSchema: z.ZodType<Prisma.ProfileUpdateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  data: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateManyArgsSchema: z.ZodType<Prisma.ProfileUpdateManyArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema,ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema,ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileDeleteManyArgsSchema: z.ZodType<Prisma.ProfileDeleteManyArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PostsCreateArgsSchema: z.ZodType<Prisma.PostsCreateArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  data: z.union([ PostsCreateInputSchema,PostsUncheckedCreateInputSchema ]),
}).strict() ;

export const PostsUpsertArgsSchema: z.ZodType<Prisma.PostsUpsertArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  where: PostsWhereUniqueInputSchema,
  create: z.union([ PostsCreateInputSchema,PostsUncheckedCreateInputSchema ]),
  update: z.union([ PostsUpdateInputSchema,PostsUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostsCreateManyArgsSchema: z.ZodType<Prisma.PostsCreateManyArgs> = z.object({
  data: z.union([ PostsCreateManyInputSchema,PostsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostsCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostsCreateManyInputSchema,PostsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostsDeleteArgsSchema: z.ZodType<Prisma.PostsDeleteArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  where: PostsWhereUniqueInputSchema,
}).strict() ;

export const PostsUpdateArgsSchema: z.ZodType<Prisma.PostsUpdateArgs> = z.object({
  select: PostsSelectSchema.optional(),
  include: PostsIncludeSchema.optional(),
  data: z.union([ PostsUpdateInputSchema,PostsUncheckedUpdateInputSchema ]),
  where: PostsWhereUniqueInputSchema,
}).strict() ;

export const PostsUpdateManyArgsSchema: z.ZodType<Prisma.PostsUpdateManyArgs> = z.object({
  data: z.union([ PostsUpdateManyMutationInputSchema,PostsUncheckedUpdateManyInputSchema ]),
  where: PostsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PostsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PostsUpdateManyMutationInputSchema,PostsUncheckedUpdateManyInputSchema ]),
  where: PostsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PostsDeleteManyArgsSchema: z.ZodType<Prisma.PostsDeleteManyArgs> = z.object({
  where: PostsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentsCreateArgsSchema: z.ZodType<Prisma.CommentsCreateArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  data: z.union([ CommentsCreateInputSchema,CommentsUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentsUpsertArgsSchema: z.ZodType<Prisma.CommentsUpsertArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
  create: z.union([ CommentsCreateInputSchema,CommentsUncheckedCreateInputSchema ]),
  update: z.union([ CommentsUpdateInputSchema,CommentsUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentsCreateManyArgsSchema: z.ZodType<Prisma.CommentsCreateManyArgs> = z.object({
  data: z.union([ CommentsCreateManyInputSchema,CommentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentsCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentsCreateManyInputSchema,CommentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentsDeleteArgsSchema: z.ZodType<Prisma.CommentsDeleteArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
}).strict() ;

export const CommentsUpdateArgsSchema: z.ZodType<Prisma.CommentsUpdateArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  data: z.union([ CommentsUpdateInputSchema,CommentsUncheckedUpdateInputSchema ]),
  where: CommentsWhereUniqueInputSchema,
}).strict() ;

export const CommentsUpdateManyArgsSchema: z.ZodType<Prisma.CommentsUpdateManyArgs> = z.object({
  data: z.union([ CommentsUpdateManyMutationInputSchema,CommentsUncheckedUpdateManyInputSchema ]),
  where: CommentsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CommentsUpdateManyMutationInputSchema,CommentsUncheckedUpdateManyInputSchema ]),
  where: CommentsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentsDeleteManyArgsSchema: z.ZodType<Prisma.CommentsDeleteManyArgs> = z.object({
  where: CommentsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LikesCreateArgsSchema: z.ZodType<Prisma.LikesCreateArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  data: z.union([ LikesCreateInputSchema,LikesUncheckedCreateInputSchema ]),
}).strict() ;

export const LikesUpsertArgsSchema: z.ZodType<Prisma.LikesUpsertArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  where: LikesWhereUniqueInputSchema,
  create: z.union([ LikesCreateInputSchema,LikesUncheckedCreateInputSchema ]),
  update: z.union([ LikesUpdateInputSchema,LikesUncheckedUpdateInputSchema ]),
}).strict() ;

export const LikesCreateManyArgsSchema: z.ZodType<Prisma.LikesCreateManyArgs> = z.object({
  data: z.union([ LikesCreateManyInputSchema,LikesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LikesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LikesCreateManyAndReturnArgs> = z.object({
  data: z.union([ LikesCreateManyInputSchema,LikesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LikesDeleteArgsSchema: z.ZodType<Prisma.LikesDeleteArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  where: LikesWhereUniqueInputSchema,
}).strict() ;

export const LikesUpdateArgsSchema: z.ZodType<Prisma.LikesUpdateArgs> = z.object({
  select: LikesSelectSchema.optional(),
  include: LikesIncludeSchema.optional(),
  data: z.union([ LikesUpdateInputSchema,LikesUncheckedUpdateInputSchema ]),
  where: LikesWhereUniqueInputSchema,
}).strict() ;

export const LikesUpdateManyArgsSchema: z.ZodType<Prisma.LikesUpdateManyArgs> = z.object({
  data: z.union([ LikesUpdateManyMutationInputSchema,LikesUncheckedUpdateManyInputSchema ]),
  where: LikesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LikesUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LikesUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LikesUpdateManyMutationInputSchema,LikesUncheckedUpdateManyInputSchema ]),
  where: LikesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LikesDeleteManyArgsSchema: z.ZodType<Prisma.LikesDeleteManyArgs> = z.object({
  where: LikesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FollowCreateArgsSchema: z.ZodType<Prisma.FollowCreateArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  data: z.union([ FollowCreateInputSchema,FollowUncheckedCreateInputSchema ]),
}).strict() ;

export const FollowUpsertArgsSchema: z.ZodType<Prisma.FollowUpsertArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
  create: z.union([ FollowCreateInputSchema,FollowUncheckedCreateInputSchema ]),
  update: z.union([ FollowUpdateInputSchema,FollowUncheckedUpdateInputSchema ]),
}).strict() ;

export const FollowCreateManyArgsSchema: z.ZodType<Prisma.FollowCreateManyArgs> = z.object({
  data: z.union([ FollowCreateManyInputSchema,FollowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FollowCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FollowCreateManyAndReturnArgs> = z.object({
  data: z.union([ FollowCreateManyInputSchema,FollowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FollowDeleteArgsSchema: z.ZodType<Prisma.FollowDeleteArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const FollowUpdateArgsSchema: z.ZodType<Prisma.FollowUpdateArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  data: z.union([ FollowUpdateInputSchema,FollowUncheckedUpdateInputSchema ]),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const FollowUpdateManyArgsSchema: z.ZodType<Prisma.FollowUpdateManyArgs> = z.object({
  data: z.union([ FollowUpdateManyMutationInputSchema,FollowUncheckedUpdateManyInputSchema ]),
  where: FollowWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FollowUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FollowUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FollowUpdateManyMutationInputSchema,FollowUncheckedUpdateManyInputSchema ]),
  where: FollowWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FollowDeleteManyArgsSchema: z.ZodType<Prisma.FollowDeleteManyArgs> = z.object({
  where: FollowWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentLikesCreateArgsSchema: z.ZodType<Prisma.CommentLikesCreateArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  data: z.union([ CommentLikesCreateInputSchema,CommentLikesUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentLikesUpsertArgsSchema: z.ZodType<Prisma.CommentLikesUpsertArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  where: CommentLikesWhereUniqueInputSchema,
  create: z.union([ CommentLikesCreateInputSchema,CommentLikesUncheckedCreateInputSchema ]),
  update: z.union([ CommentLikesUpdateInputSchema,CommentLikesUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentLikesCreateManyArgsSchema: z.ZodType<Prisma.CommentLikesCreateManyArgs> = z.object({
  data: z.union([ CommentLikesCreateManyInputSchema,CommentLikesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentLikesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentLikesCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentLikesCreateManyInputSchema,CommentLikesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentLikesDeleteArgsSchema: z.ZodType<Prisma.CommentLikesDeleteArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  where: CommentLikesWhereUniqueInputSchema,
}).strict() ;

export const CommentLikesUpdateArgsSchema: z.ZodType<Prisma.CommentLikesUpdateArgs> = z.object({
  select: CommentLikesSelectSchema.optional(),
  include: CommentLikesIncludeSchema.optional(),
  data: z.union([ CommentLikesUpdateInputSchema,CommentLikesUncheckedUpdateInputSchema ]),
  where: CommentLikesWhereUniqueInputSchema,
}).strict() ;

export const CommentLikesUpdateManyArgsSchema: z.ZodType<Prisma.CommentLikesUpdateManyArgs> = z.object({
  data: z.union([ CommentLikesUpdateManyMutationInputSchema,CommentLikesUncheckedUpdateManyInputSchema ]),
  where: CommentLikesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentLikesUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentLikesUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CommentLikesUpdateManyMutationInputSchema,CommentLikesUncheckedUpdateManyInputSchema ]),
  where: CommentLikesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentLikesDeleteManyArgsSchema: z.ZodType<Prisma.CommentLikesDeleteManyArgs> = z.object({
  where: CommentLikesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;