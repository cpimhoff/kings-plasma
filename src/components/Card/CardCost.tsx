import { Card as ICard } from '@/gameplay/state/Card/Card';

type Props = Pick<ICard, 'playRequirement'>;
const CardCost = ({ playRequirement }: Props) => {
  let value;
  if (playRequirement === 'replace') {
    value = String.fromCharCode(0x2B07);
  } else {
    value = Array.from({ length: playRequirement }).map(() => String.fromCharCode(0x265F)).join('');
  }
  return (
    <div className="tracking-[-5px] text-transparent text-xl" style={{ 'textShadow': '0 0 0 var(--color-yellow-500)' }}>
      { value }
    </div>
  );
}

export default CardCost;
