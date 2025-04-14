import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import Results from './Results';
import { useGameplayStore } from '@/gameplay/store' ;

const EndPhase = () => {
  const { gameState } = useGameplayStore();
  const { players } = gameState!;
  const player = players[0];
  return (
    <div>
      <Results />
      <GameBoard />
      <BoardControls player={player} />
      <PlayerHand player={player} />
    </div>
  );
};

export default EndPhase;
