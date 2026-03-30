// Wir importieren die 'Character'-Komponente aus einer eigenen Datei.
// Jede Komponente lebt in ihrer eigenen Datei – das hält den Code übersichtlich.
import Character from "./Character.jsx";

// 'Page' ist eine React-Komponente, die ein Prop namens 'roster' empfängt.
// Props sind Daten, die von einer Eltern-Komponente nach unten weitergegeben werden.
// Hier erwarten wir, dass 'roster' ein Array mit Charakter-Objekten ist.
export default function Page({ roster }) {
  console.log(roster);

  return (
    <main className="mx-auto my-10 flex min-h-full flex-col gap-12 self-center">
      {/* .map() läuft durch jeden Eintrag im 'roster'-Array und gibt eine
          <Character>-Komponente zurück – also eine pro Charakter.
          So wird JSX dynamisch aus Daten generiert, statt hart kodiert zu sein. */}
      {roster.map((character) => (
        // 'key' ist ein spezielles React-Prop: Es hilft React zu erkennen,
        // welches Element sich verändert hat, wenn die Liste neu gerendert wird.
        // Immer eine eindeutige ID nutzen – nie den Array-Index, wenn möglich.
        <Character key={character.id} char={character} />
        //                             ↑
        // Wir übergeben das gesamte Charakter-Objekt als Prop 'char' an die
        // untergeordnete Komponente. Dort kann es dann angezeigt werden.
      ))}
    </main>
  );
}
