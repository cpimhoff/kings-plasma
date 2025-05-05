import { useRef, useEffect } from 'react';
import { useGameplayStore } from './GameplayStore';

export default function ActionLog() {
  const actionLog = useGameplayStore((state) => state.actionLog);
  const newestLogEntry = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    newestLogEntry.current?.scrollIntoView();
  }, [actionLog]);
  return (
    <div>
      <div className="flex max-h-100 flex-col-reverse justify-end overflow-y-scroll">
        {actionLog.map(({ subject, verb, object }, i) => {
          return (
            <p key={i} ref={i === actionLog.length - 1 ? newestLogEntry : null}>
              {subject} {verb} {object}
            </p>
          );
        })}
      </div>
    </div>
  );
}
