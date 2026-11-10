import shutil
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from catalogo.models import Anime


class Command(BaseCommand):
    help = "Copia portadas locales al frontend y las asigna a los animes"

    extensiones = {".jpg", ".jpeg", ".png", ".webp"}

    def add_arguments(self, parser):
        parser.add_argument(
            "directorio",
            nargs="?",
            default="portadas",
            help="Carpeta con imágenes cuyos nombres coinciden con los títulos de anime",
        )

    def handle(self, *args, **options):
        directorio = Path(options["directorio"])
        if not directorio.is_absolute():
            directorio = settings.BASE_DIR / directorio
        if not directorio.is_dir():
            raise FileNotFoundError(f"No existe la carpeta de portadas: {directorio}")

        destino = settings.BASE_DIR / "frontend" / "public" / "portadas"
        destino.mkdir(parents=True, exist_ok=True)

        archivos = {}
        for archivo in sorted(directorio.iterdir()):
            if archivo.is_file() and archivo.suffix.lower() in self.extensiones:
                archivos.setdefault(slugify(archivo.stem), archivo)

        importados = 0
        sin_portada = []
        for anime in Anime.objects.all():
            archivo = archivos.get(slugify(anime.titulo))
            if archivo is None:
                sin_portada.append(anime.titulo)
                continue

            nombre = f"{slugify(anime.titulo)}{archivo.suffix.lower()}"
            shutil.copy2(archivo, destino / nombre)
            ruta = f"/portadas/{nombre}"
            if anime.imagen_url != ruta:
                anime.imagen_url = ruta
                anime.save(update_fields=["imagen_url"])
            importados += 1

        self.stdout.write(self.style.SUCCESS(f"Portadas locales importadas: {importados}"))
        if sin_portada:
            self.stdout.write(
                self.style.WARNING(
                    "Sin archivo local: " + ", ".join(sin_portada)
                )
            )
