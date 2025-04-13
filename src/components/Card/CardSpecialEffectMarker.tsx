import { Card as ICard, getCardHasSpecialEffect } from '@/gameplay/state/Card';

type Props = Pick<ICard, 'effects'>;
const CardSpecialEffectMarker = ({ effects }: Props) => {
  const hasSpecialEffect = useMemo(() => {
    return getCardHasSpecialEffect(effects);
  }, [effects]);
  return (
    <div>
      { hasSpecialEffect ? "*" : null }
    </div>
  );
};

export default CardSpecialEffectMarker;

