import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state.models';

export const selectYoutubeCards =
  createFeatureSelector<Pick<AppState, 'youtubeCards'>>('youtubeCards');
export const selectCustomcards =
  createFeatureSelector<Pick<AppState, 'customCards'>>('customCards');
export const selectCustomLength = createSelector(
  selectCustomcards,
  (s) => s.customCards.length
);
export const selectCards = createSelector(
  selectCustomcards,
  selectYoutubeCards,
  (s1, s2) => {
    return s1.customCards.concat(s2.youtubeCards);
  }
);

export const selectFavoriteCards = createSelector(selectYoutubeCards, (s1) => {
  return s1.youtubeCards.filter((item) => item.favorite === 'true');
});
