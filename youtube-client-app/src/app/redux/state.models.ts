import { SearchCards } from '../youtube/models/search-item.model';

export interface AppState {
  customCards: SearchCards[];
  youtubeCards: SearchCards[];
}
