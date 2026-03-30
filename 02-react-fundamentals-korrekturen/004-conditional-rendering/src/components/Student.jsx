import Grade from "./Grade.jsx";

export default function Student({ person }) {
  const { picture, firstName, lastName, age, city, course, gpa } = person;

  return (
    <article className="card">
      <img src={picture} alt="" className="card-image" />

      <div className="card-body">
        <h2>
          {firstName} {lastName}
        </h2>
        <p>Age: {age}</p>
        <p>City: {city}</p>
        <p>Course: {course}</p>
        <Grade gpa={gpa} />

        <p>Status: {person.graduate ? "Graduate" : "Student"}</p>
      </div>
    </article>
  );
}
