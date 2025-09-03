const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
function mapMessages(messages) {
    return messages.map(m => ({ role: m.role, content: m.content }));
}
export const openaiProvider = {
    async sendChat(body) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey)
            throw new Error('OPENAI_API_KEY is not set');
        const model = body.model || DEFAULT_MODEL;
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: mapMessages(body.messages),
                temperature: 0.2,
            }),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`OpenAI error ${res.status}: ${text}`);
        }
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content ?? '';
        return { role: 'assistant', content };
    },
};
