import { PublicUserSchema } from '@ig-clone/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, ButtonProps } from '~/components/ui/button';
import { useTRPC } from '~/lib/trpc';
import { cn } from '~/lib/utils';

export interface FollowButtonProps extends ButtonProps {
  user: Partial<PublicUserSchema> & Pick<PublicUserSchema, 'id'>;
  showFollowingStatus?: boolean;
}

export function FollowButton({
  user,
  className,
  showFollowingStatus,
  ...props
}: FollowButtonProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const query = useQuery(
    trpc.follow.isFollow.queryOptions({ userId: user.id }),
  );

  const followMutation = useMutation(
    trpc.follow.follow.mutationOptions({
      onSuccess() {
        query.refetch();
        queryClient.invalidateQueries({
          queryKey: trpc.follow.follower.queryKey({
            followingId: user.id,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.follow.following.queryKey({
            followerId: user.id,
          }),
        });
      },
    }),
  );

  const unfollowMutation = useMutation(
    trpc.follow.unfollow.mutationOptions({
      onSuccess() {
        query.refetch();
        queryClient.invalidateQueries({
          queryKey: trpc.follow.follower.queryKey({
            followingId: user.id,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.follow.following.queryKey({
            followerId: user.id,
          }),
        });
      },
    }),
  );

  async function onClick() {
    if (query.data?.isFollow) {
      return await unfollowMutation.mutateAsync(query.data.isFollow);
    }
    return await followMutation.mutateAsync({ userId: user.id });
  }

  if (query.isLoading) {
    return <></>;
  }

  if (query.data?.isFollow && !showFollowingStatus) return null;

  return (
    <Button
      size="sm"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
      variant={query.data?.isFollow ? 'secondary' : undefined}
      {...props}
    >
      {query.data?.isFollow ? 'Following' : 'Follow'}
    </Button>
  );
}
