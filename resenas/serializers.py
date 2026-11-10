from rest_framework import serializers
from .models import Resena


class ResenaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resena
        fields = ['id', 'autor', 'calificacion', 'comentario', 'fecha']

    def validate_calificacion(self, valor):
        if valor < 1 or valor > 10:
            raise serializers.ValidationError("La calificación debe estar entre 1 y 10.")
        return valor