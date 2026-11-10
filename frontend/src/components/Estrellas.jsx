function Estrellas({ valor }) {
  const llenas = Math.round(valor / 2);
  let texto = "";

  for (let i = 1; i <= 5; i++) {
    texto += i <= llenas ? "★" : "☆";
  }

  return (
    <span className="estrellas">
      {texto} <span className="estrellas-num">{valor}/10</span>
    </span>
  );
}

export default Estrellas;