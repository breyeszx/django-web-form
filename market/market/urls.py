from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('consulta/', include("consulta.urls")),
    path('', include("contacto.urls")),
    path('admin/', admin.site.urls),
]
