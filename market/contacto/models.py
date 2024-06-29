from django.db import models

class Sexo(models.Model):
    idSexo = models.AutoField(db_column='id_sexo', primary_key=True, null=False, blank=False)
    sexo = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return str(self.sexo)

class Comuna(models.Model):
    id_comuna = models.AutoField(db_column='id_comuna', primary_key=True, null=False, blank=False)
    comuna = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return str(self.comuna)

class Trabajador(models.Model):
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12, unique=True)
    dv = models.CharField(max_length=1)
    telefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=255)
    idComuna = models.ForeignKey(Comuna, on_delete=models.CASCADE, db_column='id_comuna')
    profesion = models.CharField(max_length=100)
    idSexo = models.ForeignKey(Sexo, on_delete=models.CASCADE, db_column='id_sexo')
    ocupacion = models.CharField(max_length=100)
    puesto = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
