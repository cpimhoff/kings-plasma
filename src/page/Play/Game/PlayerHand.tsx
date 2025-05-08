import { useGameplayStore } from './GameplayStore';
import HandCard from './HandCard';
import { ControllerPlayerContext } from './ControllerPlayerContext';

const PlayerHand = () => {
  const { controllerPlayer: currentPlayer } = useContext(ControllerPlayerContext)!;
  const { hand, colorCssValue: color } = currentPlayer;
  const gameState = useGameplayStore((state) => state.gameState);
  const { phase } = gameState!;

  return (
    <div>
      <div className="mb-3">{phase === 'setup' ? 'Select up to three cards to mulligan.' : null}</div>
      <div className="flex h-80 w-[70rem] items-center gap-3 overflow-x-auto bg-slate-300 p-2">
        {hand.map((card, idx) => (
          <HandCard key={`${currentPlayer.id},${card.def.typeId},${idx}`} idx={idx} card={card.def} color={color} />
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
