import { SearchCards } from 'src/app/youtube/models/search-item.model';
import { CustomCardsActions } from '../actions/cards.actions';
import { customCardsMock } from '../cards.mock';
import { customCardsReducer, initialState } from './custom-cards.reducer';

describe('CardsReducers', () => {
  let initialStateMock: { customCards: SearchCards[] };

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it('should change state when add custom card', () => {
    const result = customCardsReducer(
      initialStateMock,
      CustomCardsActions.addCard({
        card: customCardsMock,
      })
    );
    expect(result).toEqual({
      ...initialStateMock,
      customCards: [...initialStateMock.customCards, customCardsMock],
    });
  });
});

describe('CardsReducers', () => {
  let initialStateMock: { customCards: SearchCards[] };

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it('should change state when remove custom card', () => {
    const result = customCardsReducer(
      initialStateMock,
      CustomCardsActions.removeCard({
        cardId: '1',
      })
    );
    expect(result).toEqual({
      ...initialStateMock,
      customCards: [...initialStateMock.customCards],
    });
  });
});
