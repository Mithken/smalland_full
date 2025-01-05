import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useAuthStore } from '../../store/authStore';
import { getChatMessages, sendChatMessage, subscribeToChatMessages } from '../../lib/api/chat';
import type { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatBoxProps {
  nexusId: string;
}

export function ChatBox({ nexusId }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadMessages = async () => {
      const chatMessages = await getChatMessages(nexusId);
      setMessages(chatMessages);
      setLoading(false);
    };

    loadMessages();

    // Subscribe to new messages
    const subscription = subscribeToChatMessages(nexusId, (message) => {
      setMessages(prev => [message, ...prev]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [nexusId]);

  const handleSend = async (content: string) => {
    if (!user) return;
    
    const message = await sendChatMessage(nexusId, content);
    if (message) {
      setMessages(prev => [message, ...prev]);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm h-96 flex items-center justify-center">
        <div className="text-gray-500">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-96">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium flex items-center">
          <MessageSquare className="w-5 h-5 text-indigo-600 mr-2" />
          Nexus Chat
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-4">
        <div ref={messagesEndRef} />
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map(message => (
              <ChatMessage
                key={message.messageId}
                message={message}
                isOwnMessage={message.authorId === user?.userId}
              />
            ))}
          </div>
        )}
      </div>

      <ChatInput 
        onSend={handleSend}
        disabled={!user}
      />
    </div>
  );
}