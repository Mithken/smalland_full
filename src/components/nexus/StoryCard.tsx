import React, { useState } from 'react';
import { MessageSquare, Coins, CoinIcon, Rocket, Trophy, Share2 } from 'lucide-react';
import { CurrencyDisplay } from '../currency/CurrencyDisplay';
import { CoinTossButton } from '../currency/CoinTossButton';
import type { Story } from '../../types/story';

interface StoryCardProps {
  story: Story;
  expanded?: boolean;
  onExpand?: () => void;
}

export function StoryCard({ story, expanded = false, onExpand }: StoryCardProps) {
  const [showFullContent, setShowFullContent] = useState(expanded);

  const handleClick = () => {
    if (!expanded && onExpand) {
      onExpand();
    }
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      {story.titleImage && (
        <div className="h-48 w-full bg-gray-100">
          <img src={story.titleImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-6">
        <h2 
          className="text-xl font-semibold mb-4 cursor-pointer hover:text-indigo-600"
          onClick={handleClick}
        >
          {story.title}
        </h2>
        
        <div className={`prose max-w-none ${!showFullContent && 'line-clamp-3'}`}>
          {story.content.text}
        </div>
        
        {story.content.images?.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt="" 
            className="mt-4 rounded-lg max-h-96 w-full object-cover"
          />
        ))}
        
        {story.content.links?.map((link, index) => (
          <a 
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-indigo-600 hover:text-indigo-700"
          >
            {link}
          </a>
        ))}
        
        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <button className="flex items-center hover:text-gray-700">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>{story.commentHistory?.length || 0}</span>
            </button>
            
            <div className="flex items-center text-yellow-600">
              <Coins className="w-4 h-4 mr-1" />
              <CurrencyDisplay amount={story.goldReceived || 0} showDecimal />
            </div>
            
            <CoinTossButton objectId={story.storyId} objectType="story" />
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className={`hover:text-indigo-600 ${story.boosts && story.boosts.length > 0 ? 'text-indigo-600' : ''}`}
              title={`${story.boosts?.length || 0} boosts`}
            >
              <Rocket className="w-4 h-4" />
            </button>
            
            <button 
              className={`hover:text-yellow-600 ${story.trophiesReceived && story.trophiesReceived.length > 0 ? 'text-yellow-600' : ''}`}
              title={`${story.trophiesReceived?.length || 0} trophies`}
            >
              <Trophy className="w-4 h-4" />
            </button>
            
            <button className="hover:text-gray-700">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}