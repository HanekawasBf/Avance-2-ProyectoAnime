from django.contrib import admin
from .models import Genero, Anime, ImagenAnime


class ImagenInline(admin.TabularInline):
    model = ImagenAnime
    extra = 1


class AnimeAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'genero', 'anio_estreno', 'promedio')
    inlines = [ImagenInline]


admin.site.register(Genero)
admin.site.register(Anime, AnimeAdmin)