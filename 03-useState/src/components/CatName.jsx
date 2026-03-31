import { useState } from "react";

export default function CatName({ color, setColor }) {
  const [catName, setCatName] = useState("Neela");
  return (
    <>
      <form>
        <label>
          Cat Name:
          <input
            type="text"
            onChange={(event) => {
              setCatName(event.target.value);
            }}
          />
        </label>
      </form>
      <p
        style={{
          backgroundColor: color,
        }}
        onClick={() => setColor("rebeccapurple")}
      >
        {catName}
      </p>
    </>
  );
}
