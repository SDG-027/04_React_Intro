// "props" sind ein Objekt, das alle übergebenen Attribute enthält
function Header(props) {
  const myColor = 'rebeccapurple';

  console.log('Aus der Header Komponente', props);

  return (
    <header>
      <h1
        style={{
          // Styles in React sind Objekte; properties werden camelCase geschrieben
          backgroundColor: myColor,
        }}
        // className ist das HTML-Attribut "class" -> Platz für unsere CSS-Klassen
        className='my-class'
      >
        Willkommen zu {props.library}
      </h1>
    </header>
  );
}

export default Header;
