import { useState } from 'react';

function App() {
  // Auskommentierte Alternative: ein eigener State pro Feld.
  // Bei vielen Feldern wird das schnell unübersichtlich.
  // const [name, setName] = useState('');

  // Stattdessen: ein State-Objekt für die gesamte Form.
  // Alle Felder sitzen zusammen — übersichtlicher und leichter erweiterbar.
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Separates State-Objekt für Fehlermeldungen, strukturell identisch zu formState.
  // So lässt sich jede Fehlermeldung direkt dem passenden Feld zuordnen.
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  return (
    <div>
      <h1>React: useState</h1>
      <form
        onSubmit={(e) => {
          // (Kann auch in eigene Funktion innerhalb der Komponente ausgelagert werden)
          e.preventDefault();

          // Lokale Variable, um zu merken ob es mindestens einen Fehler gibt
          let errors = false;

          // Pflichtfeld-Validierung: fehlende Felder setzen errors = true
          // und schreiben eine Fehlermeldung gezielt ins errors-State-Objekt.
          // Die Callback-Form (...e) => ({ ...e, name: '...' }) ist wichtig:
          // Sie liest den aktuellen State und überschreibt nur das eine Feld,
          // alle anderen Fehlermeldungen bleiben erhalten (Spread-Operator).
          if (!formState.name) {
            errors = true;
            setErrors((e) => ({ ...e, name: 'Name is required' }));
          }
          if (!formState.email) {
            errors = true;
            setErrors((e) => ({ ...e, email: 'Email is required' }));
          }
          if (!formState.message) {
            errors = true;
            setErrors((e) => ({ ...e, message: 'Message is required' }));
          }

          // Gab es Fehler, abbrechen — das Formular wird nicht abgeschickt
          if (errors) return;

          // Bei Erfolg: Daten verschicken und States zurücksetzen
          console.log('SUBMITTING:', formState);

          setErrors({
            name: '',
            email: '',
            phone: '',
            message: '',
          });
          setFormState({
            name: '',
            email: '',
            phone: '',
            message: '',
          });
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <br />
          {/*
            value={formState.name} macht dieses Input zu einem "controlled input":
            React kontrolliert den angezeigten Wert — er kommt immer aus dem State.
            Ohne value wäre es "uncontrolled" und der Browser würde den Wert selbst verwalten.
          */}
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={(e) =>
              // Bei jeder Tastatureingabe: neuen Wert aus dem Input lesen (e.target.value)
              // und nur das 'name'-Feld im State-Objekt aktualisieren.
              // ...prev kopiert alle anderen Felder unverändert mit.
              setFormState((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          {/* Fehlermeldung nur anzeigen, wenn errors.name einen nicht-leeren String enthält */}
          {errors.name && (
            <p style={{ color: 'red', fontSize: '0.75rem' }}>{errors.name}</p>
          )}
        </div>

        {/* Email, Phone und Message folgen demselben Muster wie Name oben */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={(e) =>
            setFormState((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        {errors.email && (
          <p style={{ color: 'red', fontSize: '0.75rem' }}>{errors.email}</p>
        )}

        <label htmlFor="phone">Phone</label>
        {/* Phone ist kein Pflichtfeld — kein Fehler-State und keine Fehlermeldung */}
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formState.phone}
          onChange={(e) =>
            setFormState((prev) => {
              return { ...prev, phone: e.target.value };
            })
          }
        />

        <label htmlFor="message">Message</label>
        {/* textarea funktioniert genauso wie input — value + onChange für controlled behavior */}
        <textarea
          name="message"
          id="message"
          value={formState.message}
          onChange={(e) =>
            setFormState((prev) => {
              return { ...prev, message: e.target.value };
            })
          }
        ></textarea>
        {errors.message && (
          <p style={{ color: 'red', fontSize: '0.75rem' }}>{errors.message}</p>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
