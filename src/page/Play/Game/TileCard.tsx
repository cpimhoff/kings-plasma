import { CardInstance, getCardPower, getCardPowerStatus } from '@/gameplay/state/Card';
import { CardPower, CardSpecialEffectMarker, CardGradient, CardFooter, CardName } from '@/components/Card';

interface Props {
  card: CardInstance;
  color: string;
}
const TileCard = ({ card, color }: Props) => {
  return (
    <div className="flex h-full flex-col rounded-sm border border-3">
      <CardGradient className="flex h-full flex-col justify-between" color={color}>
        <div className="flex w-full justify-between">
          <div className="m-1 h-7 w-7">
            <CardSpecialEffectMarker {...card.def} />
          </div>
          <div className="m-1 h-7 w-7">
            <CardPower power={getCardPower(card)} powerStatus={getCardPowerStatus(card)} />
          </div>
        </div>
      </CardGradient>
      <CardFooter className="w-full">
        <CardName {...card.def} />
      </CardFooter>
    </div>
  );
};

export default TileCard;
