import { useCallback } from 'react';
import { useGameplayStore } from './GameplayStore';
import { Player } from '@/gameplay/state/Player';
import { useMulliganStore } from './MulliganStore';
import { useInteractionStore } from './InteractionStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { chooseAction } from '@/intelligence/choice';

interface Props {
  player: Player;
}

const BoardControls = ({ player }: Props) => {
  const [gameState, animating, dispatchAction, undo] = useGameplayStore(useShallow((state) => {
    return [state.gameState, state.animating, state.dispatchAction, state.undo];
  }));

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

  const onAuto = useCallback(() => {
    const action = chooseAction(gameState!, player.id);
    dispatchAction(action);
  }, [player.id]);

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
      <Button onClick={() => onAuto()}>Auto</Button>
      {phase === 'setup' && (
        <Button onClick={() => onMulligan()}>
          {handIndexesToMulligan.length > 0 ? 'Mulligan and begin' : 'Begin'}
        </Button>
      )}
      {phase === 'play' && (
        <>
          <Button disabled={animating} onClick={() => onPass()}>Pass</Button>
        </>
      )}
      {phase === 'end' && (
        <>
          <Button onClick={() => onRematch()}>Rematch</Button>
        </>
      )}
      <Button disabled={animating} onClick={() => onUndo()}>Undo</Button>
    </div>
  );
};

export default BoardControls;
