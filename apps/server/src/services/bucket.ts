import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '~/lib/env';
import { s3 } from '~/lib/s3';

export class Bucket {
  constructor(public bucketName: string) {}
  async upload(path: string, file: Express.Multer.File) {
    const key = `${path}/${Date.now()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer, // or fs.createReadStream()
        ContentType: file.mimetype,
      })
    );

    return `${env.BUCKET_URL}/${this.bucketName}/${key}`;
  }

  async getFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await s3.send(command);
  }
}
