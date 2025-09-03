import express, { json } from 'express';
import cors from 'cors';
import { createChatRouter } from './llm/router.js';
const app = express();
app.use(cors());
app.use(json({ limit: '10mb' }));
app.get('/health', (_req, res) => {
    res.json({ ok: true });
});
app.use('/api/chat', createChatRouter());
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
