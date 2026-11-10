
import json
from pathlib import Path

from django.core.management.base import BaseCommand
from catalogo.models import Anime, Genero


class Command(BaseCommand):
    help = 'Importar animes desde animes.json'

    def handle(self, *args, **kwargs):
        archivo = Path(__file__).resolve().parents[3] / 'animes.json'

        with open(archivo, 'r', encoding='utf-8') as f:
            datos = json.load(f)

        for item in datos:
            genero, creado = Genero.objects.get_or_create(
                nombre=item['genero']
            )

            Anime.objects.update_or_create(
                titulo=item['titulo'],
                defaults={
                    'sinopsis': item['sinopsis'],
                    'anio_estreno': item['anio'],
                    'genero': genero,
                }
            )

        self.stdout.write(
            self.style.SUCCESS(
                f'Se importaron {len(datos)} animes correctamente.'
            )
        )
