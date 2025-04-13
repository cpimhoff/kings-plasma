import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';
import Card from '@/components/Card/Card';
import { Card as ICard } from '@/gameplay/state/Card/Card';

interface Props {
  addCardToDeck: (card: ICard) => void,
};
const CardLibrary = ({ addCardToDeck }: Props) => {
  return (
    <div>
      <h2> available cards </h2>
      <div className="flex overflow-auto">
        { FF7_LIBRARY.map(card => (
          <div key={card.id} className="min-w-30 m-4 hover:bg-slate-200 hover:cursor-pointer" onClick={() => addCardToDeck(card)}>
            <Card {...card} />
          </div>
        )) }
      </div>
    </div>
  );
};

export default CardLibrary;
