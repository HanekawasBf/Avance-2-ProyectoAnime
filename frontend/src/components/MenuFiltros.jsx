import { useState, useEffect } from "react";

function MenuFiltros({
  onCerrar,
  busqueda,
  setBusqueda,
  genero,
  setGenero,
  orden,
  setOrden,
  soloFavoritos,
  setSoloFavoritos,
}) {
  const [generos, setGeneros] = useState(["Todos"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/generos/")
      .then((res) => res.json())
      .then((datos) => setGeneros(["Todos", ...datos]))
      .catch(() => {});
  }, []);

  function limpiar() {
    setBusqueda("");
    setGenero("Todos");
    setOrden("ninguno");
    setSoloFavoritos(false);
  }

  return (
    <aside className="panel">
      <div className="panel-top">
        <h2>Filtros</h2>
        <button className="panel-close" onClick={onCerrar}>✕</button>
      </div>

      <label>Buscar por título</label>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Ej: Death Note"
      />

      <label>Género</label>
      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        {generos.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <label>Ordenar por</label>
      <select value={orden} onChange={(e) => setOrden(e.target.value)}>
        <option value="ninguno">Sin ordenar</option>
        <option value="calificacion">Mejor calificación</option>
        <option value="anio">Más reciente</option>
      </select>

      <label className="check">
        <input
          type="checkbox"
          checked={soloFavoritos}
          onChange={(e) => setSoloFavoritos(e.target.checked)}
        />
        Solo favoritos
      </label>

      <button className="panel-clear" onClick={limpiar}>Limpiar filtros</button>
    </aside>
  );
}

export default MenuFiltros;