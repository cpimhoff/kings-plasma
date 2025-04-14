import FullCard from '../PlayerSetup/FullCard'; // TODO either move this or make a new component
import { cn } from '@/utils/cn';
import { Card as ICard } from '@/gameplay/state/Card';

interface Props {
  card: ICard,
  isSelected: boolean,
}
const HandCard = ({ card, isSelected }: Props) => {
  return (
    <div className={cn({
      'bg-sky-100': isSelected,
    })}>
      <FullCard {...card} />
    </div>
  );
};

export default HandCard;
