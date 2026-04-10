import { Router } from 'express';
import { openaiProvider } from './providers/openai.js';
export function createChatRouter() {
    const router = Router();
    router.post('/', async (req, res) => {
        try {
            const body = req.body;
            if (!body || !body.provider || !body.messages) {
                res.status(400).json({ error: 'Invalid body' });
                return;
            }
            switch (body.provider) {
                case 'openai': {
                    const msg = await openaiProvider.sendChat(body);
                    res.json({ message: msg });
                    return;
                }
                default:
                    res.status(400).json({ error: 'Unsupported provider' });
                    return;
            }
        }
        catch (err) {
            res.status(500).json({ error: err?.message || 'Unknown error' });
        }
    });
    return router;
}
