import { CardDefinition as ICard } from '@/gameplay/state/Card/Card';
import DownArrow from './DownArrow';

type Props = Pick<ICard, 'playRequirement'>;
const CardCost = ({ playRequirement }: Props) => {
  let value;
  if (playRequirement === 'replace') {
    value = <DownArrow className="h-7 w-7 fill-yellow-500" />;
  } else {
    value = Array.from({ length: playRequirement })
      .map(() => String.fromCharCode(0x265f))
      .join('');
  }
  return (
    <div className="text-xl tracking-[-5px] text-transparent" style={{ textShadow: '0 0 0 var(--color-yellow-500)' }}>
      {value}
    </div>
  );
};

export default CardCost;
