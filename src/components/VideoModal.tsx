import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import type { Video } from '../types';
import { CustomVideoPlayer } from './CustomVideoPlayer';
import { VideoCard } from './VideoCard';
import { AdCard } from './AdCard';
import axios from 'axios';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<Video>(video);
  const videoFile = currentVideo.video_files?.find(file => file.quality === 'hd' || file.quality === 'sd');

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(video.tags?.[0] || 'popular')}&per_page=10`,
          {
            headers: {
              Authorization: 'HrWAV8UERIGwXyk0vJvzYs9NP7Wy8LyeJububJS7jcPaxqkY5OFYSrpI'
            }
          }
        );

        const pexelsVideos = response.data.videos
          .filter((v: Video) => v.id !== video.id)
          .map((v: Video) => ({ ...v, source: 'pexels' as const }));

        setRelatedVideos(pexelsVideos);
      } catch (error) {
        console.error('Error fetching related videos:', error);
        setRelatedVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedVideos();
  }, [video.id, video.tags]);

  const handleVideoChange = (newVideo: Video) => {
    setCurrentVideo(newVideo);
  };

  const handleDownload = async () => {
    if (!videoFile) return;

    try {
      const response = await fetch(videoFile.link);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `video-${currentVideo.id}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  const renderVideoList = () => {
    return relatedVideos.map((relatedVideo, index) => {
      const isAdPosition = (index + 1) % 5 === 0;
      return (
        <React.Fragment key={relatedVideo.id}>
          <VideoCard
            video={relatedVideo}
            onClick={handleVideoChange}
            layout="horizontal"
          />
          {isAdPosition && <AdCard />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <CustomVideoPlayer video={currentVideo} key={currentVideo.id} />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-white text-xl font-bold mb-2">
                      Video by {currentVideo.user.name}
                    </h1>
                    <p className="text-gray-400">
                      Duration: {currentVideo.duration}s
                    </p>
                  </div>
                  {videoFile && (
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <Download size={20} />
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-white text-xl font-bold mb-4">Related Videos</h2>
            <div className="space-y-4">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-800 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                renderVideoList()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}