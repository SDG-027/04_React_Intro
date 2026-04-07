import { useState, useEffect } from 'react';

export default function SimpleEffect() {
  const [people, setPeople] = useState(null);
  const [nextURL, setNextURL] = useState(null);
  const [previousURL, setPreviousURL] = useState(null);
  const [currentURL, setCurrentURL] = useState('https://swapi.tech/api/people');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSWAPI() {
      try {
        const res = await fetch(currentURL);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        setPeople(data.results); // erst nach dem Render
        setNextURL(data.next);
        setPreviousURL(data.previous);
      } catch (error) {
        // console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSWAPI();
  }, [currentURL]);

  if (loading) {
    return <p className="text-center font-medium text-gray-600">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-800 p-8 font-sans">
      <h1 className="text-center text-3xl font-bold text-gray-300">
        Star Wars Characters | Fetch on Click
      </h1>

      <div className="flex justify-center gap-4 pt-6">
        {previousURL && (
          <button onClick={() => setCurrentURL(previousURL)} type="button">
            Previous
          </button>
        )}
        {nextURL && (
          <button onClick={() => setCurrentURL(nextURL)} type="button">
            Next
          </button>
        )}
      </div>

      {/* {loading && (
        <p className="text-center font-medium text-gray-600">Loading...</p>
      )}*/}

      {error && (
        <p className="text-center font-semibold text-red-500">
          Sorry, try again :( <span>{error}</span>
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2">
        {people?.map((p) => (
          <li
            key={p.uid}
            className="rounded bg-white p-4 text-center capitalize shadow"
          >
            <span className="font-semibold text-gray-800">{p.name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
