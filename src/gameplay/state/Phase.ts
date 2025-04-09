import { Player } from "./Player";

export type Phase =
  | Phase.DeckSelection
  | Phase.Setup
  | Phase.Mulligan
  | Phase.Play
  | Phase.End;

export namespace Phase {
  export type DeckSelection = {
    type: "deckSelection";
    donePlayerIds: Player["id"][];
  };

  export type Setup = {
    type: "setup";
  };

  export type Mulligan = {
    type: "mulligan";
    donePlayerIds: Player["id"][];
  };

  export type Play = {
    type: "play";
    round: number;
    activePlayerId: Player["id"];
    passedPlayerIds: Player["id"][];
  };

  export type End = {
    type: "end";
    rematchPlayerIds: Player["id"][];
  };
}
