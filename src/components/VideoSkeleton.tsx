import React from 'react';

export function VideoSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gray-300 h-48 w-full"></div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}