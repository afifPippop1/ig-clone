import { PhotoProfile } from './photo-profile';

export function Profile() {
  return (
    <div className="flex gap-4">
      <PhotoProfile />
      <ProfileInfo />
    </div>
  );
}

function ProfileInfo() {
  return (
    <div className="flex flex-col">
      <p>pippop</p>
      <ProfileFollower />
      <p>Afif</p>
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
