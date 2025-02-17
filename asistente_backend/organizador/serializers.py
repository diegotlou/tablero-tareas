from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from .models import Tarea, Etiqueta

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,
                                   validators=[UniqueValidator(queryset=User.objects.all(), 
                                   message="Correo ya registrado")])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]
        extra_kwargs = {"password": {"write_only" : True}, "password2": {"write_only" : True}}

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password" : "Las contrasenas no son iguales"})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = ["id", "autor", "nombre", "color"]
        extra_kwargs = {"autor": {"read_only" : True}}

class TareaSerializer(serializers.ModelSerializer):
    etiquetas = serializers.PrimaryKeyRelatedField(many=True, queryset=Etiqueta.objects.all(), required=False)

    class Meta:
        model = Tarea
        fields = ["id", "autor", "titulo", "contenido", "fecha_vencimiento", "progreso", "etiquetas"]
        extra_kwargs = {"autor": {"read_only" : True}}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["etiquetas"].queryset = Etiqueta.objects.filter(autor=self.context["request"].user)