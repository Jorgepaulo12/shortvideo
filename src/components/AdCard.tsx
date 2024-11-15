import React from 'react';
import { ExternalLink } from 'lucide-react';

export function AdCard() {
  return (
    <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 h-48">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
        <p className="text-xs uppercase tracking-wider mb-2">Advertisement</p>
        <h3 className="text-xl font-bold text-center mb-2">Discover Premium Videos</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-opacity-90 transition-colors">
          Learn More
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}