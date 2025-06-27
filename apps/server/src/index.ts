import express from 'express';
import { env } from '~/lib/env';
import { trpcMiddleware } from './middlewares/trpc-middleware';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(trpcMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
