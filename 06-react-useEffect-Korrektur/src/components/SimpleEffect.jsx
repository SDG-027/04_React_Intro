// useState und useEffect werden aus React importiert
import { useState, useEffect } from 'react';

export default function SimpleEffect() {
  // 'people' speichert das Array der geladenen Charaktere (null = noch nicht geladen)
  const [people, setPeople] = useState(null);

  // Diese beiden States speichern die URLs für die nächste und vorherige Seite —
  // die API liefert sie direkt im Response-Objekt mit.
  const [nextURL, setNextURL] = useState(null);
  const [previousURL, setPreviousURL] = useState(null);

  // 'currentURL' ist der eigentliche "Auslöser" für den Fetch.
  // Wenn der User auf Next/Previous klickt, ändert sich diese URL —
  // und der useEffect reagiert darauf automatisch.
  const [currentURL, setCurrentURL] = useState('https://swapi.tech/api/people');

  // Ladeindikator: true = Anfrage läuft noch, false = fertig (Erfolg oder Fehler)
  const [loading, setLoading] = useState(true);

  // Fehlermeldung: null = kein Fehler, sonst der Fehlertext als String
  const [error, setError] = useState(null);

  // useEffect führt den Code darin aus, wenn die Komponente mountet
  // und jedes Mal erneut, wenn sich 'currentURL' ändert (Dependency Array unten).
  useEffect(() => {
    // Wir definieren eine async-Funktion innerhalb des Effekts —
    // useEffect selbst darf nicht async sein, daher dieser Wrapper.
    async function fetchSWAPI() {
      try {
        const res = await fetch(currentURL);

        // Wenn der Server antwortet, aber mit einem Fehlercode (z.B. 404, 500),
        // ist res.ok === false. Wir werfen dann manuell einen Error.
        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();

        // State-Updates: React bündelt diese und löst danach einen einzigen Re-render aus.
        setPeople(data.results); // Array der Charaktere auf der aktuellen Seite
        setNextURL(data.next); // URL der nächsten Seite (oder null, wenn es keine gibt)
        setPreviousURL(data.previous); // URL der vorherigen Seite (oder null)
      } catch (error) {
        // Falls fetch() selbst fehlschlägt (z.B. kein Internet)
        // oder wir oben einen Error geworfen haben, landet er hier.
        setError(error.message);
      } finally {
        // 'finally' läuft immer — egal ob Erfolg oder Fehler.
        // Wir setzen loading auf false, damit der Ladeindikator verschwindet.
        setLoading(false);
      }
    }

    // Die Funktion wird direkt nach der Definition aufgerufen.
    fetchSWAPI();
  }, [currentURL]);
  // ↑ Dependency Array: Dieser Effekt läuft neu, sobald sich 'currentURL' ändert.
  //   Klickt der User auf Next/Previous, setzt onClick eine neue URL → Effekt feuert → neuer Fetch.

  // Early Return: Solange der erste Fetch läuft, zeigen wir nur den Ladetext.
  // (Nach dem ersten Load wird loading nicht mehr auf true zurückgesetzt —
  //  das auskommentierte {loading && ...} unten im JSX wäre eine Alternative dafür.)
  if (loading) {
    return <p className="text-center font-medium text-gray-600">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-800 p-8 font-sans">
      <h1 className="text-center text-3xl font-bold text-gray-300">
        Star Wars Characters | Fetch on Click
      </h1>

      <div className="flex justify-center gap-4 pt-6">
        {/* previousURL ist null auf der ersten Seite — der Button erscheint nur, wenn ein Wert da ist */}
        {previousURL && (
          <button onClick={() => setCurrentURL(previousURL)} type="button">
            Previous
          </button>
        )}
        {/* nextURL ist null auf der letzten Seite */}
        {nextURL && (
          <button onClick={() => setCurrentURL(nextURL)} type="button">
            Next
          </button>
        )}
      </div>

      {/* Fehlermeldung erscheint nur, wenn error einen Wert hat (nicht null) */}
      {error && (
        <p className="text-center font-semibold text-red-500">
          Sorry, try again :( <span>{error}</span>
        </p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {/* Optional Chaining (?.) schützt davor, dass .map() auf null aufgerufen wird,
            falls people noch nicht gesetzt ist */}
        {people?.map((p) => (
          // 'key' braucht React intern, um die Liste effizient zu aktualisieren.
          // Wir verwenden p.uid, da das ein stabiler, eindeutiger Wert aus der API ist.
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
