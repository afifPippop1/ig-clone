import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env';

export const s3 = new S3Client({
  region: env.BUCKET_REGION,
  endpoint: env.BUCKET_URL,
  credentials: {
    accessKeyId: env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // important for MinIO
});
