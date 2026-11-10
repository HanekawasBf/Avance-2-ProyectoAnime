import { useState } from "react";

function Portada({
  src,
  titulo,
  className,
  placeholderClassName = "card-placeholder",
}) {
  const [srcConError, setSrcConError] = useState(null);

  if (!src || srcConError === src) {
    return <div className={placeholderClassName}>{titulo?.[0] || "A"}</div>;
  }

  return (
    <img
      className={className}
      src={src}
      alt={titulo}
      onError={() => setSrcConError(src)}
    />
  );
}

export default Portada;
