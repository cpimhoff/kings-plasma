import { Player } from '@/gameplay/state/Player';
import HandCard from './HandCard';

interface Props {
  player: Player,
}
const PlayerHand = ({ player }: Props) => {
  const { hand, colorCssValue: color } = player;

  return (
    <div className="flex gap-3">
      { hand.map((card, idx) => (
        <HandCard
          key={`${player.id},${card.id},${idx}`}
          idx={idx}
          card={card}
          color={color}
        />
      )) }
    </div>
  );
};

export default PlayerHand;
