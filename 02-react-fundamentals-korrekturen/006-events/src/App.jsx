function handleSubmit(e) {
  e.preventDefault();
  const { age, color, name, recommended, submit } = e.target.elements;
  console.log({ age, color, name, recommended, submit });
  try {
    submit.disabled = true;
    if (!name.value) throw new Error("Name is required");
    if (!age.value) throw new Error("Age is required");
    if (!color.value) throw new Error("Color is required");

    // fake POST REQUEST
    console.log({
      name: name.value,
      age: age.value,
      color: color.value,
      recommended: recommended.value,
    });
    e.target.reset();
  } catch (error) {
    alert(error.message);
  } finally {
    submit.disabled = false;
  }
}

function App() {
  return (
    <div className="app">
      <h1 onDoubleClick={() => alert("Ich bin kitzelig")}>Event Listener</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" />
        </label>

        <label>
          Age: <input type="text" name="age" inputMode="numeric" pattern="[0-9]*" />
        </label>

        <label>
          Favorite Color
          <select name="color">
            <option value="" disabled>
              -- Pick a Color --
            </option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="blue">Blue</option>
          </select>
        </label>

        <label
          style={{
            display: "flex",
            justifyContent: "start",
            marginBlock: "1rem",
          }}
        >
          <input type="checkbox" name="recommended" />{" "}
          <span style={{ textWrap: "nowrap" }}>I would recommend this site</span>
        </label>

        <button type="submit" name="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
