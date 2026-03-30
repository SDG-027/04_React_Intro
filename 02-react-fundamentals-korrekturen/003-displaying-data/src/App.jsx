import Student from "./components/Student.jsx";

const studentData = {
  id: 1,
  firstName: "Testy",
  lastName: "McTest",
  age: 42,
  course: "Web Development",
  city: "Berlin",
  picture: "https://randomuser.me/api/portraits/men/1.jpg",
};

function App() {
  return (
    <>
      <Student person={studentData} />
    </>
  );
}

export default App;
