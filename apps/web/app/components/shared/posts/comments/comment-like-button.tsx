import { useMutation, useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useTRPC } from '~/lib/trpc';

interface CommentLikeButtonProps {
  commentId: string;
}

export function CommentLikeButton({ commentId }: CommentLikeButtonProps) {
  const trpc = useTRPC();
  const query = useQuery(trpc.commentLikes.get.queryOptions({ commentId }));
  const likeMutation = useMutation(
    trpc.commentLikes.like.mutationOptions({
      onSuccess() {
        query.refetch();
      },
    }),
  );
  const dislikeMutation = useMutation(
    trpc.commentLikes.dislike.mutationOptions({
      onSuccess() {
        query.refetch();
      },
    }),
  );
  async function onClick() {
    if (!query.data) {
      return await likeMutation.mutateAsync({ commentId });
    }
    return await dislikeMutation.mutateAsync({ id: query.data.id });
  }

  return (
    <Button variant="link" onClick={onClick}>
      <Heart
        fill={query.data ? '#ff0000' : 'none'}
        color={query.data ? '#ff0000' : undefined}
      />
    </Button>
  );
}
