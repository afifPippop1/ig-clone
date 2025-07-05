import { PublicUserSchema } from '@ig-clone/database';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { ChangePhotoProfileDialog } from './change-photo-profile';
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
        <PhotoProfile className="cursor-pointer" onClick={onClick} />
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
      <p className="font-bold">{props.user.username}</p>
      <ProfileFollower />
      <p>{props.user.name}</p>
    </div>
  );
}

function ProfileFollower() {
  return (
    <div className="flex gap-4">
      <p>
        <strong>0</strong> posts
      </p>
      <p>
        <strong>60</strong> followers
      </p>
      <p>
        <strong>343</strong> following
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
            Posts
          </TabsTrigger>
          <TabsTrigger value="saved" className="px-8">
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
