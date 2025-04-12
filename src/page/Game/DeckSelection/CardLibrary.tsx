import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';
import Card from '@/components/Card';

const CardLibrary = () => {
  return (
    <div>
      <h2> available cards </h2>
      <div className="flex">
        { FF7_LIBRARY.map(card => (
          <div>
            <Card {...card} />
          </div>
        )) }
      </div>
    </div>
  );
};

export default CardLibrary;
