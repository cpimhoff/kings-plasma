import { Card } from "../state";
import { onPlayPips } from "./util";

export const FF7_LIBRARY = [
  CardLibrary.SecurityOfficer,
  CardLibrary.Ignilisk,
  CardLibrary.MindFlayer,
];

export namespace CardLibrary {
  export const SecurityOfficer: Card = {
    id: "security-officer",
    name: "Security Officer",
    playRequirement: 1,
    power: 1,
    effects: [
      onPlayPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
      ]),
    ],
  };

  export const Ignilisk: Card = {
    id: "ignilisk",
    name: "Ignilisk",
    playRequirement: 1,
    power: 1,
    effects: [
      onPlayPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: 2 },
      ]),
      {
        // add power to affected tiles once
        trigger: { id: "onPlay", targets: { self: true } },
        actions: [
          {
            id: "addPower",
            vectors: [
              { dx: 1, dy: 0 },
              { dx: 0, dy: 2 },
            ],
            targets: { allied: true },
            amount: 2,
          },
        ],
      },
    ],
  };

  export const MindFlayer: Card = {
    id: "mind-flayer",
    name: "Mind Flayer",
    playRequirement: 2,
    power: 1,
    effects: [
      onPlayPips([
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: 1 },
      ]),
      {
        passive: [
          {
            id: "addPower",
            vectors: [
              { dx: 0, dy: -1 },
              { dx: 1, dy: -1 },
              { dx: 0, dy: 1 },
              { dx: 1, dy: 1 },
            ],
            targets: { allied: true, opponent: true },
            amount: -1,
          },
        ],
      },
    ],
  };
}
