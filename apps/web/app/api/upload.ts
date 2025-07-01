import { useMutation } from '@tanstack/react-query';

const baseUrl = 'http://localhost:4000';

export async function uploadPhoto(data: FormData) {
  const res = await fetch(`${baseUrl}/upload`, {
    method: 'POST',
    body: data,
  });
  return await res.json();
}

export function useUpload() {
  const mutation = useMutation({
    mutationKey: ['upload'],
    mutationFn: uploadPhoto,
  });

  async function upload(file: File) {
    const data = new FormData();
    data.append('file', file);
    return mutation.mutateAsync(data);
  }

  return { upload };
}
