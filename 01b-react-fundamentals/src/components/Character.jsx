// Eine Hilfsfunktion außerhalb der Komponente – sie gehört nicht zum UI,
// sondern berechnet nur einen Wert. Das hält die Komponente selbst sauber.
function getVitalsLabel(currHP, maxHp) {
  // Verhältnis von aktuellem HP zu maximalem HP berechnen (Wert zwischen 0 und 1)
  const ratio = currHP / maxHp;

  // Conditional Rendering auf Funktionsebene: Je nach Zustand wird ein anderer
  // Text zurückgegeben. Früh zurückzukehren ("early return") vermeidet else-Ketten.
  if (ratio === 1) return "Uninjured";
  if (ratio >= 0.75) return "Scratched";
  if (ratio >= 0.5) return "Wounded";
  if (ratio >= 0.25) return "Bloodied";
  if (ratio >= 0.01) return "Critical";
  return "Unconscious";
}

export default function Character({ char }) {
  // --- Conditional Rendering: Variante 1 – Early Return ---
  // Eine Komponente kann früh 'null' zurückgeben, um gar nichts zu rendern.
  // React zeigt dann nichts an – nützlich, um Elemente komplett auszublenden.
  // if (char.isUnconscious) {
  //   return null;
  // }

  // --- Conditional Rendering: Variante 2 – Andere JSX-Struktur zurückgeben ---
  // Statt null kann man auch komplett anderes JSX zurückgeben.
  // Die Komponente entscheidet selbst, welches "Aussehen" sie annimmt.
  // if (char.hasInspiration) {
  //   return <h2>{char.name} is inspired</h2>;
  // }

  // Event Handler
  const clickHandler = (e) => {
    console.log("geklickt", e.target);
  };

  return (
    <article
      // --- Conditional Rendering: Variante 3 – Ternary im className ---
      // Mit einem Ternary-Ausdruck (Bedingung ? A : B) wählen wir dynamisch
      // eine CSS-Klasse aus. Template Literals (` `) erlauben den Mix aus
      // festen und bedingten Klassen in einem String.
      className={`border-l-5 px-4 py-2 ${char.isUnconscious ? "border-red-500" : ""} `}
      // weniger flexible Alternative
      // className={char.isUnconscious ? "border-l-5 border-red-500" : "border-l-5 border-green-500"}

      // Event Listener direkt als Props auf das Element
      onClick={clickHandler}
    >
      <p>Character: {char.name} </p>
      <p>Level: {char.level}</p>

      {/* --- Conditional Rendering: Variante 4 – Ternary im JSX ---
          Innerhalb von JSX können wir mit { } JavaScript einbetten.
          Der Ternary gibt je nach Bedingung ein anderes <p>-Element zurück. */}
      {char.isUnconscious ? <p>UNCONSCIOUS</p> : <p>Up and runing!</p>}

      {/* --- Conditional Rendering: Variante 5 – Kurzschluss-Operator (&&) ---
          Wenn char.hasInspiration 'true' ist, wird der rechte Teil gerendert.
          Ist es 'false', rendert React gar nichts. Kürzer als ein Ternary,
          wenn man für den 'false'-Fall nichts anzeigen will. */}
      {char.hasInspiration && <p>inspired</p>}

      {/* Ergebnis der Hilfsfunktion direkt eingebettet – kein Conditional hier,
          die Logik steckt komplett in getVitalsLabel() */}
      <p>{getVitalsLabel(char.hp, char.maxHp)}</p>
    </article>
  );
}
