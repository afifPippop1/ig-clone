import { useNavigate, useParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { Camera } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { useTRPC } from '~/lib/trpc';
import { PostPhotoDialog } from './post-photo-dialog';

const SKELETON = [1, 2, 3, 4, 5, 6];

export function PostsPhoto() {
  const trpc = useTRPC();
  const navigate = useNavigate();
  const params = useParams();
  const username = params.username || '';
  const { data, isLoading } = useQuery(
    trpc.post.getFeed.queryOptions({ username }),
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-1">
        {SKELETON.map((v) => (
          <Skeleton key={v} className="aspect-square overflow-hidden" />
        ))}
      </div>
    );
  }
  if (!data?.length) {
    return <EmptyPosts />;
  }
  return (
    <div className="grid grid-cols-4 gap-1">
      {data.map((post) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={post.id}
          className="aspect-square overflow-hidden cursor-pointer"
          onClick={() => navigate(`/p/${post.id}`)}
        >
          <img
            src={post.contentUrl}
            alt={post.caption || ''}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function EmptyPosts() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center py-16 px-11 gap-6">
      <div className="outline outline-primary rounded-full p-4">
        <Camera />
      </div>
      <h1>Share Photos</h1>
      <p>When you share photos, they will appear on your profile.</p>
      <PostPhotoDialog open={open} onOpenChange={setOpen}>
        <Button variant="link">Share your first photo</Button>
      </PostPhotoDialog>
    </div>
  );
}
