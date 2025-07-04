import { useMutation, useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useTRPC } from '~/lib/trpc';

interface LikeButtonProps {
  postId: string;
}

export function LikeButton({ postId }: LikeButtonProps) {
  const trpc = useTRPC();
  const query = useQuery(trpc.likes.get.queryOptions({ postId }));
  const likeMutation = useMutation(
    trpc.likes.like.mutationOptions({
      onSuccess() {
        query.refetch();
      },
    }),
  );
  const dislikeMutation = useMutation(
    trpc.likes.dislike.mutationOptions({
      onSuccess() {
        query.refetch();
      },
    }),
  );
  async function onClick() {
    if (!query.data) {
      return await likeMutation.mutateAsync({ postId });
    }
    return await dislikeMutation.mutateAsync({ likeId: query.data.id });
  }

  return (
    <Heart
      size={30}
      fill={query.data ? '#ff0000' : 'none'}
      color={query.data ? '#ff0000' : undefined}
      onClick={onClick}
      className="cursor-pointer"
    />
  );
}
