"use client";
import { User } from 'lucide-react';

interface AvatarProps {
  imageUrl?: string;
  alt?: string;
  onClick?: () => void;
}

export default function Avatar({ imageUrl, alt = 'User avatar', onClick }: AvatarProps) {
  return (
    <button 
      onClick={onClick}
      className="focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-full"
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={alt} 
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <User size={20} className="text-gray-400" />
        </div>
      )}
    </button>
  );
}