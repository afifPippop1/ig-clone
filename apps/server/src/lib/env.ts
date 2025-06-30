import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z.number().default(4000),
  JWT_SECRET: z.string().default('JWT_SECRET_LITTLE_SECRET'),
  BUCKET_URL: z.string().default('http://localhost:9000'),
  BUCKET_ACCESS_KEY_ID: z.string().default('minioadmin'),
  BUCKET_SECRET_ACCESS_KEY: z.string().default('minioadmin'),
  BUCKET_REGION: z.string().default('us-east-1'),
});

export const env = envSchema.parse(process.env);
