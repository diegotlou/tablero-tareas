from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tareas', views.TareaViewSet, basename='tarea-crud')

# path("", views.ListaTareaView.as_view(), name="tareas-lista"),

urlpatterns = [
    path("", include(router.urls)),
    path("borrar/<int:pk>/", views.BorrarTarea.as_view(), name="borrar-tarea"),
    path("etiquetas/", views.ListaEtiquetaView.as_view(), name="etiquetas-lista"),
    path("borrar/<int:pk>/", views.BorrarEtiqueta.as_view(), name="borrar-etiqueta"),
]