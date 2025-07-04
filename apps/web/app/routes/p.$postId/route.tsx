import { useParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '~/lib/trpc';

export default function PostPage() {
  const { postId = '' } = useParams<{ postId: string }>();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.post.getPost.queryOptions({ postId }));

  return (
    <div>
      <img src={data?.contentUrl} alt={data?.caption || ''} className="w-5xl" />
    </div>
  );
}
