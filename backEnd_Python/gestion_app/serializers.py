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
    tienda = serializers.UUIDField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'nombre_usuario', 'contrasenna', 'rol', 'tienda']

    def create(self, validated_data):
        tienda_id = validated_data.pop('tienda')
        tienda = Tienda.objects.get(id=tienda_id)
        usuario = Usuario.objects.create(tienda=tienda, **validated_data)
        return usuario

    def update(self, instance, validated_data):
        tienda_id = validated_data.pop('tienda', None)
        if tienda_id:
            try:
                tienda = Tienda.objects.get(id=tienda_id)
                instance.tienda = tienda
            except Tienda.DoesNotExist:
                raise serializers.ValidationError({'tienda': 'No existe la tienda con el ID proporcionad'})
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['tienda'] = TiendaSerializer(instance.tienda).data
        return representation

class Producto_PrecioSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all(), write_only=True)
    tiendaProductoPrecio = serializers.PrimaryKeyRelatedField(read_only=True, allow_null=True)

    class Meta:
        model = Producto_Precio
        fields = ['id', 'precio', 'producto', 'tiendaProductoPrecio']

    def create(self, validated_data):
        producto = validated_data.pop('producto')
        producto_precio = Producto_Precio.objects.create(producto=producto, tiendaProductoPrecio=None, **validated_data)
        return producto_precio

    def update(self, instance, validated_data):
        producto = validated_data.get('producto')
        instance.precio = validated_data.get('precio', instance.precio)
        instance.producto = producto
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['producto'] = ProductoSerializer(instance.producto).data
        return representation

class TiendaProductoPrecioSerializer(serializers.ModelSerializer):
    tienda = serializers.UUIDField(write_only=True)
    producto_precio = serializers.UUIDField(write_only=True)
    producto_precio_data = Producto_PrecioSerializer(read_only=True)

    class Meta:
        model = TiendaProductoPrecio
        fields = ['id', 'cantidad_en_tienda', 'tienda', 'producto_precio', 'producto_precio_data']

    def create(self, validated_data):
       tienda_id = validated_data.pop('tienda')
       tienda = Tienda.objects.get(id=tienda_id)
       producto_precio_id = validated_data.pop('producto_precio')
       producto_precio = Producto_Precio.objects.get(id=producto_precio_id)
    
       if producto_precio.tiendaProductoPrecio:
           raise serializers.ValidationError({'producto_precio': 'Este producto precio ya tiene un tiendaProductoPrecio asociado'})
    
       tienda_producto_precio = TiendaProductoPrecio.objects.create(tienda=tienda, **validated_data)
       producto_precio.tiendaProductoPrecio = tienda_producto_precio
       producto_precio.save()
       return tienda_producto_precio

    def to_representation(self, instance):
       representation = super().to_representation(instance)
       representation['tienda'] = TiendaSerializer(instance.tienda).data
       if instance.producto_precio_set.exists():
           representation['producto_precio_data'] = Producto_PrecioSerializer(instance.producto_precio_set.first()).data
       else:
           representation['producto_precio_data'] = None
       return representation

class VentaSerializer(serializers.ModelSerializer):
    tienda_producto_precio = serializers.UUIDField(write_only=True)
    tienda_producto_precio_data = TiendaProductoPrecioSerializer(read_only=True)

    class Meta:
        model = Venta
        fields = ['id', 'cantidad', 'precio', 'tienda_producto_precio', 'tienda_producto_precio_data']

    def create(self, validated_data):
        tienda_producto_precio_id = validated_data.pop('tienda_producto_precio')
        tienda_producto_precio = TiendaProductoPrecio.objects.get(id=tienda_producto_precio_id)
        venta = Venta.objects.create(tienda_producto_precio=tienda_producto_precio, **validated_data)
        return venta

    def update(self, instance, validated_data):
        tienda_producto_precio_id = validated_data.pop('tienda_producto_precio', None)
        if tienda_producto_precio_id:
            try:
                tienda_producto_precio = TiendaProductoPrecio.objects.get(id=tienda_producto_precio_id)
                instance.tienda_producto_precio = tienda_producto_precio
            except TiendaProductoPrecio.DoesNotExist:
                raise serializers.ValidationError({'tienda_producto_precio': 'No existe el TiendaProductoPrecio con el ID proporcionado'})
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['tienda_producto_precio_data'] = TiendaProductoPrecioSerializer(instance.tienda_producto_precio).data
        return representation