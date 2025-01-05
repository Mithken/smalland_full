import React, { useState } from 'react';
import { RichTextToolbar } from './RichTextToolbar';
import { MediaUploader } from './MediaUploader';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isMarkdown, setIsMarkdown] = useState(false);
  const [uploadType, setUploadType] = useState<'image' | 'video' | 'gif' | null>(null);

  const handleInsert = (markdown: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newValue = before + markdown + after;
    onChange(newValue);
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + markdown.indexOf('text');
      textarea.setSelectionRange(cursorPos, cursorPos + 4);
    }, 0);
  };

  const handleMediaUpload = (url: string) => {
    const markdown = uploadType === 'image' 
      ? `![image](${url})`
      : uploadType === 'video'
      ? `<video src="${url}" controls></video>`
      : `![gif](${url})`;
    
    onChange(value + '\n' + markdown);
    setUploadType(null);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <RichTextToolbar 
        onInsert={handleInsert}
        onMediaUpload={(type) => setUploadType(type)}
      />
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 min-h-[150px] focus:outline-none focus:ring-0 resize-y"
        style={{ fontFamily: isMarkdown ? 'monospace' : 'inherit' }}
      />

      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-t border-gray-200">
        <button
          onClick={() => setIsMarkdown(!isMarkdown)}
          className="text-sm text-gray-600 hover:text-indigo-600"
          type="button"
        >
          {isMarkdown ? 'Switch to Rich Text' : 'Switch to Markdown'}
        </button>
        
        <div className="text-xs text-gray-500">
          {value.length} characters
        </div>
      </div>

      {uploadType && (
        <MediaUploader
          type={uploadType}
          onUpload={handleMediaUpload}
          onClose={() => setUploadType(null)}
        />
      )}
    </div>
  );
}