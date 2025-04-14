import GameStatus from './GameStatus';
import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import { useGameplayStore } from '@/gameplay/store' ;

const SetupPhase = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { players } = gameState!;
  const player = players.find((player) => !player.phase.setup.done)!;
  return (
    <div>
      <GameStatus player={player} />
      <GameBoard />
      <BoardControls player={player} />
      <PlayerHand player={player} />
    </div>
  );
};

export default SetupPhase;
