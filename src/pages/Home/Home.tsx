import { useState } from 'react';
import Button from '../../components/Buttons/Button/Button';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  const addFive = () => {
    setCount((prev) => prev + 5);
  };

  const subFive = () => {
    setCount((prev) => prev - 5);
  };

  return (
    <div className={styles.container}>
      <h1>The quick brown fox jumped over the lazy dog</h1>
      <h2>The quick brown fox jumped over the lazy dog</h2>
      <h3>The quick brown fox jumped over the lazy dog</h3>
      <h4>The quick brown fox jumped over the lazy dog</h4>
      <h5>The quick brown fox jumped over the lazy dog</h5>
      <h6>The quick brown fox jumped over the lazy dog</h6>
      <p>
        Tempor et adipisicing incididunt officia. Cupidatat labore eu velit eu
        ex cupidatat anim aliquip excepteur. Incididunt sunt velit non sint
        exercitation consectetur nostrud. Culpa dolor nostrud aliquip veniam
        amet mollit irure id est ipsum officia excepteur. Dolor laboris do elit
        amet consequat sit do nisi ad irure. Dolore ad esse amet ullamco ut
        nulla Lorem fugiat. Ad est aute qui ut ipsum enim nostrud velit aute
        nisi sint enim.
      </p>
      <p>count is {count}</p>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount((prev) => prev - 1)}>
        -
      </button>
      <button type="button" onClick={addFive}>
        +5
      </button>
      <button type="button" onClick={subFive}>
        -5
      </button>
      <Button variant="primary">Btn</Button>
    </div>
  );
};

export default Home;
