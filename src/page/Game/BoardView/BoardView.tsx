import SetupPhase from './SetupPhase';
import PlayPhase from './PlayPhase';
import EndPhase from './EndPhase';
import { useGameplayStore } from '@/gameplay/store' ;

const BoardView = () => {
  const { gameState } = useGameplayStore();
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
  };

  return (
    <div>
      { phaseView }
    </div>
  );
};

export default BoardView;
