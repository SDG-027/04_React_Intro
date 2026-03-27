function Footer() {
  // Komponenten berechnen ihre UI oft dynamisch
  const date = new Date();
  const year = date.getFullYear();

  return <footer>&copy; {year}</footer>;
}

export default Footer;
