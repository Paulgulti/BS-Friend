'use server';

import Groq from 'groq-sdk';
import { queryRAG } from '@/lib/rag';
import { redis } from '@/lib/redis';
import { auth } from '@clerk/nextjs/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function streamAnswer(input: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    // const prevMessages = JSON.parse(await redis.get(`chat:${userId}`) || '[]');
    const raw = await redis.get(`chat:${userId}`);

    let prevMessages = [];
    if (typeof raw === 'string') {
        try {
            prevMessages = JSON.parse(raw);
        } catch {
            prevMessages = [];
        }
    } else if (Array.isArray(raw)) {
        prevMessages = raw;
    }

    // const context = await queryRAG(input);

    // Keep only the last 6 messages (3 exchanges)
    const historyLimit = 6;
    prevMessages = prevMessages.slice(-historyLimit);

    // Get Bible context but limit length to avoid token overload
    let verses = await queryRAG(input);
    let context = verses.map(v => `${v.book} ${v.chapter}:${v.verse} - ${v.text}`).join('\n');
    if (context.length > 2000) {
        context = context.slice(0, 2000) + '...';
    }

    const systemPrompt = {
        role: 'system',
        content: `You are a helpful Bible study assistant.
Only answer questions that are related to the Bible or Christian spirituality, citing scripture where possible.
If the question is not related to the Bible, politely refuse to answer.
Then suggest one or two related follow-up questions.

Use the following verses:\n${context}`
    };

    const newMessages = [...prevMessages, { role: 'user', content: input }];

    const stream = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [systemPrompt, ...newMessages],
        temperature: 0.2,
        stream: true,
    });

    const encoder = new TextEncoder();
    let assistantMessage = '';

    const readable = new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {
                const token = chunk.choices[0]?.delta?.content || '';
                assistantMessage += token;
                controller.enqueue(encoder.encode(token));
            }
            controller.close();

            await redis.set(
                `chat:${userId}`,
                JSON.stringify([
                    ...newMessages,
                    { role: 'assistant', content: assistantMessage }
                ]),
                { ex: 60 * 60 * 24 } // Expire after 1 day
            );
        }
    });

    return readable;
}
