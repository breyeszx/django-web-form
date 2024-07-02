from django.db import models

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    costo = models.DecimalField(max_digits=10, decimal_places=2)
    duracion = models.IntegerField(help_text="Duración en minutos")
    requisitos = models.BooleanField(default=False)
    disponibilidad = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
