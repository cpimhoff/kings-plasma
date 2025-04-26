import { CardDefinition as ICard } from '@/gameplay/state/Card';

type Props = Pick<ICard, 'description'>;
const CardSpecialEffectDescription = ({ description }: Props) => {
  return <div className="text-center text-sm">{description || 'This card has no abilities.'}</div>;
};

export default CardSpecialEffectDescription;
