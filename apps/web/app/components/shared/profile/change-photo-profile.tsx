import { ChangeEvent, ReactNode, useRef } from 'react';
import { useUpload } from '~/api/upload';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';

interface ChangePhotoProfileDialogProps {
  children: ReactNode;
}

export function ChangePhotoProfileDialog(props: ChangePhotoProfileDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload } = useUpload();
  function handleFileUploadClick() {
    inputRef.current?.click();
  }
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      const res = await upload(file);
      console.log(res);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">{props.children}</DialogTrigger>
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
          <Button variant="ghost" className="text-red-500">
            Remove Current Photo
          </Button>
          <DialogClose>
            <Button variant="ghost" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
