import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import Player from '@vimeo/player';
import 'plyr/dist/plyr.css';
import type { Video } from '../types';

interface CustomVideoPlayerProps {
  video: Video;
}

export function CustomVideoPlayer({ video }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const vimeoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Plyr | Player>();

  useEffect(() => {
    if (video.source === 'vimeo' && vimeoContainerRef.current) {
      playerRef.current = new Player(vimeoContainerRef.current, {
        id: video.vimeoId,
        width: 640
      });
    } else if (videoRef.current) {
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
      if (video.source === 'vimeo') {
        (playerRef.current as Player)?.destroy();
      } else {
        (playerRef.current as Plyr)?.destroy();
      }
    };
  }, [video]);

  if (video.source === 'vimeo') {
    return (
      <div ref={vimeoContainerRef} className="w-full h-full" />
    );
  }

  const videoFile = video.video_files?.find(file => file.quality === 'hd' || file.quality === 'sd');

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