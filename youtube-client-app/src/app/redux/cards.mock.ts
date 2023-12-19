import { FavoriteComponent } from '../favorite/favorite.component';
import { SearchCards } from '../youtube/models/search-item.model';
import {
  AppState,
  YotubeResultsInterface,
  YoutubeResultsState,
} from './state.models';
import { Favorite } from '../youtube/models/search-item.model';

export const youtubeCardsMock: YoutubeResultsState = {
  '0': [],
  '1': [
    {
      id: '1',
      date: '11.11.2023',
      description: '....',
      title: 'HHH',
      favorite: Favorite.False,
      img: null,
    },
  ],
};

export const youtubeCardsMockFavorite: YoutubeResultsState = {
  '0': [],
  '1': [
    {
      id: '1',
      date: '11.11.2023',
      description: '....',
      title: 'HHH',
      favorite: Favorite.True,
      img: null,
    },
  ],
};

export const youtubeResultsMock: YotubeResultsInterface = {
  isLoading: false,
  cards: youtubeCardsMock,
  error: null,
};

export const youtubeResultsMockFavorite: YotubeResultsInterface = {
  isLoading: false,
  cards: youtubeCardsMockFavorite,
  error: null,
};

//export const customCardsMock: SearchCards[] = [];
export const cardsMock: SearchCards[] = [
  {
    id: '1',
    date: '11.11.2023',
    description: '....',
    title: 'HHH',
    favorite: Favorite.False,
    img: null,
  },
];

export const cardsMockFavorite: SearchCards[] = [
  {
    id: '1',
    date: '11.11.2023',
    description: '....',
    title: 'HHH',
    favorite: Favorite.True,
    img: null,
  },
];

export const customCardsMock: SearchCards = {
  id: '1',
  date: '11.11.2023',
  description: '....',
  title: 'HHH',
  img: null,
};

export const allCardsMock: SearchCards[] = [
  {
    id: '1',
    date: '11.11.2023',
    description: '....',
    title: 'HHH',
    img: null,
  },
  {
    id: '1',
    date: '11.11.2023',
    description: '....',
    title: 'HHH',
    favorite: Favorite.False,
    img: null,
  },
];

export const appStateMock: AppState = {
  customCards: [customCardsMock],
  youtubeCards: youtubeResultsMock,
  cardsPage: '1',
};
