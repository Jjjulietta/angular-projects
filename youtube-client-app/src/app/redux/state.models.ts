import { SearchCards } from '../youtube/models/search-item.model';

export interface AppState {
  customCards: SearchCards[];
  youtubeCards: YotubeResultsInterface; //YoutubeResultsState; //SearchCards[];
  cardsPage: string;
}

export interface YoutubeResultsState {
  [key: string]: SearchCards[] | [];
}

export interface YotubeResultsInterface {
  isLoading: boolean;
  cards: YoutubeResultsState;
  error: string | null;
  card?: SearchCards;
}
