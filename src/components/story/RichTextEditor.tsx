import React from 'react';
import { Bold, Italic, Strikethrough, Link, Code, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = ''
}: RichTextEditorProps) {
  const toolbarButtons = [
    { icon: Bold, label: 'Bold' },
    { icon: Italic, label: 'Italic' },
    { icon: Strikethrough, label: 'Strikethrough' },
    { icon: Link, label: 'Link' },
    { icon: Code, label: 'Code' },
    { icon: List, label: 'Bullet List' },
    { icon: ListOrdered, label: 'Numbered List' }
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50">
        {toolbarButtons.map((button) => (
          <button
            key={button.label}
            className="p-1 hover:bg-gray-200 rounded"
            title={button.label}
          >
            <button.icon className="w-4 h-4 text-gray-600" />
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-4 focus:outline-none focus:ring-0 resize-none ${className}`}
        rows={5}
      />
    </div>
  );
}