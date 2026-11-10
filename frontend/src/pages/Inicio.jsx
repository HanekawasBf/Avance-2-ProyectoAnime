
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MenuFiltros from "../components/MenuFiltros";
import MejoresCalificados from "../components/MejoresCalificados";
import AnimeList from "../components/AnimeList";
import Portada from "../components/Portada";

function Inicio() {
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [genero, setGenero] = useState("Todos");
  const [orden, setOrden] = useState("ninguno");
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );

  const [categoriaAbierta, setCategoriaAbierta] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/animes/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar");
        return res.json();
      })
      .then((datos) => setAnimes(datos))
      .catch(() => setError(true));
  }, []);

  function alternarFavorito(id) {
    let nuevos;

    if (favoritos.includes(id)) {
      nuevos = favoritos.filter((f) => f !== id);
    } else {
      nuevos = [...favoritos, id];
    }

    setFavoritos(nuevos);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
  }

  const mejores = [...animes]
    .filter((a) => a.calificacion > 0)
    .sort((a, b) => b.calificacion - a.calificacion)
    .slice(0, 5);

  const sinFiltros =
    busqueda === "" && genero === "Todos" && !soloFavoritos;

  let lista = animes.filter((a) =>
    a.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (genero !== "Todos") {
    lista = lista.filter((a) => a.genero === genero);
  }

  if (soloFavoritos) {
    lista = lista.filter((a) => favoritos.includes(a.id));
  }

  if (orden === "calificacion") {
    lista.sort((a, b) => b.calificacion - a.calificacion);
  }

  if (orden === "anio") {
    lista.sort((a, b) => b.anio - a.anio);
  }

  const generos = [...new Set(animes.map((a) => a.genero).filter(Boolean))].sort();

  function mostrarCategorias() {
    setCategoriaAbierta(null);
    setBusqueda("");
    setGenero("Todos");
    setSoloFavoritos(false);
  }

  function abrirCategoria(nombre) {
    setCategoriaAbierta(nombre);
    setBusqueda("");
    setSoloFavoritos(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function tarjetaAnime(anime) {
    return (
      <div className="card-wrap" key={anime.id}>
        <Link to={`/anime/${anime.id}`} className="card">
          <Portada src={anime.imagen} titulo={anime.titulo} />

          <div className="card-body">
            <span className="badge">{anime.genero}</span>
            <h3>{anime.titulo}</h3>
            <p className="card-anio">{anime.anio}</p>
            <p className="card-rating">
              <span className="estrellas">★</span>{" "}
              {anime.calificacion || "Sin calificación"}
            </p>
          </div>
        </Link>

        <button
          className="fav-btn"
          onClick={() => alternarFavorito(anime.id)}
          title="Agregar a favoritos"
        >
          {favoritos.includes(anime.id) ? "♥" : "♡"}
        </button>
      </div>
    );
  }

  const estilosCategorias = `
    .categorias-anime {
      margin: 30px 0 45px;
    }

    .categoria-encabezado {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .categoria-encabezado h2 {
      text-align: left;
      margin: 0;
      font-size: 23px;
      color: var(--texto-fuerte);
    }

    .ver-mas {
      background: var(--boton);
      color: var(--texto-fuerte);
      border: 1px solid var(--borde-fuerte);
      border-radius: 7px;
      padding: 9px 15px;
      cursor: pointer;
      font-weight: bold;
      white-space: nowrap;
    }

    .ver-mas:hover {
      background: var(--boton-hover);
    }

    .carrusel-genero {
      display: flex;
      gap: 18px;
      overflow-x: auto;
      padding: 10px 4px 18px;
      scroll-behavior: smooth;
    }

    .carrusel-genero > .card-wrap {
      flex: 0 0 220px;
    }

    .carrusel-genero::-webkit-scrollbar {
      height: 7px;
    }

    .carrusel-genero::-webkit-scrollbar-thumb {
      background: var(--borde-fuerte);
      border-radius: 10px;
    }

    .categoria-completa {
      margin-bottom: 25px;
    }

    .categoria-completa .anime-list {
      margin-top: 20px;
    }

    .categoria-volver {
      background: var(--boton);
      color: var(--texto-fuerte);
      border: 1px solid var(--borde);
      border-radius: 7px;
      padding: 10px 16px;
      cursor: pointer;
      margin-bottom: 20px;
    }

    @media (max-width: 600px) {
      .carrusel-genero > .card-wrap {
        flex-basis: 165px;
      }

      .categoria-encabezado h2 {
        font-size: 19px;
      }
    }
  `;

  return (
    <>
      <style>{estilosCategorias}</style>

      <Navbar onMenu={() => setMenuAbierto(!menuAbierto)} />

      {menuAbierto && (
        <MenuFiltros
          onCerrar={() => setMenuAbierto(false)}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          genero={genero}
          setGenero={setGenero}
          orden={orden}
          setOrden={setOrden}
          soloFavoritos={soloFavoritos}
          setSoloFavoritos={setSoloFavoritos}
        />
      )}

      <main>
        {error && (
          <p className="vacio">
            No se pudo conectar con Django. ¿Está corriendo el servidor?
          </p>
        )}

        {!error && (
          <>
            {categoriaAbierta ? (
              <section className="categoria-completa">
                <button
                  className="categoria-volver"
                  onClick={mostrarCategorias}
                >
                  ← Volver al catálogo
                </button>

                <h2>{categoriaAbierta}</h2>

                <p className="card-anio">
                  Animes disponibles en esta categoría
                </p>

                <AnimeList
                  animes={animes.filter(
                    (a) => a.genero === categoriaAbierta
                  )}
                  favoritos={favoritos}
                  onFavorito={alternarFavorito}
                />
              </section>
            ) : sinFiltros ? (
              <>
                <MejoresCalificados animes={mejores} />

                <h2>Catálogo de animes por géneros</h2>

                {generos.length === 0 ? (
                  <p className="vacio">
                    Todavía no hay géneros registrados.
                  </p>
                ) : (
                  generos.map((nombre) => {
                    const animesGenero = animes.filter(
                      (a) => a.genero === nombre
                    );

                    return (
                      <section className="categorias-anime" key={nombre}>
                        <div className="categoria-encabezado">
                          <h2>{nombre}</h2>

                          <button
                            className="ver-mas"
                            onClick={() => abrirCategoria(nombre)}
                          >
                            Ver más →
                          </button>
                        </div>

                        <div className="carrusel-genero">
                          {animesGenero.map(tarjetaAnime)}
                        </div>
                      </section>
                    );
                  })
                )}
              </>
            ) : (
              <>
                <h2>
                  {soloFavoritos
                    ? "Mis favoritos"
                    : genero !== "Todos"
                    ? genero
                    : "Resultados de búsqueda"}
                </h2>

                {lista.length === 0 && (
                  <p className="vacio">No se encontraron animes.</p>
                )}

                <AnimeList
                  animes={lista}
                  favoritos={favoritos}
                  onFavorito={alternarFavorito}
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Inicio;
