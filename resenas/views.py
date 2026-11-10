from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from catalogo.models import Anime
from .models import Resena
from .serializers import ResenaSerializer


@api_view(['GET', 'POST'])
def lista_resenas(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id)

    if request.method == 'GET':
        resenas = Resena.objects.filter(anime=anime).order_by('-fecha')
        serializer = ResenaSerializer(resenas, many=True)
        return Response(serializer.data)

    serializer = ResenaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(anime=anime)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)