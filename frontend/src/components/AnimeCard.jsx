import { Link } from "react-router-dom";
import Estrellas from "./Estrellas";

function AnimeCard({ anime, esFavorito, onFavorito }) {
  return (
    <div className="card-wrap">
      <button className="fav-btn" onClick={() => onFavorito(anime.id)}>
        {esFavorito ? "♥" : "♡"}
      </button>

      <Link to={`/anime/${anime.id}`} className="card">
        {anime.imagen ? (
          <img src={anime.imagen} alt={anime.titulo} />
        ) : (
          <div className="card-placeholder">{anime.titulo[0]}</div>
        )}
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