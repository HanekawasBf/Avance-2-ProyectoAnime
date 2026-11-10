import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReviewList from "../components/ReviewList";
import Estrellas from "../components/Estrellas";
import Portada from "../components/Portada";

function AnimeDetalle() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState(false);

  function cargarAnime() {
    fetch(`http://127.0.0.1:8000/api/animes/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then((datos) => setAnime(datos))
      .catch(() => setError(true));
  }

  useEffect(() => {
    cargarAnime();
  }, [id]);

  return (
    <>
      <Navbar />
      <main>
        <Link to="/" className="volver">← Volver al catálogo</Link>

        {error && <p className="vacio">No se encontró este anime.</p>}
        {!error && !anime && <p className="vacio">Cargando...</p>}

        {anime && (
          <>
            <div className="detalle-top">
              <Portada
                className="detalle-portada"
                placeholderClassName="detalle-portada card-placeholder"
                src={anime.imagen}
                titulo={anime.titulo}
              />
              <div className="detalle-info">
                <span className="badge">{anime.genero}</span>
                <h2>{anime.titulo}</h2>
                <p className="card-anio">Estreno: {anime.anio}</p>
                <p className="card-rating"><Estrellas valor={anime.calificacion} /></p>
                <h3>Sinopsis</h3>
                <p className="card-sinopsis">{anime.sinopsis}</p>
              </div>
            </div>

            {anime.imagenes.length > 0 && (
              <>
                <h3>Imágenes</h3>
                <div className="galeria">
                  {anime.imagenes.map((url) => (
                    <Portada
                      key={url}
                      className="galeria-portada"
                      placeholderClassName="galeria-portada-placeholder"
                      src={url}
                      titulo={anime.titulo}
                    />
                  ))}
                </div>
              </>
            )}

            <ReviewList animeId={anime.id} onGuardada={cargarAnime} />
          </>
        )}
      </main>
    </>
  );
}

export default AnimeDetalle;