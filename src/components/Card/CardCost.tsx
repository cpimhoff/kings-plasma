import { Card as ICard } from '@/gameplay/state/Card/Card';

type Props = Pick<ICard, 'playRequirement'>;
const CardCost = ({ playRequirement }: Props) => {
  let value;
  if (playRequirement === 'replace') {
    value = 'R';
  } else {
    value = Array.from({ length: playRequirement }).map(() => 'i').join(' ');
  }
  return (
    <div>
      { value }
    </div>
  );
}

export default CardCost;
