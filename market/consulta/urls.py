from django.urls import path
from .views import buscar_servicios,buscar

urlpatterns = [
    path('', buscar, name='buscar'),
    path('buscar/', buscar_servicios, name='buscar_servicios'),
]
