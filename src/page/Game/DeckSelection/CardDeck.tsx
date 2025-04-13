import { Card as ICard } from '@/gameplay/state/Card';
import CardMultiSet from './CardMultiSet';
import SelectableCardWrapper from './SelectableCardWrapper';
import SmallCard from './SmallCard';

interface Props {
  draftPlayerDeck: CardMultiSet;
  setPreviewCard: (card: ICard) => void,
  onClickCard: (card: ICard, count: number) => void;
};
const CardDeck = ({
  draftPlayerDeck,
  setPreviewCard,
  onClickCard,
}: Props) => {
  return (
    <div>
      <h2> deck (count: {draftPlayerDeck.size()}) </h2>
      <div className="flex flex-wrap w-300 h-100">
        { draftPlayerDeck.asArray()
            .map(({ card, count }) => (
              <SelectableCardWrapper
                key={card.id}
                count={count}
                onHover={() => setPreviewCard(card)}
                onClick={() => onClickCard(card, count)}
              >
                <SmallCard {...card} />
              </SelectableCardWrapper>
            )
        ) }
      </div>
    </div>
  );
};

export default CardDeck;
