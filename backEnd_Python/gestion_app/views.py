from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Usuario, Tienda, Producto, TiendaProductoPrecio, Producto_Precio, Venta
from .serializers import UsuarioSerializer, TiendaSerializer, ProductoSerializer, TiendaProductoPrecioSerializer, Producto_PrecioSerializer, VentaSerializer
from datetime import datetime
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from django.db.models import Sum
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework import status

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    #permission_classes = [IsAuthenticated]

    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['username', 'password'],
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre de usuario'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Contraseña')
            }
        ),
        responses={
            200: openapi.Response('Usuario autenticado correctamente', UsuarioSerializer),
            401: openapi.Response('Credenciales incorrectas'),
            404: openapi.Response('Usuario no encontrado')
        }
    )
    def login(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return Response({'error': 'Faltan credenciales'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.get(nombre_usuario=username)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        if not usuario.check_password(password):
            return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)
    
    @action(methods=['get'], detail=False)
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'nombre',
                openapi.IN_PATH,
                description='Nombre del usuario',
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: openapi.Response('Usuarios encontrados', UsuarioSerializer(many=True))
        }
    )
    def buscar_por_nombre(self, request, *args, **kwargs):
        nombre = kwargs['nombre']
        usuarios = Usuario.objects.filter(nombre__icontains=nombre)
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)

class TiendaViewSet(viewsets.ModelViewSet):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer
    #permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=False)
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'nombre',
                openapi.IN_PATH,
                description='Nombre de la tienda',
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: openapi.Response('Tiendas encontradas', TiendaSerializer(many=True))
        }
    )
    def buscar_por_nombre(self, request, *args, **kwargs):
        nombre = kwargs['nombre']
        tiendas = Tienda.objects.filter(nombre__icontains=nombre)
        serializer = TiendaSerializer(tiendas, many=True)
        return Response(serializer.data)

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    #permission_classes = [IsAuthenticated]
    

class TiendaProductoPrecioViewSet(viewsets.ModelViewSet):
    queryset = TiendaProductoPrecio.objects.all()
    serializer_class = TiendaProductoPrecioSerializer
    #permission_classes = [IsAuthenticated]

class Producto_PrecioViewSet(viewsets.ModelViewSet):
    queryset = Producto_Precio.objects.all()
    serializer_class = Producto_PrecioSerializer
    #permission_classes = [IsAuthenticated]

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    #permission_classes = [IsAuthenticated]
