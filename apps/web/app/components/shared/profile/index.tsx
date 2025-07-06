import { PublicUserSchema } from '@ig-clone/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useTRPC } from '~/lib/trpc';
import { ChangePhotoProfileDialog } from './change-photo-profile';
import { PhotoProfile } from './photo-profile';
import { PostsPhoto } from './posts-photo';
import { Bookmark, Grid3X3 } from 'lucide-react';

interface ProfileProps {
  user: PublicUserSchema;
  isCurrentUser?: boolean;
}

export function Profile(props: ProfileProps) {
  const [open, onOpenChange] = useState<boolean>(false);
  function onClick() {
    onOpenChange(true);
  }
  return (
    <div className="flex flex-col items-stretch w-full">
      <div className="flex gap-8">
        <PhotoProfile
          className="cursor-pointer"
          onClick={onClick}
          user={props.user}
        />
        <ProfileInfo {...props} />
      </div>
      <Posts />
      <ChangePhotoProfileDialog
        isAuthorized={props.isCurrentUser}
        open={open}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

function ProfileInfo(props: ProfileProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <p className="text-2xl">{props.user.username}</p>
        <ProfileAction isCurrentUser={props.isCurrentUser} user={props.user} />
      </div>
      <ProfileFollower user={props.user} />
      <p className="font-bold ">{props.user.name}</p>
    </div>
  );
}

function ProfileFollower(props: ProfileProps) {
  const trpc = useTRPC();
  const follower = useQuery(
    trpc.follow.follower.queryOptions({ followingId: props.user.id }),
  );
  const following = useQuery(
    trpc.follow.following.queryOptions({ followerId: props.user.id }),
  );
  return (
    <div className="flex gap-4">
      <p>
        <strong>0</strong> posts
      </p>
      <p>
        <strong>{follower.data}</strong> followers
      </p>
      <p>
        <strong>{following.data}</strong> following
      </p>
    </div>
  );
}

function Posts() {
  return (
    <Tabs defaultValue="posts">
      <div className="w-full flex items-center justify-center">
        <TabsList>
          <TabsTrigger value="posts" className="px-8">
            <Grid3X3 />
            Posts
          </TabsTrigger>
          <TabsTrigger value="saved" className="px-8">
            <Bookmark />
            Saved
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="posts">
        <PostsPhoto />
      </TabsContent>
      <TabsContent value="saved"></TabsContent>
    </Tabs>
  );
}

function ProfileAction({ isCurrentUser, user }: ProfileProps) {
  if (!isCurrentUser) {
    return <NotCurrentUserAction user={user} />;
  }
  return <></>;
}

function NotCurrentUserAction(props: ProfileProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const query = useQuery(
    trpc.follow.isFollow.queryOptions({ userId: props.user.id }),
  );

  const followMutation = useMutation(
    trpc.follow.follow.mutationOptions({
      onSuccess() {
        query.refetch();
        queryClient.invalidateQueries({
          queryKey: trpc.follow.follower.queryKey({
            followingId: props.user.id,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.follow.following.queryKey({
            followerId: props.user.id,
          }),
        });
      },
    }),
  );

  const unfollowMutation = useMutation(
    trpc.follow.unfollow.mutationOptions({
      onSuccess() {
        query.refetch();
        queryClient.invalidateQueries({
          queryKey: trpc.follow.follower.queryKey({
            followingId: props.user.id,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.follow.following.queryKey({
            followerId: props.user.id,
          }),
        });
      },
    }),
  );

  async function onClick() {
    if (query.data?.isFollow) {
      return await unfollowMutation.mutateAsync(query.data.isFollow);
    }
    return await followMutation.mutateAsync({ userId: props.user.id });
  }

  if (query.isLoading) {
    return <></>;
  }

  return (
    <div className="flex gap-4">
      <Button
        size="sm"
        className="cursor-pointer"
        onClick={onClick}
        variant={query.data?.isFollow ? 'secondary' : undefined}
      >
        {query.data?.isFollow ? 'Following' : 'Follow'}
      </Button>
    </div>
  );
}
