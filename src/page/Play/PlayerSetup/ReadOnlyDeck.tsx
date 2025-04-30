import { HydratedCardGroup } from '@/deck';
import CardCountWrapper from './CardCountWrapper';
import DeckCard from './DeckCard';

interface Props {
  hydratedCardGroups: HydratedCardGroup[];
}
export default function ReadOnlyDeck({ hydratedCardGroups }: Props) {
  return (
    <div className="flex">
      {hydratedCardGroups.map(({ cardDef, count }) => {
        return (
          <CardCountWrapper key={cardDef.typeId} count={count} className="w-30">
            <DeckCard card={cardDef} color={'var(--player-color)'} />
          </CardCountWrapper>
        );
      })}
    </div>
  );
}
