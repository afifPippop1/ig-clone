import { DialogProps } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImagePlus } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';
import { useUpload } from '~/api/upload';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '~/components/ui/dialog';
import { useTRPC } from '~/lib/trpc';

interface PostPhotoDialogProps extends DialogProps {}

export function PostPhotoDialog(props: PostPhotoDialogProps) {
  const ref = useRef<HTMLInputElement>(null);
  const trpc = useTRPC();
  const { upload } = useUpload();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.post.feed.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.getFeed.queryKey(),
        });
      },
    }),
  );

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      props.onOpenChange?.(false);
      const res = await upload(file);
      const contentUrl: string = `http://localhost:4000/img?url=${res.url as string}`;
      await mutation.mutateAsync({ contentUrl, caption: null });
    }
  }

  function handleFileUploadClick() {
    ref.current?.click();
  }
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogDescription className="flex flex-col items-center justify-center gap-4">
          <input
            type="file"
            accept="image/*"
            ref={ref}
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="p-8">
            <ImagePlus size="3rem" />
          </div>
          <p>Drag photos and videos here</p>
          <Button onClick={handleFileUploadClick}>Select from computer</Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
