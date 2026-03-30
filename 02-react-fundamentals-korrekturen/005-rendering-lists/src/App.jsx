import students from "./data/students.js";

import Student from "./components/Student.jsx";

function App() {
  return (
    <div className="container">
      {/* <Student person={students[7]} />
      <Student person={students[3]} />
      <Student person={students[5]} /> */}

      {students.map((s) => (
        <Student key={s.id} person={s} />
      ))}
    </div>
  );
}

export default App;
