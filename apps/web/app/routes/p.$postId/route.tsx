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
    <div>
      <img
        src={data?.contentUrl}
        alt={data?.caption || ''}
        className="max-w-5xl max-h-10/12"
      />
      <LikeButton postId={postId} />
      <div>
        <CommentList postId={postId} />
        <CommentInput postId={postId} />
      </div>
    </div>
  );
}
