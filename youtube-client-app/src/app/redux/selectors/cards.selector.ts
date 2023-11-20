import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchCards } from 'src/app/youtube/models/search-item.model';
import { AppState, YotubeResultsInterface } from '../state.models';

export const selectYoutubeCards =
  createFeatureSelector<YotubeResultsInterface>('youtubeCards');
export const selectCustomcards =
  createFeatureSelector<Pick<AppState, 'customCards'>>('customCards');
export const selectCustomLength = createSelector(
  selectCustomcards,
  (s) => s.customCards.length
);

export const selectPage =
  createFeatureSelector<Pick<AppState, 'cardsPage'>>('cardsPage');

export const selectPageNumber = createSelector(
  selectPage,
  (s1) => s1.cardsPage
);

export const isLoadingSelector = createSelector(
  selectYoutubeCards,
  (state) => state.isLoading
);

export const selectLoadingPages = createSelector(selectYoutubeCards, (state) =>
  Object.keys(state.cards)
);

export const errorSelector = createSelector(
  selectYoutubeCards,
  (state) => state.error
);

export const selectCards = createSelector(
  selectYoutubeCards,
  selectPage,
  (s1, s2) => s1.cards[s2.cardsPage]
);

export const selectAllCards = createSelector(
  selectCustomcards,
  selectYoutubeCards,
  selectPage,
  (s1, s2, s3) => s1.customCards.concat(s2.cards[s3.cardsPage]) /*{
    if (s3.cardsPage === '1') {
      return s1.customCards.concat(s2.cards[s3.cardsPage]);
    } else {
      return s2.cards[s3.cardsPage];
    }
  }*/
);

/*{
    if (s3.cardsPage === '1') {
      return s1.customCards.concat(s2.cards[s3.cardsPage]);
    } else {
      return s2.cards[s3.cardsPage];
    }
  }*/

export const selectFavoriteCards = createSelector(selectYoutubeCards, (s1) => {
  return (
    Object.values(s1.cards)
      //.map((item) => ({ ...item }))
      .map((item) => item.filter((item) => item.favorite === 'true'))
      .flat()
  );
});
