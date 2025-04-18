import { useGameplayStore } from '@/gameplay/store' ;
import { Player } from '@/gameplay/state/Player' ;

interface Props {
  player: Player;
}

const GameStatus = ({ player }: Props) => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { phase } = gameState!;
  return (
    <div>
      <p> current phase: { phase } </p>
      <p> current player: { player.name } </p>
    </div>
  );
};

export default GameStatus;
