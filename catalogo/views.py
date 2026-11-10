
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Anime, Genero
from .serializers import AnimeSerializer, AnimeDetalleSerializer


# Página principal del catálogo
def pagina_catalogo(request):
    return render(request, 'catalogo/catalogo.html')


# Lista de todos los animes
@api_view(['GET'])
def lista_animes(request):
    animes = Anime.objects.all()
    serializer = AnimeSerializer(animes, many=True)
    return Response(serializer.data)


# Detalles de un anime
@api_view(['GET'])
def detalle_anime(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id)
    serializer = AnimeDetalleSerializer(anime)
    return Response(serializer.data)


# Lista de géneros
@api_view(['GET'])
def lista_generos(request):
    generos = Genero.objects.all().order_by('nombre')
    nombres = [g.nombre for g in generos]
    return Response(nombres)


# Animes de una categoría específica
@api_view(['GET'])
def animes_por_genero(request, genero_id):
    genero = get_object_or_404(Genero, id=genero_id)
    animes = Anime.objects.filter(genero=genero)
    serializer = AnimeSerializer(animes, many=True)

    return Response({
        'genero': genero.nombre,
        'animes': serializer.data
    })
