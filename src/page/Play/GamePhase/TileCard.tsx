import { CardDefinition as ICard } from '@/gameplay/state/Card';
import { CardPower, CardSpecialEffectMarker, CardGradient, CardFooter, CardName } from '@/components/Card';

interface Props {
  card: ICard;
  color: string;
  nerfedPower: boolean;
  buffedPower: boolean;
}
const TileCard = ({ card, color, nerfedPower, buffedPower }: Props) => {
  return (
    <div className="flex h-full flex-col rounded-sm border border-3">
      <CardGradient className="flex h-full flex-col justify-between" color={color}>
        <div className="flex w-full justify-between">
          <div className="m-1 h-7 w-7">
            <CardSpecialEffectMarker {...card} />
          </div>
          <div className="m-1 h-7 w-7">
            <CardPower power={card.power} nerfed={nerfedPower} buffed={buffedPower} />
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
