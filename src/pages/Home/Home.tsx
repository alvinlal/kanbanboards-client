import { useState } from 'react';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  const addFive = () => {
    setCount((prev) => prev + 5);
  };

  const subFive = () => {
    setCount((prev) => prev - 5);
  };

  return (
    <div>
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
