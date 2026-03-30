import Header from "./components/Header.jsx";
import Page from "./components/Page.jsx";
import { roster } from "./data/index.js"; // simuliert hier nur Daten von Außen

function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-linear-to-tr from-mist-950 to-mist-900 font-mono text-slate-100">
      {/* Layout */}
      <Header />

      <Page roster={roster} stegosaurus="cool" />

      <footer></footer>
    </div>
  );
}

export default App;
