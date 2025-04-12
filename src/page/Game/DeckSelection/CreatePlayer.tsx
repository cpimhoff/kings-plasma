import { Player } from '@/gameplay/state/Player';
import CardLibrary from './CardLibrary';
import Card from '@/components/Card';

const CreatePlayer = (player: Player) => {
  return (
    <div>
      <div>
        <p>
          Enter name:
          <input></input>
        </p>
      </div>
      <div>
        <h2> deck: </h2>
        <div>
          { player.deck.map(card => <Card {...card} />) }
        </div>
      </div>
      <div>
        <h2> available cards: </h2>
        <CardLibrary />
      </div>
    </div>
  );
};

export default CreatePlayer;
