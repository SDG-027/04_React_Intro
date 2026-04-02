import { useState, useEffect } from 'react';

function App() {
  const [todo, setTodo] = useState(null);
  const [count, setCount] = useState(0);

  // Problem:
  // -> Aufruf von setTodo löst einen Infinite Loop aus - wie ist fetching in React möglich?
  // fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setTodo(data);
  //   });

  // useEffect( effectCallback, dependencyArray  ) -> useEffect(Was?, Wann?)

  // -> useEffect ermöglicht, den fetch-Code nur einmalig auszuführen
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTodo(data);
  //     });
  // }, []);

  // Schreibweise für async/await (Effectfunktion selbst darf nicht async sein, deshalb innere Fn)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/5');
      const data = await res.json();
      setTodo(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Aktion im useEffekt, nur einmal beim Mounten');
  }, []); // -> Leeres Dependency Array -> einmalige Ausführung *nach* dem ersten Rendern

  // useEffect(() => {
  //   console.log('LOG ohne Dependency Array, nach dem Rendern');
  // }); // -> ohne Dependency Array -> immer nach dem Rendern (fast nie verwendet)

  // console.log('Log im Logik Bereich');

  useEffect(() => {
    console.log('Log mit Dependency Array', count);
  }, [count]); // -> Dependency Array mit State -> Callback wird nach dem Rendern ausgeführt, wenn sich *count* verändert hat

  useEffect(() => {
    console.log('Todo changed');
  }, [todo]);

  // Effect für globalen EventListener (window ist nicht im JSX)
  useEffect(() => {
    // handler Funktion in Variable für das spätere Löschen
    const handleResize = (e) => {
      console.log('Window size:', e.target.innerWidth);
    };

    // Globalen EventListener setzen
    window.addEventListener('resize', handleResize);

    // Aufräumfunktion im return -> Wird ausgeführt, wenn Komponente zerstört wird
    // (z.B. im Konditionalen Rendern oder bei Navigation)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <h1>React useEffect</h1>
      {todo ? (
        <p>
          {todo.id}: {todo.title}
        </p>
      ) : (
        <p>Loading</p>
      )}
      <button onClick={() => setCount((c) => c + 1)}>Count {count}</button>
    </>
  );
}

export default App;
