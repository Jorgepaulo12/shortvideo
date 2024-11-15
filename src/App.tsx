import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VideoCard } from './components/VideoCard';
import { VideoModal } from './components/VideoModal';
import { SearchBar } from './components/SearchBar';
import { VideoSkeleton } from './components/VideoSkeleton';
import { AdCard } from './components/AdCard';
import { Video } from './types';
import { Loader2 } from 'lucide-react';

const PEXELS_API_KEY = 'HrWAV8UERIGwXyk0vJvzYs9NP7Wy8LyeJububJS7jcPaxqkY5OFYSrpI';
const ITEMS_PER_PAGE = 15;

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchVideos = async (query: string = '', pageNum: number = 1, append: boolean = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);
    setError('');
    
    try {
      const endpoint = query
        ? `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${ITEMS_PER_PAGE}&page=${pageNum}`
        : `https://api.pexels.com/videos/popular?per_page=${ITEMS_PER_PAGE}&page=${pageNum}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });

      const newVideos = response.data.videos;
      setHasMore(newVideos.length === ITEMS_PER_PAGE);
      
      if (append) {
        setVideos(prev => [...prev, ...newVideos]);
      } else {
        setVideos(newVideos);
      }
    } catch (err) {
      setError('Failed to fetch videos. Please try again later.');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchVideos(searchQuery);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideos(searchQuery, nextPage, true);
  };

  const renderContent = () => {
    return videos.map((video, index) => {
      // Insert ad card after every 5 videos
      const isAdPosition = (index + 1) % 5 === 0;
      return (
        <React.Fragment key={video.id}>
          <VideoCard
            video={video}
            onClick={setSelectedVideo}
          />
          {isAdPosition && <AdCard />}
        </React.Fragment>
      );
    });
  };

  const suggestedSearches = ['football', 'sports', 'nature', 'technology', 'music'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            SmallVideo
          </h1>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
          <div className="flex gap-2 justify-center mt-4 flex-wrap">
            {suggestedSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  setPage(1);
                  fetchVideos(term);
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderContent()}
            </div>
            
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingMore ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </main>

      <footer className="bg-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">SmallVideo</h2>
            <p className="text-gray-600 mb-4">
              Your go-to platform for discovering and downloading amazing videos
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">About</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Privacy</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            <p>Powered by Pexels API • © 2024 SmallVideo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;