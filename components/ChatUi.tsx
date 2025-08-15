'use client';

import { streamAnswer } from '@/actions/streamAnswer';
import { ChatMessage } from '@/app/bot/page';
import { useEffect, useRef, useState } from 'react';

export default function ChatUI({ initialHistory }: { initialHistory: ChatMessage[] }) {
  const [messages, setMessages] = useState(initialHistory || []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const stream = await streamAnswer(input); // direct server action call
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let assistantText = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      assistantText += decoder.decode(value, { stream: true });
      setMessages([...newMessages, { role: 'assistant', content: assistantText }]);
    }

    setLoading(false);
  }

  return (

    <div>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
        >
          💬
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-xl shadow-lg border flex flex-col p-4 z-50 animate-slide-up">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Bible Bot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 max-h-[300px] rounded-lg border mt-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-sm italic">Thinking...</div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input box */}
          <form onSubmit={handleSend} className="flex mt-3 gap-2">
            <input
              className="border rounded-lg flex-1 px-3 py-2 text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>


  );
}
