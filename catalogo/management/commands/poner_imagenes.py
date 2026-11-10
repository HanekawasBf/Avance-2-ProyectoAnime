
import json
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.core.management.base import BaseCommand
from catalogo.models import Anime


class Command(BaseCommand):
    help = "Busca y asigna portadas a los animes"

    def handle(self, *args, **kwargs):
        animes = Anime.objects.all()

        for anime in animes:
            if anime.imagen_url.startswith("/portadas/"):
                self.stdout.write(f"Se conserva la portada local: {anime.titulo}")
                continue

            try:
                parametros = urlencode({
                    "q": anime.titulo,
                    "limit": 1
                })

                url = f"https://api.tenrai.org/v1/anime?{parametros}"

                solicitud = Request(
                    url,
                    headers={"User-Agent": "CatalogoAnime/1.0"}
                )

                with urlopen(solicitud, timeout=20) as respuesta:
                    datos = json.loads(respuesta.read().decode("utf-8"))

                resultados = datos.get("data", [])

                if resultados:
                    imagenes = resultados[0].get("images", {})

                    webp = imagenes.get("webp", {})
                    jpg = imagenes.get("jpg", {})

                    imagen = (
                        webp.get("large_image_url")
                        or webp.get("image_url")
                        or jpg.get("large_image_url")
                        or jpg.get("image_url")
                    )

                    if imagen:
                        anime.imagen_url = imagen
                        anime.save(update_fields=["imagen_url"])
                        self.stdout.write(
                            self.style.SUCCESS(f"Imagen agregada: {anime.titulo}")
                        )
                    else:
                        self.stdout.write(f"Sin imagen: {anime.titulo}")
                else:
                    self.stdout.write(f"No encontrado: {anime.titulo}")

                time.sleep(0.35)

            except Exception as error:
                self.stdout.write(
                    self.style.ERROR(f"Error con {anime.titulo}: {error}")
                )

        self.stdout.write(self.style.SUCCESS("Proceso terminado."))
