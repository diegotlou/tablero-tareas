from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from .serializers import UserSerializer, TareaSerializer, EtiquetaSerializer
from .models import Tarea, Etiqueta

class CrearUsuarioView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ListaTareaView(generics.ListCreateAPIView):
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tarea.objects.filter(autor=self.request.user)

    def perform_create(self, serializer):
        etiquetas_data = self.request.data.get("etiquetas", [])
        etiquetas_validas = Etiqueta.objects.filter(autor=self.request.user, id__in=etiquetas_data)

        if len(etiquetas_data) != etiquetas_validas.count():
            raise ValidationError("Hubo un error con las etiquetas seleccionadas.")
        
        tarea = serializer.save(autor=self.request.user)
        tarea.etiquetas.set(etiquetas_validas)

class BorrarTarea(generics.DestroyAPIView):
    serializer = TareaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tarea.objects.filter(autor=self.request.user)
    
class ListaEtiquetaView(generics.ListCreateAPIView):
    serializer_class = EtiquetaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Etiqueta.objects.filter(autor=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(autor=self.request.user)
        else:
            print(serializer.errors)

class BorrarEtiqueta(generics.DestroyAPIView):
    serializer = EtiquetaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Etiqueta.objects.filter(autor=self.request.user)