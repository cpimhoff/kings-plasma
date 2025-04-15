import { useMemo, ReactNode } from 'react';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import { useCardLibraryStore } from './store';
import SmallCard from '../SmallCard';
import SelectableCardWrapper from '../SelectableCardWrapper';

interface Props {
  canClickCard: boolean;
  onClickCard: (card: ICard) => void;
  setPreviewCard: (card: ICard) => void;
};
const CardLibrary = ({
  canClickCard,
  onClickCard,
  setPreviewCard,
}: Props) => {
  const { cardLibrary, isTrailingPlayer } = useCardLibraryStore();
  const allCardNodesById = useMemo<Record<ICard['id'], ReactNode>>(() => (
    Object.values(cardLibrary.getCardsById()).map((card) => {
      const cardNode = <SmallCard {...card} />;
      return {
        id: card.id,
        node: cardNode,
      };
    }).reduce((accum, curr) => ({
      ...accum,
      [curr.id]: curr.node,
    }), {})
  ), [isTrailingPlayer]);
  return (
    <div>
      <h2> available cards </h2>
      <div className="flex flex-wrap overflow-auto">
        { cardLibrary.asArray({ includeZeroes: true }).map(({ card, count }) => (
            <SelectableCardWrapper
              key={card.id}
              count={count}
              enabled={canClickCard}
              onClick={() => count > 0 && onClickCard(card)}
              onHover={() => setPreviewCard(card)}
            >
              { allCardNodesById[card.id] }
            </SelectableCardWrapper>
        ))}
      </div>
    </div>
  );
};

export default CardLibrary;
