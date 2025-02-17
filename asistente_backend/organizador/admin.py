from django.contrib import admin
from .models import Tarea, Etiqueta


@admin.register(Tarea)
class TareaAdmin(admin.ModelAdmin):
    list_display = ("autor", "titulo", "contenido", "fecha_creacion",
                    "fecha_vencimiento", "progreso")

@admin.register(Etiqueta)
class EtiquetaAdmin(admin.ModelAdmin):
    list_display = ("autor", "nombre", "color")