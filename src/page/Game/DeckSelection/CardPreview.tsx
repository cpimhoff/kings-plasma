import { Card as ICard } from '@/gameplay/state/Card';
import FullCard from './FullCard';

interface Props {
  previewCard?: ICard | null;
};
const CardPreview = ({ previewCard }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="w-50">
        { !!previewCard ? <FullCard {...previewCard} /> : null }
      </div>
    </div>
  );
};

export default CardPreview;
