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

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    #permission_classes = [IsAuthenticated]

class TiendaViewSet(viewsets.ModelViewSet):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer
    #permission_classes = [IsAuthenticated]

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
