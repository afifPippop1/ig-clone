import { Comments, User } from '@ig-clone/database';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '~/lib/trpc';
import { CommentLikeButton } from './comment-like-button';

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const trpc = useTRPC();
  const query = useQuery(trpc.comments.comments.queryOptions({ postId }));
  return (
    <div>
      {query.data?.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          createdAt={new Date(comment.createdAt)}
          updatedAt={new Date(comment.updatedAt)}
        />
      ))}
    </div>
  );
}

interface CommentItemProps extends Comments {
  user: Pick<User, 'username' | 'id'>;
}

function CommentItem(props: CommentItemProps) {
  return (
    <div className="flex justify-between w-full">
      <p>
        <strong>{props.user.username}</strong> {props.comments}
      </p>
      <CommentLikeButton commentId={props.id} />
    </div>
  );
}
