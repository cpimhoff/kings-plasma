import { Character } from '@/agent/character/Character';
import OPPONENTS from '@/agent/character/roster';
import { Button } from '@/components/ui/button';
import ReadOnlyDeck from './ReadOnlyDeck';
import { hydrateCardGroups } from '@/deck';
import { useCardLibraryStore } from './CardLibraryStore';

interface Props {
  onSubmit: (c: Character) => void;
}
export default function ChooseCharacter({ onSubmit }: Props) {
  const allCardDefsById = useCardLibraryStore((state) => state.cardDefByTypeId);
  return (
    <div>
      choose character
      <div>
        {OPPONENTS.map((character) => {
          const hydratedCardGroups = hydrateCardGroups(character.deck, allCardDefsById);
          return (
            <div key={character.name}>
              <p>name: {character.name}</p>
              <p>description: {character.description}</p>
              <p>
                <Button onClick={() => onSubmit(character)}>Choose</Button>
              </p>
              <ReadOnlyDeck hydratedCardGroups={hydratedCardGroups} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
