import express, { json } from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChatRouter } from './llm/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(json({ limit: '10mb' }));

const webDist = path.resolve(__dirname, '../../web/dist');
app.use(express.static(webDist));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/chat', createChatRouter());

// Fallback: serve index.html for any non-API route
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(webDist, 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
