import { cn } from '@/utils/cn';
import { HydratedCardGroup } from '@/deck';
import CardCountWrapper from './CardCountWrapper';
import DeckCard from './DeckCard';

interface Props {
  hydratedCardGroups: HydratedCardGroup[];
  className?: string;
  color: string;
}
export default function ReadOnlyDeck({ hydratedCardGroups, className, color }: Props) {
  return (
    <div className={cn('flex', className)}>
      {hydratedCardGroups.map(({ cardDef, count }) => {
        return (
          <CardCountWrapper key={cardDef.typeId} count={count} className="w-35 shrink-0">
            <DeckCard card={cardDef} color={color} />
          </CardCountWrapper>
        );
      })}
    </div>
  );
}
