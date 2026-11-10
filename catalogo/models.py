from django.db import models


class Genero(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Anime(models.Model):
    titulo = models.CharField(max_length=150)
    sinopsis = models.TextField()
    anio_estreno = models.IntegerField()
    imagen_url = models.CharField(max_length=500, blank=True)
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo

    def promedio(self):
        resenas = self.resena_set.all()
        if not resenas:
            return 0
        return round(sum(r.calificacion for r in resenas) / len(resenas), 1)

class ImagenAnime(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='imagenes')
    url = models.URLField()

    def __str__(self):
        return f"Imagen de {self.anime.titulo}"