import express from 'express';
import { env } from '~/config/env';
import { trpcMiddleware } from './middlewares/trpc-middleware';

const app = express();

app.use(trpcMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
