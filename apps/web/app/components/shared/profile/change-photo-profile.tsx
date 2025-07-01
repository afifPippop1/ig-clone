import { useParams } from '@remix-run/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { useUpload } from '~/api/upload';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useTRPC } from '~/lib/trpc';
import { Toaster } from '~/components/ui/sonner';
import { toast } from 'sonner';

interface ChangePhotoProfileDialogProps {
  children: ReactNode;
  isAuthorized?: boolean;
}

export function ChangePhotoProfileDialog(props: ChangePhotoProfileDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  function onClose() {
    setOpen(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const { upload } = useUpload();
  const trpc = useTRPC();
  const params = useParams();
  const username = params.username || '';
  const query = useQuery(trpc.users.getUser.queryOptions({ username }));
  const mutation = useMutation(
    trpc.users.updateUser.mutationOptions({
      onSuccess: () => {
        query.refetch();
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer">
          {props.children}
        </DialogTrigger>
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
      <Toaster />
    </>
  );
}
