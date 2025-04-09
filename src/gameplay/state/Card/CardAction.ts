export type CardAction = CardAction.AddControlledPips | CardAction.AddPower;

export namespace CardAction {
  export type AddControlledPips = {
    id: "addControlledPips";
    vectors: Array<{ dx: number; dy: number }>;
    amount: number; // typically 1
  };

  export type AddPower = {
    id: "addPower";
    vectors: Array<{ dx: number; dy: number }>;
    targets: Partial<{ allied: boolean; opponent: boolean }>;
    amount: number; // can be negative
  };
}
