import { useGameplayStore } from '@/gameplay/store' ;
import { getPlayerWithId } from '@/gameplay/state/Player';
import { adaptGameState } from './adapter';

const Results = () => {
  const { gameState } = useGameplayStore();
  const { players } = gameState!;
  const { pointsByPlayerId } = adaptGameState(gameState!);
  return (
    <div>
      results
      { Object.keys(pointsByPlayerId).map(playerId => (
        <div key={playerId}>
          { getPlayerWithId(players, playerId).name } score: { pointsByPlayerId[playerId] }
        </div>
      )) }
    </div>
  );
};

export default Results;
