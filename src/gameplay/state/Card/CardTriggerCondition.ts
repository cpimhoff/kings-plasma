export type CardTriggerCondition =
  | CardTriggerCondition.OnPlay
  | CardTriggerCondition.OnDeath
  | CardTriggerCondition.OnPowerChange;

export namespace CardTriggerCondition {
  export type OnPlay = {
    id: "onPlay";
    targets: Partial<{ self: boolean; allied: boolean; opponent: boolean }>;
  };

  export type OnDeath = {
    id: "onDestroy";
    targets: Partial<{ self: boolean; allied: boolean; opponent: boolean }>;
  };

  export type OnPowerChange = {
    id: "onPowerChange";
    targets: Partial<{ self: boolean; allied: boolean; opponent: boolean }>;
    direction: Partial<{ positive: boolean; negative: boolean }>;
  };
}
