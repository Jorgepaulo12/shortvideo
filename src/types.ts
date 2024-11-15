export interface Video {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: null;
  tags: any[];
  url: string;
  image: string;
  avg_color: null;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
  source?: 'pexels' | 'vimeo';
  vimeoId?: string;
}

export interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

export interface VideoPicture {
  id: number;
  nr: number;
  picture: string;
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  total_results: number;
  videos: Video[];
}

export interface VimeoVideo {
  uri: string;
  name: string;
  description: string;
  duration: number;
  pictures: {
    base_link: string;
  };
  user: {
    name: string;
    link: string;
  };
}