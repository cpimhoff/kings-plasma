import { useMemo } from 'react';
import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import SmallCard from './SmallCard';

interface Props {
  addCardToDeck: (card: ICard) => void,
  setPreviewCard: (card: ICard) => void,
};
const CardLibrary = ({
  addCardToDeck,
  setPreviewCard,
}: Props) => {
  const allCards = useMemo(() => {
    return FF7_LIBRARY.map(card => (
      <div
        key={card.id}
        className="min-w-30 m-4 hover:bg-slate-200 hover:cursor-pointer"
        onClick={() => addCardToDeck(card)}
        onMouseOver={() => setPreviewCard(card)}
      >
        <SmallCard {...card} />
      </div>
    ));
  }, [FF7_LIBRARY]);
  return (
    <div>
      <h2> available cards </h2>
      <div className="flex flex-wrap overflow-auto">
        { allCards }
      </div>
    </div>
  );
};

export default CardLibrary;
