from django.db import models
import uuid

class Usuario(models.Model):
    id_usuario = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    nombre_usuario = models.CharField(max_length=255)
    contrasenna = models.CharField(max_length=255)
    rol = models.CharField(max_length=255)
    tienda = models.ForeignKey('Tienda', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_usuario

class Tienda(models.Model):
    id_tienda = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    usuarios = models.ManyToManyField('Usuario')
    tienda_producto_precios = models.ManyToManyField('TiendaProductoPrecio')
    ventas = models.ManyToManyField('Venta')

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    producto_precios = models.ManyToManyField('Producto_Precio')

    def __str__(self):
        return self.nombre

class Producto_Precio(models.Model):
    id_producto_precio = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    tienda_producto_precio = models.ForeignKey('TiendaProductoPrecio', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.precio)

class TiendaProductoPrecio(models.Model):
    id_tienda_producto_precio = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tienda = models.ForeignKey('Tienda', on_delete=models.CASCADE)
    producto_precios = models.ManyToManyField('Producto_Precio')
    cantidad_en_tienda = models.IntegerField()
    ventas = models.ManyToManyField('Venta')

    def __str__(self):
        return str(self.id_tienda_producto_precio)

class Venta(models.Model):
    id_venta = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tienda = models.ForeignKey('Tienda', on_delete=models.CASCADE)
    producto_precio = models.ForeignKey('TiendaProductoPrecio', on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.id_venta)