import { Card as ICard, getCardHasSpecialEffect } from '@/gameplay/state/Card';

type Props = Pick<ICard, 'effects'>;
const CardSpecialEffectMarker = ({ effects }: Props) => {
  const hasSpecialEffect = useMemo(() => {
    return getCardHasSpecialEffect(effects);
  }, [effects]);
  return (
    <div
      className="text-xl text-transparent"
      style={{ textShadow: '0 0 0 var(--color-yellow-500)' }}
      dangerouslySetInnerHTML={{
        __html: hasSpecialEffect ? '&#127775;' : '',
      }}
    ></div>
  );
};

export default CardSpecialEffectMarker;
