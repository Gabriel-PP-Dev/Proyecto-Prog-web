from rest_framework import serializers
from .models import Tienda, Usuario, Producto, TiendaProductoPrecio, Producto_Precio, Venta

class TiendaSerializer(serializers.ModelSerializer):
    #usuarios = UsuarioSerializer(many=True, read_only=True)

    class Meta:
        model = Tienda
        fields = '__all__'
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__' 
class UsuarioSerializer(serializers.ModelSerializer):
    tienda = serializers.UUIDField()

    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'nombre_usuario', 'contrasenna', 'rol', 'tienda']

    def create(self, validated_data):
        tienda_id = validated_data.pop('tienda')
        tienda = Tienda.objects.get(id=tienda_id)
        usuario = Usuario.objects.create(tienda=tienda, **validated_data)
        return usuario

class Producto_PrecioSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    tiendaProductoPrecio = TiendaProductoPrecio(read_only=True)

    class Meta:
        model = Producto_Precio
        fields = '__all__' 

class TiendaProductoPrecioSerializer(serializers.ModelSerializer):
    tienda = TiendaSerializer(read_only=True)
    producto_precios = Producto_PrecioSerializer(read_only=True, many=True)

    class Meta:
        model = TiendaProductoPrecio
        fields = '__all__' 

class VentaSerializer(serializers.ModelSerializer):
    tienda = TiendaSerializer(read_only=True)
    tiendaProductoPrecio = TiendaProductoPrecioSerializer(read_only=True)
    
    class Meta:
        model = Venta
        fields = '__all__' 