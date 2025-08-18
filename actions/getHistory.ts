'use server';

import { redis } from '@/lib/redis';
import { ChatMessage } from '@/types';
import { auth } from '@clerk/nextjs/server';

export async function getHistory(): Promise<ChatMessage[]> {
  const { userId } = await auth();
  if (!userId) return [];

  // Count an open event and fetch history in the same request
  await redis.incr(`chat:${userId}:opens`);

  const raw = await redis.get(`chat:${userId}`);
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return Array.isArray(raw) ? raw : [];
}
