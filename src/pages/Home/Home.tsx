import { useState } from 'react';
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
      <p>this is home page</p>
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
    </div>
  );
};

export default Home;
