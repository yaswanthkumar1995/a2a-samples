import { Router } from 'express';
import type { ChatRequestBody } from './types.js';
import { openaiProvider } from './providers/openai.js';

export function createChatRouter() {
	const router = Router();

	router.post('/', async (req, res) => {
		try {
			const body = req.body as ChatRequestBody;
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
		} catch (err: any) {
			res.status(500).json({ error: err?.message || 'Unknown error' });
		}
	});

	return router;
}