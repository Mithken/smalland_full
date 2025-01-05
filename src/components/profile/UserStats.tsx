import React from 'react';
import { Trophy, MessageSquare, BookOpen, Users } from 'lucide-react';
import type { User } from '../../types/user';
import { CurrencyDisplay } from '../currency/CurrencyDisplay';

interface UserStatsProps {
  user: User;
}

export function UserStats({ user }: UserStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Stats</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-5 h-5 mr-2" />
            <span>Stories</span>
          </div>
          <span className="font-medium">{user.storiesPosted.length}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <MessageSquare className="w-5 h-5 mr-2" />
            <span>Comments</span>
          </div>
          <span className="font-medium">{user.commentsPosted.length}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Trophy className="w-5 h-5 mr-2" />
            <span>Gold Earned</span>
          </div>
          <CurrencyDisplay amount={1000} showDecimal />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>Communities</span>
          </div>
          <span className="font-medium">5</span>
        </div>
      </div>
    </div>
  );
}