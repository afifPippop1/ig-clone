import { PublicUserSchema } from '@ig-clone/database';
import { useQuery } from '@tanstack/react-query';
import { Bookmark, Grid3X3 } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useTRPC } from '~/lib/trpc';
import { ChangePhotoProfileDialog } from './change-photo-profile';
import { FollowButton } from './follow-button';
import { PhotoProfile } from './photo-profile';
import { PostsPhoto } from './posts-photo';

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
  return (
    <div className="flex gap-4">
      <FollowButton user={props.user} showFollowingStatus />
    </div>
  );
}
