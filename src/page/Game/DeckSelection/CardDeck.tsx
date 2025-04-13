import { Player } from '@/gameplay/state/Player';
import SmallCard from './SmallCard';

type Props = Pick<Player, 'deck'>;
const CardDeck = ({ deck }: Props) => {
  return (
    <div>
      <h2> deck: </h2>
      <div className="flex flex-wrap w-300 h-100">
        { deck.map(card => (
          <div key={card.id} className="w-40">
            <SmallCard {...card} />
          </div>
        )) }
      </div>
    </div>
  );
};

export default CardDeck;
