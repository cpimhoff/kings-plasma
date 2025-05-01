import { Character } from '@/character/Character';
import OPPONENTS from '@/character/roster';
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
      <p className="mb-3">choose character</p>
      <div className="flex flex-col gap-5">
        {OPPONENTS.map((character) => {
          const hydratedCardGroups = hydrateCardGroups(character.deck, allCardDefsById);
          return (
            <div key={character.name} className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  <p>name: {character.name}</p>
                  <p>description: {character.description}</p>
                </div>
                <Button onClick={() => onSubmit(character)}>Choose</Button>
              </div>
              <div className="overflow-x-auto">
                <ReadOnlyDeck hydratedCardGroups={hydratedCardGroups} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
