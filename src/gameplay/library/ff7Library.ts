import { Card, CardEffect } from "../state";

export namespace FF7Library {
  // An index of all cards in FF7: Rebirth is available at:
  // https://game8.co/games/Final-Fantasy-VII-Rebirth/archives/Queens-Blood
  // The below definitions are ordered according to how they appear at that link

  export const SecurityOfficer: Card = {
    id: "security-officer",
    name: "Security Officer",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
    ],
    isLegendary: false,
  };

  export const RiotTrooper: Card = {
    id: "riot-trooper",
    name: "Riot Trooper",
    playRequirement: 2,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: -2 },
      ]),
    ],
    isLegendary: false,
  };

  export const Grenadier: Card = {
    id: "grenadier",
    name: "Grenadier",
    playRequirement: 2,
    power: 1,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPower([{ dx: 2, dy: 0 }], -4, { opponent: true }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 4.`,
    isLegendary: false,
  };

  export const JUnitSweeper: Card = {
    id: "j-unit-sweeper",
    name: "J-Unit Sweeper",
    playRequirement: 2,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
    ],
    isLegendary: false,
  };

  export const QueenBee: Card = {
    id: "queen-bee",
    name: "Queen Bee",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: -2 },
      ]),
    ],
    isLegendary: false,
  };

  export const Toxirat: Card = {
    id: "toxirat",
    name: "Toxirat",
    playRequirement: 2,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower([{ dx: 1, dy: -1 }], -3, {
          allied: true,
          opponent: true,
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 3.`,
    isLegendary: false,
  };

  export const Levrikon: Card = {
    id: "levrikon",
    name: "Levrikon",
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
    ],
    isLegendary: false,
  };

  export const GrasslandsWolf: Card = {
    id: "grasslands-wolf",
    name: "Grasslands Wolf",
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
    ],
    isLegendary: false,
  };

  export const Mu: Card = {
    id: "mu",
    name: "Mu",
    playRequirement: 2,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: -1 }], +1, {
        allied: true,
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 1 while this card is in play.`,
    isLegendary: false,
  };

  export const Mandragora: Card = {
    id: "mandragora",
    name: "Mandragora",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          id: "mandragora-minion",
          name: "Mandragora Minion",
          playRequirement: 1,
          power: 1,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: 0, dy: 1 },
              { dx: 1, dy: 0 },
            ]),
          ],
          isLegendary: false,
        }),
      ),
    ],
    description: `When played, add Mandragora Minion to your hand.`,
    isLegendary: false,
  };

  export const Elphadunk: Card = {
    id: "elphadunk",
    name: "Elphadunk",
    playRequirement: 2,
    power: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
    ],
    isLegendary: false,
  };

  export const Cactuar: Card = {
    id: "cactuar",
    name: "Cactuar",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange([{ dx: 1, dy: -2 }], +3, {
        allied: true,
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
    isLegendary: false,
  };

  export const CrystallineCrab: Card = {
    id: "crystalline-crab",
    name: "Crystalline Crab",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: 1 }], +2, {
        allied: true,
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
    isLegendary: false,
  };

  export const Quetzalcoatl: Card = {
    id: "quetzalcoatl",
    name: "Quetzalcoatl",
    playRequirement: 2,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -2 },
      ]),
    ],
    isLegendary: false,
  };

  export const Zu: Card = {
    id: "zu",
    name: "Zu",
    playRequirement: 2,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
    ],
    isLegendary: false,
  };

  export const DevilRider: Card = {
    id: "devil-rider",
    name: "Devil Rider",
    playRequirement: 2,
    power: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: -2, dy: 0 },
        { dx: -2, dy: -1 },
        { dx: -2, dy: 1 },
      ]),
    ],
    isLegendary: false,
  };

  export const Screamer: Card = {
    id: "screamer",
    name: "Screamer",
    playRequirement: 3,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 0 },
      ]),
    ],
    isLegendary: false,
  };

  export const Flan: Card = {
    id: "flan",
    name: "Flan",
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
      ]),
    ],
    isLegendary: false,
  };

  export const Crawler: Card = {
    id: "crawler",
    name: "Crawler",
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: -1, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
    ],
    isLegendary: false,
  };

  export const Archdragon: Card = {
    id: "archdragon",
    name: "Archdragon",
    playRequirement: 1,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower([{ dx: 1, dy: 0 }], -3, {
          opponent: true,
        }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 3.`,
    isLegendary: false,
  };

  export const Ogre: Card = {
    id: "ogre",
    name: "Ogre",
    playRequirement: 2,
    power: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 2 },
        { dx: 0, dy: -2 },
        { dx: 1, dy: -2 },
      ]),
    ],
    isLegendary: false,
  };

  export const Deathwheel: Card = {
    id: "deathwheel",
    name: "Deathwheel",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          [
            { dx: 2, dy: 2 },
            { dx: 2, dy: -2 },
          ],
          -3,
          {
            allied: true,
            opponent: true,
          },
        ),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 3.`,
    isLegendary: false,
  };

  export const Fleetwing: Card = {
    id: "fleetwing",
    name: "Fleetwing",
    playRequirement: 1,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -2, dy: 2 },
        { dx: -1, dy: -1 },
        { dx: -2, dy: -2 },
      ]),
    ],
    isLegendary: false,
  };

  export const Zemzelett: Card = {
    id: "zemzelett",
    name: "Zemzelett",
    playRequirement: 2,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange([{ dx: -1, dy: 0 }], +3, {
        allied: true,
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
    isLegendary: false,
  };

  export const Ignilisk: Card = {
    id: "ignilisk",
    name: "Ignilisk",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -2 },
      ]),
      ...CardEffect.passiveBoardPowerChange(
        [
          { dx: 1, dy: 0 },
          { dx: 0, dy: -2 },
        ],
        +2,
        { allied: true },
      ),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
    isLegendary: false,
  };

  export const Capparwire: Card = {
    id: "capparwire",
    name: "Capparwire",
    playRequirement: 1,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
          ],
          -1,
          { allied: true, opponent: true },
        ),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 1.`,
    isLegendary: false,
  };

  export const MindFlayer: Card = {
    id: "mind-flayer",
    name: "Mind Flayer",
    playRequirement: 2,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange(
        [
          { dx: 0, dy: 1 },
          { dx: 1, dy: 1 },
          { dx: 0, dy: -1 },
          { dx: 1, dy: -1 },
        ],
        -1,
        { allied: true, opponent: true },
      ),
    ],
    description: `Lower the power of allied and enemy cards on affected tiles by 1 while this card is in play.`,
    isLegendary: false,
  };

  export const Scrutineye: Card = {
    id: "scrutineye",
    name: "Scrutineye",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: -2 },
      ]),
      ...CardEffect.passiveBoardPowerChange(
        [
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ],
        +1,
        { allied: true, opponent: true },
      ),
    ],
    description: `Raise the power of allied and enemy cards on affected tiles by 1 while this card is in play.`,
    isLegendary: false,
  };

  export const HellRiderII: Card = {
    id: "hell-rider-ii",
    name: "Hell Rider II",
    playRequirement: 3,
    power: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          [
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
          ],
          -3,
          {
            opponent: true,
          },
        ),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 3.`,
    isLegendary: false,
  };

  export const Flametrooper: Card = {
    id: "flametrooper",
    name: "Flametrooper",
    playRequirement: 1,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(
          [
            { dx: -1, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: -1 },
          ],
          -3,
          {
            allied: true,
            opponent: true,
          },
        ),
      ),
    ],
    description: `When destroyed, lower the power of allied and enemy cards on affected tiles by 3.`,
    isLegendary: false,
  };

  export const Spearhawk: Card = {
    id: "spearhawk",
    name: "Spearhawk",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: -1 }], +2, {
        allied: true,
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
    isLegendary: false,
  };

  export const SeaDevil: Card = {
    id: "sea-devil",
    name: "Sea Devil",
    playRequirement: 3,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: { id: "onPlay", allied: true },
        actions: [{ id: "addPower", self: true, amount: +1 }],
      },
    ],
    description: `When allied cards are played from hand, raise this card's power by 1.`,
    isLegendary: false,
  };

  export const Shoalopod: Card = {
    id: "shoalopod",
    name: "Shoalopod",
    playRequirement: 2,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: 1 }], +4, {
        allied: true,
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 4 while this card is in play.`,
    isLegendary: false,
  };

  export const CrownLance: Card = {
    id: "crown-lance",
    name: "Crown Lance",
    playRequirement: 2,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
        { dx: 1, dy: -2 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          [
            { dx: 1, dy: -1 },
            { dx: 1, dy: -2 },
          ],
          -2,
          { allied: true, opponent: true },
        ),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 2.`,
    isLegendary: false,
  };

  export const TonberryKing: Card = {
    id: "tonberry-king",
    name: "Tonberry King",
    playRequirement: 2,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      {
        trigger: { id: "onDestroy", allied: true },
        actions: [{ id: "addPower", self: true, amount: +2 }],
      },
    ],
    description: `When allied cards are destroyed, raise this card's power by 2.`,
    isLegendary: false,
  };

  export const SandhogPie: Card = {
    id: "sandhog-pie",
    name: "Sandhog Pie",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(
          [
            { dx: 0, dy: 1 },
            { dx: 1, dy: 0 },
          ],
          +3,
          { allied: true },
        ),
      ),
    ],
    description: `When destroyed, raise the power of allied cards on affected tile by 3.`,
    isLegendary: false,
  };

  export const Bloatfloat: Card = {
    id: "bloatfloat",
    name: "Bloatfloat",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower([{ dx: 2, dy: 0 }], -4, {
          allied: true,
          opponent: true,
        }),
      ),
    ],
    description: `When destroyed, lower the power of allied and enemy cards on affected tiles by 4.`,
    isLegendary: false,
  };

  export const Bagnadrana: Card = {
    id: "bagnadrana",
    name: "Bagnadrana",
    playRequirement: 3,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: { id: "onPlay", opponent: true },
        actions: [{ id: "addPower", self: true, amount: +1 }],
      },
    ],
    description: `When enemy cards are played from hand, raise this card's power by 1.`,
    isLegendary: false,
  };

  export const Cockatrice: Card = {
    id: "cockatrice",
    name: "Cockatrice",
    playRequirement: 2,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      CardEffect.onThisPlayed({
        id: "immediatelyDestroy",
        tiles: [{ dx: 1, dy: 0 }],
      }),
    ],
    description: `When played, destroy allied and enemy cards on affected tiles.`,
    isLegendary: false,
  };

  export const Heatseeker: Card = {
    id: "heatseeker",
    name: "Heatseeker",
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisDestroyed({
        id: "createCardForPlayer",
        card: {
          // FIXME: need to check the exact card in game, can't find a screenshot
          // of the minion card online...
          id: "heatseeker-minion",
          name: "Heatseeker Minion",
          playRequirement: 1,
          power: 1,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: -1, dy: 0 },
              { dx: 1, dy: 0 },
              { dx: 0, dy: 1 },
              { dx: 0, dy: -1 },
            ]),
          ],
          isLegendary: false,
        },
        player: "allied",
        into: "hand",
      }),
    ],
    description: `When destroyed, add Heatseeker Minion to your hand.`,
    isLegendary: false,
  };

  export const Bomb: Card = {
    id: "bomb",
    name: "Bomb",
    playRequirement: 2,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(
          [
            { dx: -1, dy: 1 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
            { dx: 0, dy: -1 },
            { dx: -1, dy: -1 },
            { dx: -1, dy: 0 },
          ],
          -4,
          {
            allied: true,
            opponent: true,
          },
        ),
      ),
    ],
    description: `When destroyed, lower the power of allied and enemy cards on affected tiles by 4.`,
    isLegendary: false,
  };

  export const Thug: Card = {
    id: "thug",
    name: "Thug",
    playRequirement: 2,
    power: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 2 },
        { dx: 1, dy: -2 },
        { dx: 1, dy: 0 },
      ]),
    ],
    isLegendary: false,
  };

  export const DeathClaw: Card = {
    id: "death-claw",
    name: "Death Claw",
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: { id: "onDestroy", opponent: true },
        actions: [{ id: "addPower", self: true, amount: +1 }],
      },
    ],
    description: `When enemy cards are destroyed, raise this card's power by 1.`,
    isLegendary: false,
  };

  export const Landworm: Card = {
    id: "landworm",
    name: "Landworm",
    playRequirement: 3,
    power: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: { id: "onDestroy", opponent: true },
        actions: [{ id: "addPower", self: true, amount: +2 }],
      },
    ],
    description: `When enemy cards are destroyed, raise this card's power by 2.`,
    isLegendary: false,
  };

  export const Sandspitter: Card = {
    // This card has an incorrect description on the game8 site
    // correct info here:
    // https://www.gamerguides.com/final-fantasy-vii-rebirth/database/queens-blood/standard/045-sandspitter
    id: "sandspitter",
    name: "Sandspitter",
    playRequirement: 2,
    power: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 2 },
        { dx: 0, dy: -2 },
        { dx: 1, dy: -2 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          [
            { dx: 0, dy: 2 },
            { dx: 1, dy: 2 },
            { dx: 0, dy: -2 },
            { dx: 1, dy: -2 },
          ],
          -1,
          {
            allied: true,
            opponent: true,
          },
        ),
      ),
    ],
    description: `When enemy cards are destroyed, raise this card's power by 2.`,
    isLegendary: false,
  };

  // To be continued...
  // left off at `Chimera`
}

