import { BoardTile as IBoardTile } from '@/gameplay/state/Board';
import { useGameplayStore } from '@/gameplay/store';
import { getPlayerWithId } from '@/gameplay/state/Player';
import TileContainer from './TileContainer';
import TileCard from './TileCard';
import TilePips from './TilePips';

const BoardTile = (tile: IBoardTile) => {
  const { card, pips, controllerPlayerId } = tile;
  const { gameState } = useGameplayStore();
  const { players } = gameState!;
  const playerName = controllerPlayerId ? getPlayerWithId(players, controllerPlayerId).name : 'empty';
  return (
    <TileContainer>
      { card && (
        <TileCard {...card} />
      ) }
      { pips > 0 && <TilePips pips={pips} /> }
      { playerName }
    </TileContainer>
  );
};

export default BoardTile;
