#from django.conf.urls import url
from django.urls import path
from . import views
from .views import registro_view

urlpatterns=[
    path('index', views.index, name='index'),
    path('contacto', views.contacto, name='contacto'),
    path('registro', registro_view, name='registro')
]