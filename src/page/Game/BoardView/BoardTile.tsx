import { BoardTile as IBoardTile } from '@/gameplay/state/Board';
import TileContainer from './TileContainer';
import TileCard from './TileCard';

const BoardTile = (tile: IBoardTile) => {
  const { card } = tile;
  return (
    <TileContainer>
      { card && (
        <TileCard {...card} />
      ) }
    </TileContainer>
  );
};

export default BoardTile;
