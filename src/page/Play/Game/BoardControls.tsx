import { useCallback } from 'react';
import { useGameplayStore } from './GameplayStore';
import { useMulliganStore } from './MulliganStore';
import { useInteractionStore } from './InteractionStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { ControllerPlayerContext } from './ControllerPlayerContext';
import { useGameModeStore } from '../GameModeStore';

const BoardControls = () => {
  const [gameState, animating, dispatchAction, undo] = useGameplayStore(
    useShallow((state) => {
      return [state.gameState, state.animating, state.dispatchAction, state.undo];
    }),
  );

  const { handIndexesToMulligan, resetMulligans } = useMulliganStore(
    useShallow((state) => ({
      handIndexesToMulligan: state.handIndexesToMulligan,
      resetMulligans: state.resetMulligans,
    })),
  );

  const { resetSelections } = useInteractionStore(
    useShallow((state) => ({
      resetSelections: state.resetSelections,
    })),
  );

  const { controllerPlayer: player, controlsLocked: locked } = useContext(ControllerPlayerContext)!;

  const onMulligan = useCallback(() => {
    dispatchAction({
      type: 'mulligan',
      playerId: player.id,
      handIndexes: handIndexesToMulligan,
    });
    resetMulligans();
  }, [player.id, handIndexesToMulligan]);

  const onPass = useCallback(() => {
    dispatchAction({
      type: 'pass',
      playerId: player.id,
    });
    resetSelections();
  }, [player.id]);

  const onRematch = useCallback(() => {
    dispatchAction({
      type: 'rematch',
      playerId: player.id,
      rematch: true,
    });
  }, [player.id]);

  const gameMode = useGameModeStore((state) => state.gameMode);
  const onUndo = useCallback(() => {
    undo();
    if (gameMode === 'local-1p') {
      // undo the opponent's action as well
      undo();
    }
    resetSelections();
  }, [gameMode]);

  const { phase } = gameState!;

  return (
    <div className="flex flex-col gap-3">
      {phase === 'setup' && (
        <Button disabled={locked} onClick={() => onMulligan()}>
          {handIndexesToMulligan.length > 0 ? 'Mulligan and begin' : 'Begin'}
        </Button>
      )}
      {phase === 'play' && (
        <>
          <Button disabled={animating || locked} onClick={() => onPass()}>
            Pass
          </Button>
        </>
      )}
      {phase === 'end' && (
        <>
          <Button disabled={locked} onClick={() => onRematch()}>
            Rematch
          </Button>
        </>
      )}
      <Button disabled={animating || locked || phase === 'setup'} onClick={() => onUndo()}>
        Undo
      </Button>
    </div>
  );
};

export default BoardControls;
