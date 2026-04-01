import { useState } from 'react';

export default function Counter({ count, setCount }) {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter</h2>

      <button
        onClick={() => {
          setCount((c) => c - 1);
        }}
      >
        -
      </button>

      <p>{count}</p>

      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
