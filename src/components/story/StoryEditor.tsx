import React from 'react';
import { Image, Video, Link, Hash } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import type { Story } from '../../types/story';

interface StoryEditorProps {
  story: Partial<Story>;
  onChange: (story: Partial<Story>) => void;
}

export function StoryEditor({ story, onChange }: StoryEditorProps) {
  const handleHeaderImageChange = (url: string) => {
    onChange({ ...story, titleImage: url });
  };

  const handleTitleChange = (title: string) => {
    onChange({ ...story, title });
  };

  const handleContentChange = (text: string) => {
    onChange({
      ...story,
      content: { ...story.content, text }
    });
  };

  const handleTagsChange = (tags: string[]) => {
    onChange({ ...story, tags });
  };

  return (
    <div className="space-y-6">
      {/* Header Image */}
      <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors cursor-pointer">
        {story.titleImage ? (
          <div className="relative group">
            <img
              src={story.titleImage}
              alt="Header"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => handleHeaderImageChange('')}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center">
            <div className="text-center">
              <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Click to add a header image</p>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <RichTextEditor
        value={story.title || ''}
        onChange={handleTitleChange}
        placeholder="Enter your story title..."
        className="text-2xl font-bold"
      />

      {/* Body */}
      <RichTextEditor
        value={story.content?.text || ''}
        onChange={handleContentChange}
        placeholder="Write your story..."
        className="min-h-[200px]"
      />

      {/* Media Controls */}
      <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-indigo-600">
          <Image className="w-5 h-5 mr-2" />
          Add Image
        </button>
        <button className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-indigo-600">
          <Video className="w-5 h-5 mr-2" />
          Add Video
        </button>
        <button className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-indigo-600">
          <Link className="w-5 h-5 mr-2" />
          Add Link
        </button>
      </div>

      {/* Tags */}
      <div className="flex items-center space-x-2">
        <Hash className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Add tags..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              handleTagsChange([...(story.tags || []), e.currentTarget.value]);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
      {story.tags && story.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {story.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                onClick={() => handleTagsChange(story.tags?.filter((_, i) => i !== index) || [])}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}