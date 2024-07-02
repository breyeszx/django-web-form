from django.shortcuts import render
from django.http import JsonResponse
from .models import Servicio
from django.db.models import Q

def buscar_servicios(request):
    query = request.GET.get('q', '')
    costo_rango = request.GET.get('costo_rango', None)
    duracion = request.GET.get('duracion', None)
    requisitos = request.GET.get('requisitos', None)
    
    servicios = Servicio.objects.all()

    if query:
        servicios = servicios.filter(
            Q(nombre__icontains=query) |
            Q(descripcion__icontains=query)
        )

    if costo_rango:
        if costo_rango == '0-1000':
            servicios = servicios.filter(costo__lte=1000)
        elif costo_rango == '1001-5000':
            servicios = servicios.filter(costo__gt=1000, costo__lte=5000)
        elif costo_rango == '5001-10000':
            servicios = servicios.filter(costo__gt=5000, costo__lte=10000)
        elif costo_rango == '10000+':
            servicios = servicios.filter(costo__gt=10000)

    if duracion:
        duracion = int(duracion)
        if duracion == 60:
            servicios = servicios.filter(duracion=60)
        elif duracion == 120:
            servicios = servicios.filter(duracion=120)
        elif duracion == 180:
            servicios = servicios.filter(duracion=180)
        elif duracion == 240:
            servicios = servicios.filter(duracion=240)
        elif duracion == 300:
            servicios = servicios.filter(duracion__gt=240)

    if requisitos is not None and requisitos != '':
        servicios = servicios.filter(requisitos=bool(int(requisitos)))
    
    data = [
        {
            "nombre": servicio.nombre,
            "descripcion": servicio.descripcion,
            "costo": servicio.costo,
            "duracion": servicio.duracion,  # Duración en minutos
            "requisitos": servicio.requisitos,
            "disponibilidad": servicio.disponibilidad,
        }
        for servicio in servicios
    ]
    return JsonResponse(data, safe=False)

def buscar(request):
    return render(request, 'servicios/buscar.html')
