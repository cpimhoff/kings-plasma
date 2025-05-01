import { useCallback } from 'react';
import { usePlayerSetupStore } from './PlayerSetupStore';
import { useGameplayStore } from '../Game/GameplayStore';
import CreatePlayer from './CreatePlayer';
import { Button } from '@/components/ui/button';
import { useGameModeStore } from '../GameModeStore';
import { useShallow } from 'zustand/react/shallow';
import { Character } from '@/character/Character';
import ChooseCharacter from './ChooseCharacter';
import { createPlayer } from '@/gameplay';
import { useCreatePlayerStore } from './CreatePlayerStore';
import { getRandomColor } from './color';
import { hydrateCardGroups, toCardInstances } from '@/deck';
import { useCardLibraryStore } from './CardLibraryStore';

export default function PlayerSetup() {
  const { players, playerIdx, setPlayerIdx, setPlayer } = usePlayerSetupStore(
    useShallow((state) => ({
      players: state.players,
      playerIdx: state.playerIdx,
      setPlayerIdx: state.setPlayerIdx,
      setPlayer: state.setPlayer,
    })),
  );
  const allCardDefsById = useCardLibraryStore((state) => state.cardDefByTypeId);
  const flipHandedness = useCardLibraryStore((state) => state.flipHandedness);
  const resetPlayerCreator = useCreatePlayerStore((state) => state.reset);
  const populatePlayerCreator = useCreatePlayerStore((state) => state.populate);
  const beginGame = useGameplayStore((state) => state.beginGame);

  const { gameMode, setCharacterForPlayer } = useGameModeStore(
    useShallow((state) => ({
      gameMode: state.gameMode,
      charactersByPlayerId: state.charactersByPlayerId,
      setCharacterForPlayer: state.setCharacterForPlayer,
    })),
  );

  const createPlayerFromCharacter = useCallback(
    (character: Character) => {
      const player = createPlayer(character.name, getRandomColor());
      const hydratedCardGroups = hydrateCardGroups(character.deck, allCardDefsById);
      player.deck = toCardInstances(hydratedCardGroups);
      return player;
    },
    [allCardDefsById],
  );

  const readyPlayers = useMemo(() => {
    return players.filter((p) => !!p);
  }, [players]);

  const beginGameIfReady = useMemo(() => {
    return readyPlayers.length === 2 ? () => beginGame(readyPlayers) : null;
  }, [readyPlayers]);

  const playerIndexesInViewOrder = useMemo(() => {
    switch (gameMode!) {
      case 'local-1p':
        return [1, 0]; // user configures their opponent first when it's an AI
      case 'local-2p':
        return [0, 1];
    }
  }, [gameMode]);

  const playerViewIdx = useMemo(() => {
    return playerIndexesInViewOrder.findIndex((i) => i === playerIdx);
  }, [playerIdx, playerIndexesInViewOrder]);

  const handleNext = useMemo(() => {
    if (playerViewIdx === 1) {
      return beginGameIfReady;
    } else {
      if (players[playerIdx]) {
        return () => {
          const player = players[playerIdx]!;
          const newPlayerIdx = (playerIdx + 1) % 2;
          setPlayerIdx(newPlayerIdx);
          const newPlayer = players[newPlayerIdx];
          if (newPlayer) {
            populatePlayerCreator(newPlayer);
          } else {
            resetPlayerCreator({
              initialPlayerName: gameMode === 'local-1p' ? 'Player' : 'Righty',
              colorToAvoid: player.colorCssValue,
            });
          }
          flipHandedness();
        };
      }
      return null;
    }
  }, [playerViewIdx, beginGameIfReady, players, playerIdx, gameMode]);

  const handleBack = useMemo(() => {
    if (playerViewIdx === 1) {
      return () => {
        const newPlayerIdx = (playerIdx - 1) % 2;
        setPlayerIdx(newPlayerIdx);
        const newPlayer = players[newPlayerIdx];
        populatePlayerCreator(newPlayer!); // should exist if we're going back
        flipHandedness();
      };
    }
    return null;
  }, [playerViewIdx]);

  const contents = useMemo(() => {
    switch (gameMode) {
      case 'local-1p': {
        if (playerIdx === 0) {
          return (
            <CreatePlayer
              onSubmit={(player) => {
                setPlayer(player);
              }}
            />
          );
        }
        return (
          <ChooseCharacter
            onSubmit={(character) => {
              const player = createPlayerFromCharacter(character);
              setPlayer(player);
              setCharacterForPlayer(character, player.id);
            }}
          />
        );
      }
      case 'local-2p': {
        return (
          <CreatePlayer
            onSubmit={(player) => {
              setPlayer(player);
            }}
          />
        );
      }
      default:
        break;
    }
  }, [gameMode, playerIdx]);

  return (
    <div className="mx-40">
      <div className="mb-3 flex w-full justify-between">
        <Button disabled={!handleBack} onClick={() => handleBack?.()}>
          Back
        </Button>
        <Button disabled={!handleNext} onClick={() => handleNext?.()}>
          Next
        </Button>
      </div>
      {contents}
    </div>
  );
}
