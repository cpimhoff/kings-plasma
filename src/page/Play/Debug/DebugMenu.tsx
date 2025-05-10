import { useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDebugStore } from './DebugStore';
import { useGameplayStore } from '../Game/GameplayStore';
import { useShallow } from 'zustand/react/shallow';
import { createBoard, createPlayer } from '@/gameplay';
import { getRandomColor } from '../PlayerSetup/color';
import { StableRandom } from '@/utils/random';
import { useGameModeStore } from '../GameModeStore';
import { useInteractionStore } from '../Game/InteractionStore';
import SaveLoadGameState from './SaveLoadGameState';
import PlayerToggle from './PlayerToggle';

export default function DebugMenu() {
  const debugMode = useDebugStore((state) => state.debugMode);
  if (!debugMode) return null;

  const { editMode, agentPaused, toggleEditMode, toggleAgentPaused } = useDebugStore(
    useShallow((state) => ({
      editMode: state.editMode,
      agentPaused: state.agentPaused,
      toggleEditMode: state.toggleEditMode,
      toggleAgentPaused: state.toggleAgentPaused,
    })),
  );

  const { gameState, undo, forceSetGameState } = useGameplayStore(
    useShallow((state) => ({
      gameState: state.gameState,
      undo: state.undo,
      forceSetGameState: state.forceSetGameState,
    })),
  );

  const handleSetEmptyGameState = useCallback(() => {
    const board = createBoard({ width: 5, height: 3 });
    const players = [createPlayer('Lefty', getRandomColor()), createPlayer('Righty', getRandomColor())];
    forceSetGameState({
      phase: 'play',
      board,
      players,
      playPhaseActivePlayerId: players[0].id,
      rng: StableRandom.init(),
    });
  }, []);

  const gameMode = useGameModeStore((state) => state.gameMode);

  const selectedHandIndex = useInteractionStore((state) => state.selectedHandIndex);
  const disabled = useMemo(() => typeof selectedHandIndex === 'number', [selectedHandIndex]);
  const canUndo = useGameplayStore((state) => state.historyStack.length > 0);

  const currentPlayerIdx = useMemo(() => {
    if (!gameState) return null;
    return gameState.players.findIndex((player) => player.id === gameState.playPhaseActivePlayerId);
  }, [gameState]);

  const setSelectedPlayerIdx = useDebugStore((state) => state.setSelectedPlayerIdx);
  useEffect(() => {
    if (typeof currentPlayerIdx === 'number') {
      setSelectedPlayerIdx(currentPlayerIdx);
    }
  }, [currentPlayerIdx]);

  return (
    <div className="m-2 flex w-full gap-2">
      <Button disabled={disabled} onClick={() => handleSetEmptyGameState()}>
        Set empty game state
      </Button>
      <SaveLoadGameState disabled={disabled} />
      {gameState && (
        <>
          <Button disabled={disabled} onClick={() => toggleEditMode()}>
            {editMode ? 'Disable' : 'Enable'} edit mode
          </Button>
          {gameMode === 'local-1p' && (
            <Button disabled={disabled} onClick={() => toggleAgentPaused()}>
              {agentPaused ? 'Resume' : 'Pause'} agent
            </Button>
          )}
          <Button disabled={disabled || !canUndo} onClick={() => undo()}>
            Undo action
          </Button>
          Set current player:
          <PlayerToggle
            idx={currentPlayerIdx!}
            onChange={(idx) => {
              forceSetGameState({
                ...gameState,
                playPhaseActivePlayerId: gameState.players[idx].id,
              });
            }}
          />
        </>
      )}
    </div>
  );
}
