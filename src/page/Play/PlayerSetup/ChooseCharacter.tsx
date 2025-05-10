import { Character } from '@/character/Character';
import OPPONENTS from '@/character/roster';
import { Button } from '@/components/ui/button';
import ReadOnlyDeck from './ReadOnlyDeck';
import { hydrateCardGroups } from '@/deck';
import { useCardLibraryStore } from './CardLibraryStore';
import ColorPicker from './ColorPicker';
import { getRandomColor } from './color';

interface Props {
  onSubmit: (character: Character, color: string) => void;
  selectedCharacterName: string | null;
  initialColor: string | null;
  onChangeColor: (color: string) => void;
}
export default function ChooseCharacter({ onSubmit, selectedCharacterName, initialColor, onChangeColor }: Props) {
  const allCardDefsById = useCardLibraryStore((state) => state.cardDefByTypeId);
  const [color, setColor] = useState<string>(initialColor ?? getRandomColor());
  return (
    <div>
      <div className="my-4">
        <ColorPicker
          color={color}
          onSelectColor={(color) => {
            setColor(color); // we have to track it ourselves too in case the player object hasn't been created yet
            onChangeColor(color);
          }}
        />
      </div>
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
                <Button disabled={selectedCharacterName === character.name} onClick={() => onSubmit(character, color)}>
                  Choose
                </Button>
              </div>
              <div className="overflow-x-auto">
                <ReadOnlyDeck hydratedCardGroups={hydratedCardGroups} color={color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
