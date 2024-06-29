from django import forms
from .models import Trabajador, Sexo, Comuna

class TrabajadorForm(forms.ModelForm):

    class Meta:
        model = Trabajador
        fields = ['nombre', 'rut', 'dv', 'telefono', 'direccion', 'idComuna', 'profesion', 'idSexo', 'ocupacion', 'puesto']

idComuna = forms.ModelChoiceField(queryset=Comuna.objects.all(), empty_label="Seleccione una Comuna")
idSexo = forms.ModelChoiceField(queryset=Sexo.objects.all(), empty_label="Seleccione un sexo")


