import { select } from '@ngrx/store';
import {
  allCardsMock,
  cardsMock,
  cardsMockFavorite,
  customCardsMock,
  youtubeCardsMock,
  youtubeResultsMock,
  youtubeResultsMockFavorite,
} from '../cards.mock';
import {
  selectAllCards,
  selectCards,
  selectFavoriteCards,
  selectPageNumber,
  selectYotube,
  selectYoutubeCards,
} from './cards.selector';

describe('CardsReducers', () => {
  it('should select page number', () => {
    expect(selectPageNumber.projector({ cardsPage: '1' })).toEqual('1');
  });
});

describe('CardsReducers', () => {
  it('should select cards on the page', () => {
    expect(
      selectCards.projector(youtubeResultsMock, { cardsPage: '1' })
    ).toEqual(cardsMock);
  });
});

describe('CardsReducers', () => {
  it('should select youtube cards', () => {
    expect(selectYotube.projector(youtubeResultsMock)).toEqual(
      youtubeCardsMock
    );
  });
});

describe('CardsReducers', () => {
  it('should select cards on the page', () => {
    expect(
      selectAllCards.projector([customCardsMock], youtubeCardsMock, {
        cardsPage: '1',
      })
    ).toEqual(allCardsMock);
  });
});

describe('CardsReducers', () => {
  it('should select favorite cards', () => {
    expect(selectFavoriteCards.projector(youtubeResultsMockFavorite)).toEqual(
      cardsMockFavorite
    );
  });
});

/*describe('CardsReducers', () => {
  it('should select page number', () => {
    expect(selectPageNumber.projector({ cardsPage: '1' })).toEqual('1');
  });

  it('should select cards on the page', () => {
    expect(
      selectCards.projector(youtubeResultsMock, { cardsPage: '1' })
    ).toEqual(cardsMock);
  });

  it('should select youtube cards', () => {
    expect(selectYotube.projector(youtubeResultsMock)).toEqual(
      youtubeCardsMock
    );
  });

  it('should select cards on the page', () => {
    expect(
      selectAllCards.projector([customCardsMock], youtubeCardsMock, {
        cardsPage: '1',
      })
    ).toEqual(allCardsMock);
  });

  it('should select favorite cards', () => {
    expect(selectFavoriteCards.projector(youtubeResultsMockFavorite)).toEqual(
      cardsMockFavorite
    );
  });
});*/
