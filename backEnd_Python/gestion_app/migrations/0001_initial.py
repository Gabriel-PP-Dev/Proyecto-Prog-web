# Generated by Django 5.1.4 on 2025-02-16 06:43

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tienda',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('direccion', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TiendaProductoPrecio',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cantidad_en_tienda', models.IntegerField()),
                ('tienda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_app.tienda')),
            ],
        ),
        migrations.CreateModel(
            name='Producto_Precio',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_app.producto')),
                ('tiendaProductoPrecio', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='gestion_app.tiendaproductoprecio')),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('nombre_usuario', models.CharField(max_length=255, unique=True)),
                ('contrasenna', models.CharField(max_length=255)),
                ('rol', models.CharField(max_length=255)),
                ('tienda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_app.tienda')),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cantidad', models.IntegerField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tienda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_app.tienda')),
                ('tienda_producto_precio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_app.tiendaproductoprecio')),
            ],
        ),
    ]
