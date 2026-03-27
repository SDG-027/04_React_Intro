// Import des CSS
import './App.css';
//  Import der einzelnen Komponenten
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Students from './components/Students.jsx';

// Unsere Daten: Die UI ist eine Funktion dieser Daten.
// In echten Anwendungen kommt das von einer API/einem Backend
const students = [
  { id: 1, name: 'Sascha' },
  { id: 2, name: 'Henrique' },
  { id: 3, name: 'Behzad' },
  { id: 4, name: 'Qian' },
  { id: 5, name: 'Roman' },
  { id: 6, name: 'Nikolai' },
];

function App() {
  // Eine React-Komponente ist eine JavaScript-Funktion.
  // Hier oben: Logik (JS-Bereich)
  const library = 'React';

  // Der "return" bestimmt, was im Browser angezeigt wird (JSX).
  return (
    <div>
      {/* React ermöglicht uns, unsere Seite in verschiedene Komponenten (components) zu zerlegen*/}
      {/* und modular aufzurufen */}
      {/* "Props" erlauben uns, Daten in Komponenten hineinzureichen */}
      <Header library={library} yolo={3.14} />

      <main>
        <button type='button'>Click Me!</button>
        {/* In geschweiften Klammern können wir JavaScript ausführen */}
        <p> 42 + 45 = {42 + 45}</p>

        {/* Die gleiche Komponente kann mit verschiedenen Daten (Props) genutzt werden */}
        <Students students={students} />
        <Students
          students={[
            { id: 1, name: 'Fawzi' },
            { id: 2, name: 'Thomas' },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
