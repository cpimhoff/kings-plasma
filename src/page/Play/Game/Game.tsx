import { useEffect, useMemo, useRef } from 'react';
import { useGameplayStore } from './GameplayStore';
import { useGameModeStore } from '../GameModeStore';
import { Agent } from '@/agent/Agent';
import { getPlayerWithId, Player } from '@/gameplay';
import { ControllerPlayerContext } from './ControllerPlayerContext';
import GameStatus from './GameStatus';
import GameBoard from './GameBoard';
import PlayerHand from './PlayerHand';
import BoardControls from './BoardControls';
import ActionLog from './ActionLog';
import { useDebugStore } from '../Debug/DebugStore';

const GamePhase = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { phase, players, playPhaseActivePlayerId } = gameState!;
  const dispatchAction = useGameplayStore((state) => state.dispatchAction);
  const charactersByPlayerId = useGameModeStore((state) => state.charactersByPlayerId);

  const findPlayer = useCallback(
    (predicate: (player: Player) => boolean) => {
      const matchingPlayers = [...players]
        .sort((p1, p2) => {
          // prioritize agents, so they can mulligan/request rematch in the background
          const p1HasAgent = !!charactersByPlayerId[p1.id]?.agent;
          const p2HasAgent = !!charactersByPlayerId[p2.id]?.agent;
          if (p1HasAgent && !p2HasAgent) return -1;
          if (p2HasAgent && !p1HasAgent) return 1;
          return 0;
        })
        .filter((player) => {
          if (!predicate(player)) return false;
          return true;
        });
      return matchingPlayers[0] ?? null;
    },
    [charactersByPlayerId, players],
  );

  const activePlayer = useMemo<Player>(() => {
    switch (phase) {
      case 'setup': {
        return findPlayer((player) => !player.phase.setup.done);
      }
      case 'play': {
        return getPlayerWithId(players, playPhaseActivePlayerId);
      }
      case 'end': {
        return findPlayer((player) => !player.phase.end.requestRematch);
      }
    }
  }, [phase, findPlayer, players, playPhaseActivePlayerId]);

  const animating = useGameplayStore((state) => state.animating);
  const activeAgent = useMemo<Agent | null>(() => {
    if (animating) return null;
    return charactersByPlayerId[activePlayer.id]?.agent ?? null;
  }, [animating, charactersByPlayerId, activePlayer]);

  const agentPaused = useDebugStore((state) => state.agentPaused);

  const didDispatch = useRef(false); // prevent double-firing mulligans in react strict mode
  useEffect(() => {
    if (agentPaused) return;
    if (activeAgent && !didDispatch.current) {
      didDispatch.current = true;
      const action = activeAgent.chooseAction(gameState!, activePlayer.id);
      dispatchAction(action);
    } else if (didDispatch.current) {
      didDispatch.current = false;
    }
  }, [agentPaused, activeAgent, gameState, activePlayer]);

  const gameMode = useGameModeStore((state) => state.gameMode);
  const debugPlayerIdx = useDebugStore((state) => {
    if (state.debugMode && typeof state.selectedPlayerIdx === 'number') {
      return state.selectedPlayerIdx;
    }
    return null;
  });
  const controllerPlayerContext = useMemo(() => {
    if (typeof debugPlayerIdx === 'number') {
      return {
        controllerPlayer: players[debugPlayerIdx],
        controlsLocked: false,
      };
    }
    if (gameMode === 'local-2p') {
      return {
        controllerPlayer: activePlayer,
        controlsLocked: false,
      };
    }
    const nonAgentPlayer = players.find((p) => !charactersByPlayerId[p.id]?.agent)!;
    // TODO: this will break if/when we allow agent-v-agent games
    return {
      controllerPlayer: nonAgentPlayer,
      controlsLocked: nonAgentPlayer.id !== activePlayer.id,
    };
  }, [debugPlayerIdx, gameMode, activePlayer, players, charactersByPlayerId]);

  return (
    <ControllerPlayerContext.Provider value={controllerPlayerContext}>
      <div className="flex w-full justify-center">
        <div className="flex flex-col">
          <div className="flex">
            <ActionLog />
            <div className="mx-3">
              <GameBoard />
            </div>
            <GameStatus />
          </div>
          <div className="mt-3 flex">
            <PlayerHand />
            <div className="ml-3">
              <BoardControls />
            </div>
          </div>
        </div>
      </div>
    </ControllerPlayerContext.Provider>
  );
};

export default GamePhase;
