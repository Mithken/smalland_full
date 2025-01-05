import React from 'react';
import { Edit2, Smile, MoreVertical } from 'lucide-react';
import { UserAvatar } from '../user/UserAvatar';
import { formatDistanceToNow } from '../../utils/date';
import type { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwnMessage: boolean;
  onEdit?: () => void;
}

export function ChatMessage({ message, isOwnMessage, onEdit }: ChatMessageProps) {
  return (
    <div className="group flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
      <UserAvatar user={null} size="sm" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">Username</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(message.timestamp))}
          </span>
          {message.edited && (
            <span className="text-xs text-gray-500">(edited)</span>
          )}
        </div>
        
        <p className="text-gray-800 break-words">{message.content}</p>
        
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <button
                key={emoji}
                className="inline-flex items-center px-2 py-0.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                {emoji} {users.length}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
          <Smile className="w-4 h-4" />
        </button>
        {isOwnMessage && (
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}