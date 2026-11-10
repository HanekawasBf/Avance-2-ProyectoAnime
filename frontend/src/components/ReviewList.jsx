import { useState, useEffect } from "react";
import Estrellas from "./Estrellas";

function ReviewList({ animeId, onGuardada }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [autor, setAutor] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const url = `http://127.0.0.1:8000/api/animes/${animeId}/resenas/`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((datos) => {
        setResenas(datos);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [animeId]);

  async function enviar(e) {
    e.preventDefault();
    setMensaje("");

    try {
      const respuesta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autor: autor,
          calificacion: Number(calificacion),
          comentario: comentario,
        }),
      });

      if (respuesta.ok) {
        const nueva = await respuesta.json();
        setResenas([nueva, ...resenas]);
        setAutor("");
        setCalificacion("");
        setComentario("");
        onGuardada();
      } else {
        setMensaje("No se pudo guardar. Revisa que la calificación esté entre 1 y 10.");
      }
    } catch {
      setMensaje("No se pudo conectar con Django.");
    }
  }

  return (
    <div className="resenas">
      <h4>Reseñas ({resenas.length})</h4>

      <form className="resena-form" onSubmit={enviar}>
        <input
          type="text"
          placeholder="Tu nombre"
          maxLength={80}
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Calificación (1 a 10)"
          min="1"
          max="10"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          required
        />
        <textarea
          placeholder="Escribe tu reseña"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
        {mensaje && <p className="resena-error">{mensaje}</p>}
        <button type="submit">Publicar reseña</button>
      </form>

      {cargando && <p className="resena-vacio">Cargando reseñas...</p>}
      {!cargando && resenas.length === 0 && (
        <p className="resena-vacio">Aún no hay reseñas. ¡Sé el primero!</p>
      )}

      {resenas.map((r) => (
        <div key={r.id} className="resena">
          <p className="resena-autor">{r.autor} · <Estrellas valor={r.calificacion} /></p>
          <p className="resena-comentario">{r.comentario}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;