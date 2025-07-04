import { DialogProps } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';
import { useUpload } from '~/api/upload';
import { useUser } from '~/components/providers/auth-provider';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '~/components/ui/dialog';
import { useTRPC } from '~/lib/trpc';

interface ChangePhotoProfileDialogProps
  extends Exclude<DialogProps, 'children'> {
  isAuthorized?: boolean;
}

export function ChangePhotoProfileDialog(props: ChangePhotoProfileDialogProps) {
  function onClose() {
    props.onOpenChange?.(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const { refetch } = useUser();
  const { upload } = useUpload();
  const trpc = useTRPC();
  const mutation = useMutation(
    trpc.users.updateUser.mutationOptions({
      onSuccess: () => {
        refetch();
      },
    }),
  );

  function handleFileUploadClick() {
    inputRef.current?.click();
  }

  async function updatePhotoProfile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onClose();
      const res = await upload(file);
      const photoProfilePath: string = `http://localhost:4000/img?url=${res.url as string}`;
      await mutation.mutateAsync({ photoProfilePath });
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    toast.promise(updatePhotoProfile(e), {
      loading: 'Updating photo profile',
      success: () => 'Successfully update photo profile',
      error: () => 'Failed to update photo profile',
    });
  }

  async function removePhotoProfile() {
    onClose();
    toast.promise(mutation.mutateAsync({ photoProfilePath: '' }), {
      loading: 'Updating photo profile',
      success: () => 'Successfully update photo profile',
      error: () => 'Failed to update photo profile',
    });
  }

  if (!props.isAuthorized) {
    return props.children;
  }

  return (
    <Dialog {...props}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>Change Photo Profile</DialogHeader>
        <DialogDescription className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="ghost"
            className="text-primary"
            onClick={handleFileUploadClick}
          >
            Upload Photo
          </Button>
          <Button
            variant="ghost"
            className="text-red-500"
            onClick={removePhotoProfile}
          >
            Remove Current Photo
          </Button>
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
