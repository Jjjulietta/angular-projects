interface SearchItemThumbnailsItem {
  url: string;
  width: number;
  height: number;
}

interface SearchItemThumbnails {
  default: SearchItemThumbnailsItem;
  medium: SearchItemThumbnailsItem;
  high: SearchItemThumbnailsItem;
  standard: SearchItemThumbnailsItem;
  maxres: SearchItemThumbnailsItem;
}

interface SearchItemLocalized {
  title: string;
  description: string;
}

interface VideoItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: SearchItemThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: SearchItemLocalized;
  defaultAudioLanguage: string;
}

interface SearchItemStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface SearchItem {
  kind: string;
  etag: string;
  id: { kind: string; videoId: string };
  snippet: SearchItemSnippet;
}

export interface SearchItemVideo {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoItemSnippet;
  statistics: SearchItemStatistics;
}

interface SearchItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: SearchItemThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface SearchCards {
  id: string | null;
  title: string | null;
  img: string | null;
  link?: string | null;
  description: string | null;
  date: DateConstructor | string | null;
  statistics?: SearchItemStatistics;
}
