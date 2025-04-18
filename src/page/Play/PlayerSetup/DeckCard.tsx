import { Card as ICard } from '@/gameplay/state/Card';
import {
  CardCost,
  CardPower,
  CardSpecialEffectMarker,
  CardGradient,
  CardFooter,
  CardName,
} from '@/components/Card';

interface Props {
  card: ICard;
  color: string;
}
const DeckCard = ({ card, color }: Props) => {
  return (
    <div className="flex flex-col h-full border border-3 rounded-sm">
      <CardGradient className="w-full h-full flex flex-col" color={color}>
        <div className="mt-2 mx-2 flex flex-col justify-between grow">
          <div className="flex justify-between">
            <div className="w-7 h-7">
              <CardCost {...card} />
            </div>
            <div className="m-1 w-7 h-7">
              <CardPower {...card} />
            </div>
          </div>
          <div className="flex align-bottom">
            <CardSpecialEffectMarker {...card} />
          </div>
        </div>
      </CardGradient>
      <CardFooter className="w-full">
        <CardName {...card} />
      </CardFooter>
    </div>
  );
};

export default DeckCard;
