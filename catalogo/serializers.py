from rest_framework import serializers
from .models import Anime


class AnimeSerializer(serializers.ModelSerializer):
    genero = serializers.CharField(source='genero.nombre', read_only=True)
    anio = serializers.IntegerField(source='anio_estreno', read_only=True)
    imagen = serializers.CharField(source='imagen_url', read_only=True)
    calificacion = serializers.FloatField(source='promedio', read_only=True)

    class Meta:
        model = Anime
        fields = ['id', 'titulo', 'sinopsis', 'anio', 'imagen', 'genero', 'calificacion']

class AnimeDetalleSerializer(serializers.ModelSerializer):
    genero = serializers.CharField(source='genero.nombre', read_only=True)
    anio = serializers.IntegerField(source='anio_estreno', read_only=True)
    imagen = serializers.CharField(source='imagen_url', read_only=True)
    calificacion = serializers.FloatField(source='promedio', read_only=True)
    imagenes = serializers.SlugRelatedField(many=True, read_only=True, slug_field='url')

    class Meta:
        model = Anime
        fields = ['id', 'titulo', 'sinopsis', 'anio', 'imagen', 'genero', 'calificacion', 'imagenes']