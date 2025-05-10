import { useGameplayStore } from './Game/GameplayStore';
import PlayerSetup from './PlayerSetup/PlayerSetup';
import Game from './Game/Game';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { useGameModeStore } from './GameModeStore';
import { useCreatePlayerStore } from './PlayerSetup/CreatePlayerStore';
import { usePlayerSetupStore } from './PlayerSetup/PlayerSetupStore';
import { useCardLibraryStore } from './PlayerSetup/CardLibraryStore';
import DebugMenu from './Debug/DebugMenu';

const Play = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const gameMode = useGameModeStore((state) => state.gameMode);
  const setGameMode = useGameModeStore((state) => state.setGameMode);
  const resetPlayerCreator = useCreatePlayerStore((state) => state.reset);
  const setPlayerIdx = usePlayerSetupStore((state) => state.setPlayerIdx);
  const flipHandedness = useCardLibraryStore((state) => state.flipHandedness);
  let contents: ReactNode;
  if (gameMode) {
    if (gameState) {
      contents = <Game />;
    } else {
      contents = <PlayerSetup />;
    }
  } else {
    contents = (
      <div className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center">
          <p>select game mode</p>
          <div className="mt-3 flex gap-3">
            <Button
              onClick={() => {
                setGameMode('local-1p');
                setPlayerIdx(1);
                flipHandedness();
              }}
            >
              1 Player (vs CPU)
            </Button>
            <Button
              onClick={() => {
                setGameMode('local-2p');
                setPlayerIdx(0);
                resetPlayerCreator({
                  initialPlayerName: 'Lefty',
                });
              }}
            >
              2 Player (PvP)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {gameMode && <DebugMenu />}
      {contents}
    </div>
  );
};

export default Play;
