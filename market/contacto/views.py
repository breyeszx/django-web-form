from django.db import transaction
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import TrabajadorForm
from django.db import transaction, IntegrityError
from django.urls import reverse

def index(request):
    return render(request, 'contacto/index.html')

def registro_view(request):
    if request.method == 'POST':
        form = TrabajadorForm(request.POST)
        if form.is_valid():
            try:
                with transaction.atomic():
                    form.save()
                    nombre = form.cleaned_data['nombre']
                    rut = form.cleaned_data['rut']
                    dv = form.cleaned_data['dv']
                    telefono = form.cleaned_data['telefono']
                    direccion = form.cleaned_data['direccion']
                    idcomuna = form.cleaned_data['idComuna']
                    profesion = form.cleaned_data['profesion']
                    idsexo = form.cleaned_data['idSexo']
                    ocupacion = form.cleaned_data['ocupacion']
                    puesto = form.cleaned_data['puesto']
                    
                    url = reverse('respuesta', kwargs={
                        'nombre': nombre,
                        'rut': rut,
                        'dv': dv,
                        'telefono': telefono,
                        'direccion': direccion,
                        'idcomuna': idcomuna,
                        'profesion': profesion,
                        'idsexo': idsexo,
                        'ocupacion': ocupacion,
                        'puesto': puesto
                    })
                    return redirect(url)
            except IntegrityError as e:
                return HttpResponse(f"Error al guardar en la base de datos: {str(e)}", status=500)
    else:
        form = TrabajadorForm()
    return render(request, 'contacto/registro.html', {'form': form})


def respuesta(request, nombre, rut, dv, telefono, direccion, idcomuna, profesion, idsexo, ocupacion, puesto):
    contexto = {
        'nombre': nombre,
        'rut': rut,
        'dv': dv,
        'telefono': telefono,
        'direccion': direccion,
        'idcomuna': idcomuna,
        'profesion': profesion,
        'idsexo': idsexo,
        'ocupacion': ocupacion,
        'puesto': puesto
    }
    return render(request, 'contacto/respuesta.html', contexto)