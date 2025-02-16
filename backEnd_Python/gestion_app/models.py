from django.db import models
import uuid
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password


# Create your models here.

class Tienda(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre
    
class Usuario(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    nombre_usuario = models.CharField(max_length=255, unique=True)
    contrasenna = models.CharField(max_length=255)
    rol = models.CharField(max_length=255)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.contrasenna = make_password(self.contrasenna)
        super(Usuario, self).save(*args, **kwargs)

    def __str__(self):
        return self.nombre_usuario
    
    def check_password(self, password):
        return check_password(password, self.contrasenna)
    
class Producto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nombre
    
    
    
class TiendaProductoPrecio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cantidad_en_tienda = models.IntegerField()
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tienda.nombre} - {self.producto_precio.producto.nombre} - {self.cantidad_en_tienda}"

class Producto_Precio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    tiendaProductoPrecio = models.ForeignKey(TiendaProductoPrecio, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.producto.nombre} - {self.precio}"    
class Venta(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    tienda_producto_precio = models.ForeignKey(TiendaProductoPrecio, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tienda_producto_precio.tienda.nombre} - {self.tienda_producto_precio.producto_precio.producto.nombre} - {self.cantidad} - {self.precio}"
    
    
    