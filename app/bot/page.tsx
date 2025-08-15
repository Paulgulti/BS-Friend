import { auth } from '@clerk/nextjs/server';
import { redis } from '@/lib/redis';
import ChatUI from '@/components/ChatUi';

export type ChatMessage = {
  role: string;
  content: string;
};

export default async function ChatPage() {
  // const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL!);
  const { userId } = await auth();
  if (!userId) {
    // redirect to login
    return null;
  }

    // Get chat history from Redis
  const raw = await redis.get(`chat:${userId}`);

  let parsedHistory: ChatMessage[] = [];
  if (typeof raw === 'string') {
    try {
      parsedHistory = JSON.parse(raw);
    } catch {
      parsedHistory = [];
    }
  } else if (Array.isArray(raw)) {
    // In case something stored directly as array in the past
    parsedHistory = raw;
  }


  return <ChatUI initialHistory={parsedHistory} />;
}