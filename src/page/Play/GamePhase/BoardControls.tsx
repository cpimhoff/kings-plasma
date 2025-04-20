import { useCallback } from 'react';
import { useGameplayStore } from '@/gameplay/store';
import { Player } from '@/gameplay/state/Player';
import { useMulliganStore } from './mulliganStore';
import { useInteractionStore } from './interactionStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';

interface Props {
  player: Player;
}

const BoardControls = ({ player }: Props) => {
  const gameState = useGameplayStore((state) => state.gameState);
  const [dispatchAction, undo] = useGameplayStore(useShallow((state) => [state.dispatchAction, state.undo]));

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

  const onUndo = useCallback(() => {
    undo();
    resetSelections();
  }, []);

  const { phase } = gameState!;

  return (
    <div className="flex flex-col gap-3">
      {phase === 'setup' && (
        <Button onClick={() => onMulligan()}>
          {handIndexesToMulligan.length > 0 ? 'Mulligan and begin' : 'Begin'}
        </Button>
      )}
      {phase === 'play' && (
        <>
          <Button onClick={() => onPass()}>Pass</Button>
        </>
      )}
      {phase === 'end' && (
        <>
          <Button onClick={() => onRematch()}>Rematch</Button>
        </>
      )}
      <Button onClick={() => onUndo()}>Undo</Button>
    </div>
  );
};

export default BoardControls;
