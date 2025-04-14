import { CSSProperties } from 'react';
import { Card as ICard } from '@/gameplay/state/Card';
import { CardName, CardPower, CardSpecialEffectMarker } from '@/components/Card';

interface Props {
  card: ICard;
  color: string;
}
const TileCard = ({ card, color }: Props) => {
  return (
    <div className="flex flex-col h-full border border-3 rounded-sm">
      <div
        className="flex flex-col h-full justify-between bg-linear-to-t from-gray-700 to-[var(--start-color)]"
        style={{ '--start-color': color } as CSSProperties}
      >
        <div className="w-full flex justify-between">
          <div className="m-1 w-7 h-7">
            <CardSpecialEffectMarker {...card} />
          </div>
          <div className="m-1 w-7 h-7">
            <CardPower {...card} />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-700 p-3 text-white font-bold flex justify-center">
        <CardName {...card} />
      </div>
    </div>
  );
};

export default TileCard;
