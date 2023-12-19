import { YotubeResultsInterface } from '../state.models';
import { cardsReducer, initialState } from '../reducers/cards.reducer';
import { CardsApiActions } from '../actions/cards.actions';
import {
  cardsMock,
  youtubeCardsMock,
  youtubeCardsMockFavorite,
  youtubeResultsMock,
} from '../cards.mock';

describe('CardsReducers', () => {
  let initialStateMock: YotubeResultsInterface;

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it('should change state when getCards', () => {
    const result = cardsReducer(
      initialStateMock,
      CardsApiActions.getCards({ search: 'search', token: '1' })
    );

    expect(result).toEqual({
      ...initialStateMock,
      isLoading: true,
    });
  });
});

describe('CardsReducers', () => {
  let initialStateMock: YotubeResultsInterface;

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it('should change state when retrievedCardsList', () => {
    const result = cardsReducer(
      initialStateMock,
      CardsApiActions.retrievedCardsList({
        cards: cardsMock,
        token: '1',
      })
    );
    expect(result).toEqual({
      ...initialStateMock,
      isLoading: false,
      cards: youtubeCardsMock,
    });
  });
});

describe('CardsReducers', () => {
  let initialStateMock: YotubeResultsInterface;

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it('should change state when add favorite card', () => {
    const result = cardsReducer(
      youtubeResultsMock,
      CardsApiActions.addFavoritCard({
        cardId: '1',
        token: '1',
      })
    );
    expect(result).toEqual({
      ...youtubeResultsMock,
      cards: youtubeCardsMockFavorite,
    });
  });
});

describe('CardsReducers', () => {
  let initialStateMock: YotubeResultsInterface;

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it('should change state when remove favorite card', () => {
    const result = cardsReducer(
      youtubeResultsMock,
      CardsApiActions.removeFavoritCard({
        cardId: '1',
        token: '1',
      })
    );
    expect(result).toEqual({
      ...youtubeResultsMock,
      cards: youtubeCardsMock,
    });
  });
});

/*describe('CardsReducers', () => {
  let initialStateMock: YotubeResultsInterface;

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it('should change state when getCards', () => {
    const result = cardsReducer(
      initialStateMock,
      CardsApiActions.getCards({ search: 'search', token: '1' })
    );

    expect(result).toEqual({
      ...initialStateMock,
      isLoading: true,
    });
  });

  it('should change state when retrievedCardsList', () => {
    const result = cardsReducer(
      initialStateMock,
      CardsApiActions.retrievedCardsList({
        cards: cardsMock,
        token: '1',
      })
    );
    expect(result).toEqual({
      ...initialStateMock,
      isLoading: false,
      cards: youtubeCardsMock,
    });
  });
  it('should change state when add favorite card', () => {
    const result = cardsReducer(
      youtubeResultsMock,
      CardsApiActions.addFavoritCard({
        cardId: '1',
        token: '1',
      })
    );
    expect(result).toEqual({
      ...youtubeResultsMock,
      cards: youtubeCardsMockFavorite,
    });
  });
  it('should change state when remove favorite card', () => {
    const result = cardsReducer(
      youtubeResultsMock,
      CardsApiActions.removeFavoritCard({
        cardId: '1',
        token: '1',
      })
    );
    expect(result).toEqual({
      ...youtubeResultsMock,
      cards: youtubeCardsMock,
    });
  });
});*/
