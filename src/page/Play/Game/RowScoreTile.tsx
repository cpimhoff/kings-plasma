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
          {/* TODO: make this a bespoke thing, don't reuse the card component */}
          <CardPower power={score} powerStatus={winning ? 'buffed' : null} />
        </div>
      </div>
    </TileContainer>
  );
};

export default RowScoreTile;
