import TileContainer from './TileContainer';
import { CardPower } from '@/components/Card';

interface Props {
  score: number;
  winning: boolean;
}
const RowScoreTile = ({ score, winning }: Props) => {
  return (
    <TileContainer>
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-12 w-12">
          <CardPower power={score} buffed={winning} />
        </div>
      </div>
    </TileContainer>
  );
};

export default RowScoreTile;
