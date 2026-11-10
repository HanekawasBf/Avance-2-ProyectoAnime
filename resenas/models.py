from django.db import models
from catalogo.models import Anime


class Resena(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE) #si se borra un anime tambien sus resenas
    autor = models.CharField(max_length=80)
    calificacion = models.IntegerField()  # de 1 a 10
    comentario = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.autor} - {self.anime.titulo}"