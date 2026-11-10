
from django.urls import path
from . import views

urlpatterns = [
    # Página principal del catálogo
    path('', views.pagina_catalogo, name='pagina_catalogo'),

    # Lista de animes
    path('animes/', views.lista_animes, name='lista_animes'),

    # Detalles de cada anime
    path('animes/<int:anime_id>/', views.detalle_anime, name='detalle_anime'),

    # Lista de géneros
    path('generos/', views.lista_generos, name='lista_generos'),

    # Animes organizados por género
    path('generos/<int:genero_id>/', views.animes_por_genero, name='animes_por_genero'),
]
