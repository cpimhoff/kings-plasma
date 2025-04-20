import SetupPhase from './SetupPhase';
import PlayPhase from './PlayPhase';
import EndPhase from './EndPhase';
import { useGameplayStore } from '@/gameplay/store';

const GamePhase = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { phase } = gameState!;

  let phaseView;
  switch (phase) {
    case 'setup':
      phaseView = <SetupPhase />;
      break;
    case 'play':
      phaseView = <PlayPhase />;
      break;
    case 'end':
      phaseView = <EndPhase />;
      break;
    default:
      return null;
  }

  return (
    <div className="flex w-full justify-center">
      <div>{phaseView}</div>
    </div>
  );
};

export default GamePhase;
