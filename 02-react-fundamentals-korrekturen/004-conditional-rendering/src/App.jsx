import Student from "./components/Student.jsx";

const studentData = {
  firstName: "Testy",
  lastName: "McTest",
  age: 42,
  course: "Web Development",
  city: "Berlin",
  picture: "https://randomuser.me/api/portraits/men/1.jpg",
  gpa: 94,
  graduate: true,
};

function App() {
  return (
    <>
      <Student person={studentData} />
    </>
  );
}

export default App;
