import { useState, useEffect } from 'react';

export default function FetchOnClick() {
  const [people, setPeople] = useState(null);
  const [nextURL, setNextURL] = useState(null);
  const [previousURL, setPreviousURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetchSWAPI ist hier eine ganz normale async-Funktion auf Komponentenebene —
  // kein State als Auslöser.
  // Sie nimmt die URL direkt als Argument entgegen und kann dadurch
  // sowohl beim initialen Load als auch bei Button-Klicks wiederverwendet werden.
  async function fetchSWAPI(url) {
    try {
      // loading wird hier auf true gesetzt, damit auch bei Folge-Fetches
      // (Next/Previous) der Ladeindikator erscheint.
      setLoading(true);

      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();

      setPeople(data.results);
      setNextURL(data.next);
      setPreviousURL(data.previous);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // useEffect nur für den initialen Fetch beim ersten Render (leeres Dependency Array).
  // Best Practice: useEffect sollte nicht auf User-Interaktionen reagieren —
  // für Klicks rufen wir fetchSWAPI direkt auf (siehe Buttons unten).
  //
  // React 19 verlangt fetchSWAPI nicht mehr im Dependency Array,
  // weil es die Funktion als stabil erkennt. Früher wäre hier useCallback nötig gewesen,
  // damit der Linter nicht warnt und keine unnötigen Neu-Renders entstehen.
  useEffect(() => {
    fetchSWAPI('https://swapi.tech/api/people');
  }, []); // ← leeres Array = "läuft genau einmal, wenn die Komponente das erste Mal erscheint"

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
          // Klick → fetchSWAPI direkt aufrufen, URL als Argument übergeben.
          // Kein State-Update als Umweg, kein useEffect als Reaktion darauf.
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
