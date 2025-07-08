import { FeedOutput } from '@ig-clone/database';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { FollowButton } from '../profile/follow-button';
import { Link } from '@remix-run/react';
import { LikeButton } from './like-button';

export function PostCard({ feed }: { feed: FeedOutput }) {
  return (
    <div className="w-full flex flex-col items-stretch gap-4 border-b-2 border-b-secondary pb-16">
      <div className="flex justify-between">
        <Link to={`/${feed.user.username}`}>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={feed.user.profile.photoProfilePath || ''} />
              <AvatarFallback>{feed.user.username[0]}</AvatarFallback>
            </Avatar>
            <p className="font-bold">{feed.user.username}</p>
          </div>
        </Link>
        <FollowButton user={feed.user} />
      </div>
      <div className="outline-2 outline-secondary rounded-lg overflow-hidden">
        <img
          alt=""
          src={feed.contentUrl}
          className="h-full w-full object-contain"
        />
      </div>
      <LikeButton postId={feed.id} />
    </div>
  );
}
