import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface MediaUploaderProps {
  type: 'image' | 'video' | 'gif';
  onUpload: (url: string) => void;
  onClose: () => void;
}

export function MediaUploader({ type, onUpload, onClose }: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const acceptedTypes = {
    image: 'image/*',
    video: 'video/*',
    gif: 'image/gif'
  };

  const handleUpload = async (file: File) => {
    // In a real app, upload to your storage service
    // For now, we'll create an object URL
    const url = URL.createObjectURL(file);
    onUpload(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Upload {type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">
            Click to upload or drag and drop
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes[type]}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      </div>
    </div>
  );
}