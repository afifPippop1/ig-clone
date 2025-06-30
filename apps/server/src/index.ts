import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { env } from '~/lib/env';
import { trpcMiddleware } from './middlewares/trpc-middleware';
import { Bucket } from './services/bucket';

const app = express();

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const bucket = new Bucket('ig-clone');
  const url = await bucket.upload('images', file);

  res.json({ success: true, url });
});

app.use(trpcMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
