import { env } from '~/lib/env';

export function getBucketPath(path?: string | null) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${env.BACKEND_URL}/img?url=${encodeURIComponent(path)}`;
}
