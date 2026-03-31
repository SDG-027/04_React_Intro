function App() {
  return (
    <div>
      <h1>React: useState</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="phone">Phone</label>
        <input type="tel" name="phone" id="phone" />

        <label htmlFor="message">Message</label>
        <textarea name="message" id="message"></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
