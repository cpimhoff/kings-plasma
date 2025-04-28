import { useGameplayStore } from './GamePhase/GameplayStore';
import PlayerSetup from './PlayerSetup/PlayerSetup';
import GamePhase from './GamePhase/GamePhase';
import { Button } from '@/components/ui/button';
import { CHAIN_STATE } from './GamePhase/chain';

const Play = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const _setDebugState = useGameplayStore(state => state._setDebugState);
  if (gameState) {
    return <GamePhase />;
  }
  return (
    <>
      <Button onClick={() => _setDebugState(JSON.parse(CHAIN_STATE))}>DEBUG</Button>
      <PlayerSetup />
    </>
  );
};

export default Play;
