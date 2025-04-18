import { useState } from 'react';
import { usePlayerSetupStore } from './store';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import { useShallow } from 'zustand/react/shallow';
import SelectableCardWrapper from './SelectableCardWrapper';
import SmallCard from '@/components/Card/SmallCard';
import FullCard from './FullCard';
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
  const { deck: draftPlayerDeck } = draftPlayer;

  const [previewCard, setPreviewCard] = useState<ICard | null>(null);
  return (
    <div>
      <h2> deck ({draftPlayerDeck.size()}/{MAX_CARDS_IN_DECK}) </h2>
      <div className="flex">
        <div className="flex flex-wrap gap-3 w-300">
          { draftPlayerDeck.asArray()
              .map(({ card, count }) => (
                <SelectableCardWrapper
                  key={card.id}
                  count={count}
                  onClick={() => removeCardFromDraftPlayerDeck(card)}
                  onHover={() => setPreviewCard(card)}
                  className="w-30 h-40"
                >
                  <SmallCard card={card} color={'var(--player-color)'} />
                </SelectableCardWrapper>
              )
          ) }
        </div>
        { previewCard && <FullCard card={previewCard} color={'var(--player-color)'} /> }
      </div>
    </div>
  );
};

export default CardDeck;
