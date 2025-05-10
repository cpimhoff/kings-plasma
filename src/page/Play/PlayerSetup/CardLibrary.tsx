import LibraryCardView, { LibraryCardViewProps } from './LibraryCardView';
import LibraryControls from './LibraryControls';

interface Props {
  CardWrapper: LibraryCardViewProps['CardWrapper'];
}
export default function CardLibrary({ CardWrapper }: Props) {
  return (
    <div className="flex flex-col bg-slate-300 p-2">
      <div className="flex justify-between">
        available cards
        <LibraryControls />
      </div>
      <LibraryCardView CardWrapper={CardWrapper} />
    </div>
  );
}
