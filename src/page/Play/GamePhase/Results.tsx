import { useGameplayStore } from '@/gameplay/store';
import { getPlayerWithId, Player } from '@/gameplay/state/Player';
import { getPlayerScores } from './scoring';

const Results = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { players } = gameState!;
  const { scoreByPlayer } = getPlayerScores(gameState!);
  return (
    <div>
      results
      {Object.keys(scoreByPlayer).map((playerId) => (
        <div key={playerId}>
          {getPlayerWithId(players, playerId as Player['id']).name} score: {scoreByPlayer[playerId as Player['id']]}
        </div>
      ))}
    </div>
  );
};

export default Results;
