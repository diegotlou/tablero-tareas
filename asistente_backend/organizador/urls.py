from django.urls import path
from . import views

urlpatterns = [
    path("", views.ListaTareaView.as_view(), name="tareas-lista"),
    path("borrar/<int:pk>/", views.BorrarTarea.as_view(), name="borrar-tarea"),
    path("etiquetas/", views.ListaEtiquetaView.as_view(), name="etiquetas-lista"),
    path("borrar/<int:pk>/", views.BorrarEtiqueta.as_view(), name="borrar-etiqueta"),
]