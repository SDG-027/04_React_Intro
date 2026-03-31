// useState wird aus React importiert — dieser Hook ermöglicht es Komponenten,
// sich Werte zu "merken" und bei Änderungen automatisch neu zu rendern.
import { useState } from "react";
import CatName from "./components/CatName.jsx";

function App() {
  // useState(0) legt einen State-Wert namens 'count' an, der mit 0 startet.
  // - 'count'    → der aktuelle Wert (lesend)
  // - 'setCount' → die Funktion, mit der wir den Wert ändern
  // Direkte Zuweisung (count = 5) ist nicht möglich — Veränderung immer über setCount()
  const [count, setCount] = useState(0);

  // Zweiter State für die Farbe. Startwert ist Schwarz.
  const [color, setColor] = useState("#000");

  return (
    <>
      <h1
        style={{
          // State kann für alles mögliche verwendet werden. Text Content,
          // aber auch für die Werte von Attributen oder für das Konditionale Rendern
          // Ändert sich 'color', rendert React die Komponente neu und die Farbe aktualisiert sich.
          backgroundColor: color,
        }}
      >
        React useState
      </h1>

      {/* Zeigt den aktuellen Wert von 'count' an.
          React aktualisiert diese Stelle automatisch, sobald sich der State ändert. */}
      <p>Count: {count}</p>

      <button
        type="button"
        onClick={() => {
          // Direktes setzen von state
          setColor("red");
          // Update-Funktionen
          // React batcht (bündelt) mehrere setState-Aufrufe in einem Event-Handler.
          // Mit der Funktions-Form (previousCount => ...) arbeitet jeder Aufruf
          // garantiert mit dem *aktuellsten* Zwischenwert — nicht mit dem Snapshot.
          setCount((previousCount) => previousCount + 1);
          setCount((previousCount) => previousCount + 1);
          setCount((previousCount) => previousCount + 1);
          // Ergebnis: count wird um 3 erhöht, weil jede Funktion auf dem Ergebnis
          // der vorherigen aufbaut.

          // AUSKOMMENTIERTES GEGENBEISPIEL (nicht die Funktions-Form):
          // setCount(count + 1);
          // setCount(count + 1);
          // Hier würde count nur um 1 steigen, weil beide Aufrufe denselben
          // 'count'-Snapshot aus dem aktuellen Render verwenden.

          // Der console.log zeigt noch den ALTEN State-Wert!
          // State-Updates werden erst nach dem Re-Render sichtbar.
          console.log("Current count:", count); // noch vorherige State
        }}
      >
        Count up!
      </button>

      <form>
        {/* Bei jeder Farbauswahl feuert onChange,
            und wir übergeben den neuen Hex-Wert direkt an setColor. */}
        <input type="color" onChange={(e) => setColor(e.target.value)} />
      </form>

      {/* Die CatName-Komponente bekommt 'color' und 'setColor' als Props übergeben.
          So kann ein Kind-Element den State der Eltern-Komponente lesen und verändern.
          Wenn sich der übergebene State ändert, wird auch die Kindkomponente 
          neu gerendert
          */}
      <CatName color={color} setColor={setColor} />
    </>
  );
}

export default App;
