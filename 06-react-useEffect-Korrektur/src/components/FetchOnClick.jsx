import { useState, useEffect } from 'react';

export default function FetchOnClick() {
  const [people, setPeople] = useState(null);
  const [nextURL, setNextURL] = useState(null);
  const [previousURL, setPreviousURL] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchSWAPI(url) {
    try {
      const res = await fetch(url);
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

  useEffect(() => {
    fetchSWAPI('https://swapi.tech/api/people');
  }, []);

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
          <button onClick={() => fetchSWAPI(previousURL)} type="button">
            Previous
          </button>
        )}
        {nextURL && (
          <button onClick={() => fetchSWAPI(nextURL)} type="button">
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
