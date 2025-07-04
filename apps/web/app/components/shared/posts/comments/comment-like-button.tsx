import { Heart } from 'lucide-react';
import { Button } from '~/components/ui/button';

interface CommentLikeButtonProps {
  commentId: string;
}

export function CommentLikeButton(props: CommentLikeButtonProps) {
  // const trpc = useTRPC();
  // const query = useQuery(trpc.likes.get.queryOptions({ postId }));
  // const likeMutation = useMutation(
  //   trpc.likes.like.mutationOptions({
  //     onSuccess() {
  //       query.refetch();
  //     },
  //   }),
  // );
  // const dislikeMutation = useMutation(
  //   trpc.likes.dislike.mutationOptions({
  //     onSuccess() {
  //       query.refetch();
  //     },
  //   }),
  // );
  // async function onClick() {
  //   if (!query.data) {
  //     return await likeMutation.mutateAsync({ postId });
  //   }
  //   return await dislikeMutation.mutateAsync({ likeId: query.data.id });
  // }

  return (
    <Button variant="link">
      {/* <Heart fill={query.data ? '#ff0000' : 'none'} /> */}
      <Heart />
    </Button>
  );
}
