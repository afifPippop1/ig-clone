import { PublicUserSchema } from '@ig-clone/database';
import { PhotoProfile } from './photo-profile';
import { ChangePhotoProfileDialog } from './change-photo-profile';

interface ProfileProps {
  user: PublicUserSchema;
}

export function Profile(props: ProfileProps) {
  return (
    <div className="flex gap-8">
      <ChangePhotoProfileDialog>
        <PhotoProfile fallback={props.user.username[0]} />
      </ChangePhotoProfileDialog>
      <ProfileInfo {...props} />
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
