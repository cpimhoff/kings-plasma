import TileContainer from './TileContainer';
import { CardPower } from '@/components/Card';

interface Props {
  score: number,
}
const RowScoreTile = ({ score }: Props) => {
  return (
    <TileContainer>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-12 h-12">
          <CardPower power={score} />
        </div>
      </div>
    </TileContainer>
  );
};

export default RowScoreTile;