export const FF7_LIBRARY = [
  FF7Library.SecurityOfficer,
  FF7Library.RiotTrooper,
  FF7Library.Grenadier,
  FF7Library.JUnitSweeper,
  FF7Library.QueenBee,
  FF7Library.Toxirat,
  FF7Library.Levrikon,
  FF7Library.GrasslandsWolf,
  FF7Library.Mu,
  FF7Library.Mandragora,
  FF7Library.Elphadunk,
  FF7Library.Cactuar,
  FF7Library.CrystallineCrab,
  FF7Library.Quetzalcoatl,
  FF7Library.Zu,
  FF7Library.DevilRider,
  FF7Library.Screamer,
  FF7Library.Flan,
  FF7Library.Crawler,
  FF7Library.Archdragon,
  FF7Library.Ogre,
  FF7Library.Deathwheel,
  FF7Library.Fleetwing,
  FF7Library.Zemzelett,
  FF7Library.Ignilisk,
  FF7Library.Capparwire,
  FF7Library.MindFlayer,
  FF7Library.Scrutineye,
  FF7Library.HellRiderII,
  FF7Library.Flametrooper,
  FF7Library.Spearhawk,
  FF7Library.SeaDevil,
  FF7Library.Shoalopod,
  FF7Library.CrownLance,
  FF7Library.TonberryKing,
  FF7Library.SandhogPie,
  FF7Library.Bloatfloat,
  FF7Library.Bagnadrana,
  FF7Library.Cockatrice,
  FF7Library.Heatseeker,
  FF7Library.Bomb,
  FF7Library.Thug,
  FF7Library.DeathClaw,
  FF7Library.Landworm,
  FF7Library.Sandspitter,
];

