import { DraftPlayerDeck } from './DraftPlayerDeck';
import SmallCard from './SmallCard';

interface Props {
  draftPlayerDeck: DraftPlayerDeck;
};
const CardDeck = ({ draftPlayerDeck }: Props) => {
  return (
    <div>
      <h2> deck: </h2>
      <div className="flex flex-wrap w-300 h-100">
        { Object.keys(draftPlayerDeck.cardsById).map((cardId) => {
          const card = draftPlayerDeck.cardsById[cardId];
          const count = draftPlayerDeck.cardCountById[cardId];
          return (
            <div key={cardId} className="w-40">
              <SmallCard {...card} />
              { `x${count}` }
            </div>
          );
        }) }
      </div>
    </div>
  );
};

export default CardDeck;
