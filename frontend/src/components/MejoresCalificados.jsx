import { Link } from "react-router-dom";
import Estrellas from "./Estrellas";
import Portada from "./Portada";

function MejoresCalificados({ animes }) {
  if (animes.length === 0) return null;

  return (
    <section className="top">
      <h2>Mejor calificados</h2>
      <div className="top-fila">
        {animes.map((anime, i) => (
          <Link key={anime.id} to={`/anime/${anime.id}`} className="top-item">
            <span className="top-pos">{i + 1}</span>
            <Portada
              src={anime.imagen}
              titulo={anime.titulo}
              placeholderClassName="top-placeholder"
            />
            <p className="top-titulo">{anime.titulo}</p>
            <Estrellas valor={anime.calificacion} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MejoresCalificados;