// Destructuring { students } zieht die Property direkt aus dem props-Objekt
export default function Students({ students }) {
  // .map() transformiert Daten-Arrays in JSX-Elemente
  return students.map((student) => (
    // 'key' braucht React zum Verwalten von Listen
    <p key={student.id}>
      <span>{student.id}</span> {student.name}
    </p>
  ));
}
