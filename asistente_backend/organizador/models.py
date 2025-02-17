from django.db import models
from django.contrib.auth.models import User

class Etiqueta(models.Model):
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="etiquetas")
    nombre = models.CharField(max_length=50)
    color = models.CharField(max_length=7, default='#FFFFFF')

    class Meta:
        db_table_comment = "Etiquetas que se le puede agregar a una tarea"
        unique_together = [["autor", "nombre"]]

class Tarea(models.Model):
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tareas")
    titulo = models.CharField(max_length=100)
    contenido = models.TextField()
    fecha_creacion = models.DateField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(blank=True)
    
    ESTATUS_PROGRESO = (
        ("c", "Completado"),
        ("e", "En proceso"),
        ("n", "No iniciado"),
    )

    progreso = models.CharField(
        max_length=1,
        choices=ESTATUS_PROGRESO,
        blank=True,
        default="n",
        help_text="Estatus de la entrega de la tarea",
    )

    etiquetas = models.ManyToManyField(Etiqueta, blank=True)