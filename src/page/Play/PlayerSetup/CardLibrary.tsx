import { useMemo, ReactNode } from 'react';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import { usePlayerSetupStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import FullCard from './FullCard';
import SelectableCardWrapper from './SelectableCardWrapper';
import { MAX_CARDS_IN_DECK } from './constants';

const CardLibrary = () => {
  const {
    cardLibrary,
    draftPlayer,
    addCardToDraftPlayerDeck,
  } = usePlayerSetupStore(useShallow((state) => ({
    cardLibrary: state.cardLibrary,
    draftPlayer: state.draftPlayer,
    addCardToDraftPlayerDeck: state.addCardToDraftPlayerDeck,
  })));
  const { deck: draftPlayerDeck } = draftPlayer;
  const allCardNodesById = useMemo<Record<ICard['id'], ReactNode>>(() => (
    Object.values(cardLibrary.getCardsById()).map((card) => {
      const cardNode = <FullCard card={card} color={'var(--player-color)'} />;
      return {
        id: card.id,
        node: cardNode,
      };
    }).reduce((accum, curr) => ({
      ...accum,
      [curr.id]: curr.node,
    }), {})
  ), [cardLibrary]);
  return (
    <div className="overflow-y-auto">
      <h2> available cards </h2>
      <div className="flex flex-wrap gap-3">
        { cardLibrary.asArray({ includeZeroes: true }).map(({ card, count }) => (
            <SelectableCardWrapper
              key={card.id}
              count={count}
              maxCount={card.isLegendary ? 1 : 3}
              enabled={draftPlayerDeck.size() < MAX_CARDS_IN_DECK}
              onClick={() => count > 0 && addCardToDraftPlayerDeck(card)}
            >
              { allCardNodesById[card.id] }
            </SelectableCardWrapper>
        ))}
      </div>
    </div>
  );
};

export default CardLibrary;
