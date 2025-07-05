import { useParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { CommentInput } from '~/components/shared/posts/comments/comment-input';
import { CommentList } from '~/components/shared/posts/comments/comment-list';
import { LikeButton } from '~/components/shared/posts/like-button';
import { useTRPC } from '~/lib/trpc';

export default function PostPage() {
  const { postId = '' } = useParams<{ postId: string }>();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.post.getPost.queryOptions({ postId }));

  return (
    <div className="flex gap-4 w-full">
      <div className="w-5xl h-10/12 flex items-center justify-center">
        <img
          src={data?.contentUrl}
          alt={data?.caption || ''}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex-1">
        <CommentList postId={postId} />
        <div className="py-4">
          <LikeButton postId={postId} />
        </div>
        <CommentInput postId={postId} />
      </div>
    </div>
  );
}
