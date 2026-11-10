import AnimeCard from "./AnimeCard";

function AnimeList({ animes, favoritos, onFavorito }) {
  return (
    <div className="anime-list">
      {animes.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          esFavorito={favoritos.includes(anime.id)}
          onFavorito={onFavorito}
        />
      ))}
    </div>
  );
}

export default AnimeList;