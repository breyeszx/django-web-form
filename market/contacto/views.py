from django.shortcuts import render, redirect
from .forms import TrabajadorForm

# Create your views here.
def index(request):
    return render(request, 'contacto/index.html')

def contacto(request):
    return render(request, 'contacto/contacto.html')


def registro_view(request):
    if request.method == 'POST':
        form = TrabajadorForm(request.POST)
        if form.is_valid():
            # Realiza validaciones adicionales aquí si es necesario
            try:
                # Guardar los datos en la base de datos
                form.save()
                return redirect('success')  # Redirige a una página de éxito
            except Exception as e:
                return HttpResponse(f"Error al guardar en la base de datos: {str(e)}", status=500)
    else:
        form = TrabajadorForm()
    return render(request, 'contacto/registro.html', {'form': form})