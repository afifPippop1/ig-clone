import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { env } from '~/lib/env';
import { trpcMiddleware } from './middlewares/trpc-middleware';
import { Bucket } from './services/bucket';
import { Readable } from 'stream';

const app = express();

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

const bucket = new Bucket('ig-clone');

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const url = await bucket.upload('images', file);

  res.json({ success: true, url });
});

app.get('/img', async (req, res) => {
  try {
    const { url } = req.query;
    const key = url as string;
    const response = await bucket.getFile(key);
    const body = response.Body;
    // Force type if you're sure it's Readable
    const stream = body as Readable;
    res.setHeader(
      'Content-Type',
      response.ContentType || 'application/octet-stream'
    );
    stream.pipe(res);
  } catch {
    res.status(500).send('Error fetching file');
  }
});

app.use(trpcMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
