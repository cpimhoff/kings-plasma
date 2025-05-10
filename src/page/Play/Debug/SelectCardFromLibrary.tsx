import { useCallback } from 'react';
import { CardDefinition } from '@/gameplay';
import CardLibrary from '../PlayerSetup/CardLibrary';
import SelectableCardWrapper from '../PlayerSetup/SelectableCardWrapper';
import { CardWrapperProps } from '../PlayerSetup/LibraryCardView';
import { CSSProperties } from 'react';

interface Props {
  buttonCopy: string;
  onSelectCard: (card: CardDefinition) => void;
  color: string;
}
export default function SelectCardFromLibrary({ buttonCopy, onSelectCard, color }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const ChooserCardWrapper = useCallback(
    ({ card, children }: CardWrapperProps) => {
      return (
        <SelectableCardWrapper
          className="w-50"
          onClick={() => {
            onSelectCard(card);
            setDialogOpen(false);
          }}
        >
          {children}
        </SelectableCardWrapper>
      );
    },
    [onSelectCard],
  );
  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <Button onClick={() => setDialogOpen(true)}>{buttonCopy}</Button>
      <DialogContent className="h-200 min-w-200">
        <div className="overflow-y-auto" style={{ '--player-color': color } as CSSProperties}>
          <CardLibrary CardWrapper={ChooserCardWrapper} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
