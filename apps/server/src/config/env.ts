import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z.number().default(4000),
  JWT_SECRET: z.string().default('JWT_SECRET_LITTLE_SECRET'),
});

export const env = envSchema.parse(process.env);
