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
      <div className="flex w-full">
        <div className="flex flex-wrap gap-3 w-300 min-h-110">
          { draftPlayerDeck.asArray()
              .map(({ card, count }) => (
                <SelectableCardWrapper
                  key={card.id}
                  count={count}
                  onClick={() => removeCardFromDraftPlayerDeck(card)}
                  onHoverIn={() => setPreviewCard(card)}
                  onHoverOut={() => setPreviewCard(null)}
                  className="w-40 h-50"
                >
                  <SmallCard card={card} color={'var(--player-color)'} />
                </SelectableCardWrapper>
              )
          ) }
        </div>
        <div className="flex flex-col m-auto justify-center align-center">
          { previewCard && <FullCard card={previewCard} color={'var(--player-color)'} /> }
        </div>
      </div>
    </div>
  );
};

export default CardDeck;
