import { Player } from '@/gameplay/state/Player';
import HandCard from './HandCard';

interface Props {
  player: Player,
}
const PlayerHand = ({ player }: Props) => {
  const { hand } = player;

  return (
    <div className="flex">
      { hand.map((card, idx) => (
        <HandCard
          key={`${player.id},${card.id},${idx}`}
          idx={idx}
          card={card}
        />
      )) }
    </div>
  );
};

export default PlayerHand;
