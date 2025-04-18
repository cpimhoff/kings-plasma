import { Card as ICard } from '@/gameplay/state/Card';
import { CardPower, CardSpecialEffectMarker, CardGradient, CardFooter, CardName } from '@/components/Card';

interface Props {
  card: ICard;
  color: string;
}
const TileCard = ({ card, color }: Props) => {
  return (
    <div className="flex flex-col h-full border border-3 rounded-sm">
      <CardGradient className="flex flex-col h-full justify-between" color={color}>
        <div className="w-full flex justify-between">
          <div className="m-1 w-7 h-7">
            <CardSpecialEffectMarker {...card} />
          </div>
          <div className="m-1 w-7 h-7">
            <CardPower {...card} />
          </div>
        </div>
      </CardGradient>
      <CardFooter className="w-full">
        <CardName {...card} />
      </CardFooter>
    </div>
  );
};

export default TileCard;
