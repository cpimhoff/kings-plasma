import { CardDefinition } from '@/gameplay/state/Card';
import { CardCost, CardPower, CardSpecialEffectMarker, CardGradient, CardFooter, CardName } from '@/components/Card';

interface Props {
  card: CardDefinition;
  color: string;
}
const DeckCard = ({ card, color }: Props) => {
  return (
    <div className="flex h-full flex-col rounded-sm border border-3">
      <CardGradient className="flex h-full w-full flex-col" color={color}>
        <div className="mx-2 mt-2 flex grow flex-col justify-between">
          <div className="flex justify-between">
            <div className="h-7 w-7">
              <CardCost {...card} />
            </div>
            <div className="m-1 h-7 w-7">
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
