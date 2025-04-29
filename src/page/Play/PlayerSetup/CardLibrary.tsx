import { memo } from 'react';
import LibraryCardView from './LibraryCardView';
import LibraryControls from './LibraryControls';

export default memo(function CardLibrary() {
  return (
    <div className="flex flex-col bg-slate-300 p-2">
      <div className="flex justify-between">
        available cards
        <LibraryControls />
      </div>
      <LibraryCardView />
    </div>
  );
});
