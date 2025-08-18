'use server';

import { redis } from '@/lib/redis';
import { auth } from '@clerk/nextjs/server';

export async function logChatOpened() {
    const { userId } = await auth();
    if (!userId) return;
    await redis.incr(`chat:${userId}:opens`);
}

export async function logChatClosed() {
    const { userId } = await auth();
    if (!userId) return;
    await redis.incr(`chat:${userId}:closes`);
}

