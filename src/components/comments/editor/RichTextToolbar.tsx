import React from 'react';
import { 
  Bold, Italic, Strikethrough, Link, Code, List, 
  ListOrdered, Table, Image, Video, Image as GifIcon 
} from 'lucide-react';

interface ToolbarButton {
  icon: typeof Bold;
  label: string;
  markdown: string;
}

interface RichTextToolbarProps {
  onInsert: (markdown: string) => void;
  onMediaUpload: (type: 'image' | 'video' | 'gif') => void;
}

export function RichTextToolbar({ onInsert, onMediaUpload }: RichTextToolbarProps) {
  const textButtons: ToolbarButton[] = [
    { icon: Bold, label: 'Bold', markdown: '**text**' },
    { icon: Italic, label: 'Italic', markdown: '_text_' },
    { icon: Strikethrough, label: 'Strikethrough', markdown: '~~text~~' },
    { icon: Code, label: 'Code', markdown: '`code`' },
    { icon: List, label: 'Bullet List', markdown: '- item\n' },
    { icon: ListOrdered, label: 'Numbered List', markdown: '1. item\n' },
    { icon: Table, label: 'Table', markdown: '| Header | Header |\n|--------|--------|\n| Cell | Cell |' },
    { icon: Link, label: 'Link', markdown: '[text](url)' }
  ];

  return (
    <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50">
      {textButtons.map((button) => (
        <button
          key={button.label}
          onClick={() => onInsert(button.markdown)}
          className="p-1.5 hover:bg-gray-200 rounded"
          title={button.label}
          type="button"
        >
          <button.icon className="w-4 h-4 text-gray-600" />
        </button>
      ))}
      
      <div className="w-px h-6 bg-gray-200 mx-2" />
      
      <button
        onClick={() => onMediaUpload('image')}
        className="p-1.5 hover:bg-gray-200 rounded"
        title="Upload Image"
        type="button"
      >
        <Image className="w-4 h-4 text-gray-600" />
      </button>
      
      <button
        onClick={() => onMediaUpload('video')}
        className="p-1.5 hover:bg-gray-200 rounded"
        title="Upload Video"
        type="button"
      >
        <Video className="w-4 h-4 text-gray-600" />
      </button>
      
      <button
        onClick={() => onMediaUpload('gif')}
        className="p-1.5 hover:bg-gray-200 rounded"
        title="Insert GIF"
        type="button"
      >
        <GifIcon className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}