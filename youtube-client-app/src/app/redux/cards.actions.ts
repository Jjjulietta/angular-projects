import { createActionGroup, props } from '@ngrx/store';
import { SearchCards } from '../youtube/models/search-item.model';

export const CustomCardsActions = createActionGroup({
  source: 'customCards',
  events: {
    'Add card': props<{ card: SearchCards }>(),
    'Remove card': props<{ cardId: string }>(),
  },
});

export const CardsApiActions = createActionGroup({
  source: 'youtubeCards',
  events: {
    'Retrieved Cards List': props<{ cards: SearchCards[] }>(),
  },
});
