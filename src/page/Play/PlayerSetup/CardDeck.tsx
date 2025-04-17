import { usePlayerSetupStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import SelectableCardWrapper from './SelectableCardWrapper';
import SmallCard from '@/components/Card/SmallCard';
import { stringifyHSLColor } from './color';
import { MAX_CARDS_IN_DECK } from './constants';

const CardDeck = () => {
  const {
    draftPlayer,
    removeCardFromDraftPlayerDeck,
  } = usePlayerSetupStore(
    useShallow((state) => ({
      draftPlayer: state.draftPlayer,
      removeCardFromDraftPlayerDeck: state.removeCardFromDraftPlayerDeck,
    })));
  const { color, deck: draftPlayerDeck } = draftPlayer;
  return (
    <div>
      <h2> deck ({draftPlayerDeck.size()}/{MAX_CARDS_IN_DECK}) </h2>
      <div className="flex flex-wrap">
        { draftPlayerDeck.asArray()
            .map(({ card, count }) => (
              <SelectableCardWrapper
                key={card.id}
                count={count}
                onClick={() => removeCardFromDraftPlayerDeck(card)}
              >
                <SmallCard card={card} color={stringifyHSLColor(color)} />
              </SelectableCardWrapper>
            )
        ) }
      </div>
    </div>
  );
};

export default CardDeck;
