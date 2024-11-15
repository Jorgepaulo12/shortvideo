import React from 'react';
import { Play } from 'lucide-react';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  layout?: 'grid' | 'horizontal';
}

export function VideoCard({ video, onClick, layout = 'grid' }: VideoCardProps) {
  if (layout === 'horizontal') {
    return (
      <div 
        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg flex bg-gray-900 hover:bg-gray-800 transition-colors"
        onClick={() => onClick(video)}
      >
        <div className="relative w-40 flex-shrink-0">
          <img 
            src={video.video_pictures[0].picture} 
            alt={`Video by ${video.user.name}`}
            className="w-full h-24 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
          </div>
        </div>
        <div className="p-3 flex-grow">
          <p className="text-white font-medium text-sm line-clamp-2">By {video.user.name}</p>
          <p className="text-gray-400 text-xs mt-1">{video.duration}s</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      onClick={() => onClick(video)}
    >
      <img 
        src={video.video_pictures[0].picture} 
        alt={`Video by ${video.user.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
        <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <p className="text-white text-sm font-medium truncate">By {video.user.name}</p>
        <p className="text-gray-300 text-xs">{video.duration}s</p>
      </div>
    </div>
  );
}