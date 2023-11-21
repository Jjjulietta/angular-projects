import { createActionGroup, props } from '@ngrx/store';
import { SearchCards } from '../../youtube/models/search-item.model';

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
    'Get Cards': props<{ search: string; num?: number; token: string }>(),
    'Retrieved Cards List': props<{ cards: SearchCards[]; token: string }>(),
    'Get Cards Error': props<{ error: string }>(),
    'Open Card': props<{ cardId: string; token: string }>(),
    'Add favorit card': props<{
      cardId: string;
      token: string;
    }>(),
    'Remove favorit card': props<{ cardId: string; token: string }>(),
  },
});

export const cardsListsActions = createActionGroup({
  source: 'cardsPage',
  events: {
    'Change page': props<{ token: string }>(),
  },
});
