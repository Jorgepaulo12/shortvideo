import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import type { Video } from '../types';

interface CustomVideoPlayerProps {
  video: Video;
}

export function CustomVideoPlayer({ video }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr>();

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'fullscreen',
        ],
      });
    }

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  const videoFile = video.video_files.find(file => file.quality === 'hd' || file.quality === 'sd');

  return (
    <div className="plyr__video-wrapper">
      <video
        ref={videoRef}
        className="w-full"
        crossOrigin="anonymous"
      >
        <source src={videoFile?.link} type="video/mp4" />
      </video>
    </div>
  );
}