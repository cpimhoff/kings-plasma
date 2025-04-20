import { Player } from '@/gameplay/state/Player';
import { useGameplayStore } from '@/gameplay/store';
import HandCard from './HandCard';

interface Props {
  player: Player;
}
const PlayerHand = ({ player }: Props) => {
  const { hand, colorCssValue: color } = player;
  const gameState = useGameplayStore((state) => state.gameState);
  const { phase } = gameState!;

  return (
    <div>
      <div className="mb-3">{phase === 'setup' ? 'Select up to three cards to mulligan.' : null}</div>
      <div className="flex h-80 w-[70rem] items-center gap-3 overflow-x-auto bg-slate-300 p-2">
        {hand.map((card, idx) => (
          <HandCard key={`${player.id},${card.id},${idx}`} idx={idx} card={card} color={color} />
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
