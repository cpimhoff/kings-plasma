import GameStatus from './GameStatus';
import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import BoardView from './BoardView';
import { useGameplayStore } from './GameplayStore';
import { useGameModeStore } from '../GameModeStore';
import { chooseAction } from '@/agent/choice';

const SetupPhase = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const dispatchAction = useGameplayStore((state) => state.dispatchAction);
  const { players } = gameState!;
  const player = players.find((player) => !player.phase.setup.done)!;
  const gameMode = useGameModeStore((state) => state.gameMode);
  const isAgentTurn = useMemo(() => {
    return gameMode === 'local-1p' && players.indexOf(player) === 1;
  }, [player]);
  useEffect(() => {
    if (isAgentTurn) {
      const action = chooseAction(gameState!, player.id);
      dispatchAction(action);
    }
  }, [isAgentTurn]);
  return (
    <BoardView
      gameStatus={<GameStatus player={player} />}
      gameBoard={<GameBoard />}
      boardControls={<BoardControls player={player} locked={isAgentTurn} />}
      playerHand={<PlayerHand player={player} locked={isAgentTurn} />}
    />
  );
};

export default SetupPhase;
