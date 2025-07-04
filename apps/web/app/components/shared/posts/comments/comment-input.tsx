import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendHorizontal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useTRPC } from '~/lib/trpc';

interface CommentInputProps {
  postId: string;
}

export function CommentInput({ postId }: CommentInputProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    trpc.comments.post.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.comments.comments.queryKey(),
        });
      },
    }),
  );
  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const comments = formData.get('comments') as string;
        if (!comments) return;
        await mutation.mutateAsync({ comments, postId });
        e.currentTarget.reset();
      }}
    >
      <div className="flex gap-2">
        <Input placeholder="Post a comment" name="comments" />
        <Button type="submit">
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
}
