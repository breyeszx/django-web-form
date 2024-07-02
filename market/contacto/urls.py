#from django.conf.urls import url
from django.urls import path
from . import views
from .views import registro_view

urlpatterns=[
    path('', views.index, name='index'),
    path('registro/', registro_view, name='registro'),
    path('respuesta/<str:nombre>/<str:rut>/<str:dv>/<str:telefono>/<str:direccion>/<str:idcomuna>/<str:profesion>/<str:idsexo>/<str:ocupacion>/<str:puesto>/', views.respuesta, name='respuesta'),
]