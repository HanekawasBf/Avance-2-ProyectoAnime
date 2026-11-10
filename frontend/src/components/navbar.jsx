import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ onMenu }) {
  const [claro, setClaro] = useState(localStorage.getItem("tema") === "claro");

  useEffect(() => {
    document.body.classList.toggle("claro", claro);
    localStorage.setItem("tema", claro ? "claro" : "oscuro");
  }, [claro]);

  return (
    <header className="navbar">
      {onMenu && <button className="menu-btn" onClick={onMenu}>☰</button>}
      <button className="tema-btn" onClick={() => setClaro(!claro)}>
        {claro ? "🌙" : "☀️"}
      </button>
      <Link to="/" className="navbar-link">
        <h1>AnimeCatálogo</h1>
      </Link>
      <p>Tus series favoritas con reseñas.</p>
    </header>
  );
}

export default Navbar;