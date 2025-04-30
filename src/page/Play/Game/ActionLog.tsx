import { useGameplayStore } from './GameplayStore';

export default function ActionLog() {
  const actionLog = useGameplayStore((state) => state.actionLog);
  return (
    <div>
      {actionLog.map(({ subject, verb, object }, i) => {
        return (
          <p key={i}>
            {subject} {verb} {object}
          </p>
        );
      })}
    </div>
  );
}
