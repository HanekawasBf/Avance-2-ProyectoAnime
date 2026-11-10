from django.urls import path
from . import views

urlpatterns = [
    path('animes/<int:anime_id>/resenas/', views.lista_resenas),
]