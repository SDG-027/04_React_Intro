// useState aus React importieren — ermöglicht uns, State in Funktionskomponenten zu verwenden
import { useState } from 'react';
import LightBulb from './components/LightBulb.jsx';

// limit ist eine Konstante außerhalb der Komponente — sie ändert sich nie und löst kein Re-Render aus
const limit = 10;

function App() {
  // Erster useState-Aufruf: speichert, ob die Lampe an (true) oder aus (false) ist.
  // - 'lightSwitch' ist der aktuelle Wert (startet mit false = aus)
  // - 'setLightSwitch' ist die Funktion, um ihn zu ändern
  const [lightSwitch, setLightSwitch] = useState(false);

  // Zweiter useState-Aufruf: speichert, wie oft die Lampe eingeschaltet wurde.
  // Eine Komponente kann beliebig viele useState-Aufrufe haben — jeder verwaltet seinen eigenen Wert.
  const [count, setCount] = useState(0);

  function handleLightSwitchClick() {
    // Solange das Limit noch nicht erreicht ist, wird der Schalter umgeschaltet (true ↔ false).
    // Die Callback-Form ((l) => !l) liest immer den aktuellsten Wert — sicherer als direkt '!lightSwitch'.
    if (count < limit) {
      setLightSwitch((l) => !l);
    } else {
      // Limit überschritten: Lampe bleibt aus
      setLightSwitch(false);
    }

    // Zähler erhöhen, aber nur wenn die Lampe gerade ausgeschaltet ist (also beim Einschalten).
    // lightSwitch zeigt hier noch den alten Wert — React aktualisiert State erst nach dem Re-Render.
    if (!lightSwitch) {
      setCount((c) => c + 1);
    }
  }

  return (
    <div>
      <h1>React: useState</h1>
      <button
        // Wenn count über dem Limit liegt, wird der Button deaktiviert
        disabled={count > limit}
        onClick={handleLightSwitchClick}
        type="button"
      >
        {/* Beschriftung wechselt je nach aktuellem State */}
        {lightSwitch ? 'Switch off' : 'Switch on'}
      </button>
      <button
        onClick={() => {
          // Reset setzt beide State-Variablen auf ihre Ausgangswerte zurück.
          // React bündelt diese beiden Änderungen in einem einzigen Re-Render.
          setCount(0);
          setLightSwitch(false);
        }}
        type="button"
      >
        Reset
      </button>
      {/* LightBulb bekommt den aktuellen State als Prop übergeben */}
      <LightBulb lightSwitch={lightSwitch} />
    </div>
  );
}

export default App;
