import { useMemo, useCallback, ReactNode } from 'react';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import { useCardLibraryStore } from './store';
import SmallCard from '../SmallCard';

type CardNodesById = Record<ICard['id'], ReactNode>;

interface Props {
  addCardToDeck: (card: ICard) => void,
  setPreviewCard: (card: ICard) => void,
};
const CardLibrary = ({
  addCardToDeck,
  setPreviewCard,
}: Props) => {
  const { cardLibrary, getCardsWithCounts, takeCard } = useCardLibraryStore();
  const cardNodesById = useMemo<CardNodesById>(() => (
    Object.keys(cardLibrary.cardsById).map((cardId) => {
      const cardData = cardLibrary.cardsById[cardId];
      const cardNode = <SmallCard {...cardData} />;
      return {
        id: cardId,
        node: cardNode,
      };
    }).reduce((accum, curr) => ({
      ...accum,
      [curr.id]: curr.node,
    }), {})
  ), []);
  const handleCardClick = useCallback((card: ICard) => {
    takeCard(card);
    addCardToDeck(card);
  }, []);
  return (
    <div>
      <h2> available cards </h2>
      <div className="flex flex-wrap overflow-auto">
        { getCardsWithCounts().map(({ card, count }) => {
          return (
            <div
              key={card.id}
              className="min-w-30 m-4 hover:bg-slate-200 hover:cursor-pointer"
              onClick={() => handleCardClick(card)}
              onMouseOver={() => setPreviewCard(card)}
            >
              { cardNodesById[card.id] }
              { `x${count}` }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardLibrary;
