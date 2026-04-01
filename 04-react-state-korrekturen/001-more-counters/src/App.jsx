import { useState } from 'react';
import Counter from './components/Counter';

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  return (
    <div>
      <h1>React: More Counters</h1>
      <div style={{ display: 'flex' }}>
        <Counter count={count} setCount={setCount} />
        <Counter count={count2} setCount={setCount2} />
        <Counter count={count3} setCount={setCount3} />
      </div>
    </div>
  );
}

export default App;
