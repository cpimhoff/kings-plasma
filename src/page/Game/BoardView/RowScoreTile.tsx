import TileContainer from './TileContainer';

interface Props {
  score: number,
}
const RowScoreTile = ({ score }: Props) => {
  return (
    <TileContainer>
      <div>
        { score }
      </div>
    </TileContainer>
  );
};

export default RowScoreTile;

