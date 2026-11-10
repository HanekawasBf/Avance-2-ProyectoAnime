
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Catálogo de animes
    path('api/', include('catalogo.urls')),

    # Reseñas de animes
    path('api/', include('resenas.urls')),
]
