import express, { json } from 'express';
import cors from 'cors';
import { createChatRouter } from './llm/router.js';
const app = express();
app.use(cors());
app.use(json({ limit: '10mb' }));
app.get('/', (_req, res) => {
    res.type('text/plain').send('BoltDyad server is running. Try GET /health or POST /api/chat');
});
app.get('/health', (_req, res) => {
    res.json({ ok: true });
});
app.use('/api/chat', createChatRouter());
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
