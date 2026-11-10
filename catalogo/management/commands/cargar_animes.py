import json
from django.core.management.base import BaseCommand
from catalogo.models import Genero, Anime, ImagenAnime


class Command(BaseCommand):
    help = "Carga animes desde un archivo JSON"

    def add_arguments(self, parser):
        parser.add_argument("archivo", nargs="?", default="animes.json")

    def handle(self, *args, **options):
        with open(options["archivo"], encoding="utf-8") as f:
            datos = json.load(f)

        creados = 0
        for item in datos:
            genero, _ = Genero.objects.get_or_create(nombre=item["genero"])

            anime, nuevo = Anime.objects.get_or_create(
                titulo=item["titulo"],
                defaults={
                    "sinopsis": item["sinopsis"],
                    "anio_estreno": item["anio"],
                    "imagen_url": item.get("imagen", ""),
                    "genero": genero,
                },
            )

            if nuevo:
                creados += 1
                for url in item.get("imagenes", []):
                    ImagenAnime.objects.create(anime=anime, url=url)

        self.stdout.write(self.style.SUCCESS(f"Listo: {creados} animes nuevos."))