import { Player } from '@/gameplay/state/Player';
import { useGameplayStore } from '@/gameplay/store';
import HandCard from './HandCard';

interface Props {
  player: Player,
}
const PlayerHand = ({ player }: Props) => {
  const { hand, colorCssValue: color } = player;
  const gameState = useGameplayStore((state) => state.gameState);
  const { phase } = gameState!;

  return (
    <div>
      <div>
        { phase === 'setup' ? "Select up to three cards to mulligan." : null }
      </div>
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
    </div>
  );
};

export default PlayerHand;
