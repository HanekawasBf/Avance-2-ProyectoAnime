import { Link } from "react-router-dom";
import Estrellas from "./Estrellas";
import Portada from "./Portada";

function AnimeCard({ anime, esFavorito, onFavorito }) {
  return (
    <div className="card-wrap">
      <button className="fav-btn" onClick={() => onFavorito(anime.id)}>
        {esFavorito ? "♥" : "♡"}
      </button>

      <Link to={`/anime/${anime.id}`} className="card">
        <Portada src={anime.imagen} titulo={anime.titulo} />
        <div className="card-body">
          <span className="badge">{anime.genero}</span>
          <h3>{anime.titulo}</h3>
          <p className="card-anio">Estreno: {anime.anio}</p>
          <p className="card-rating"><Estrellas valor={anime.calificacion} /></p>
          <p className="card-hint">Ver detalles →</p>
        </div>
      </Link>
    </div>
  );
}

export default AnimeCard;