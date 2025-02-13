# Generated by Django 5.1.4 on 2025-02-11 15:43

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto_Precio',
            fields=[
                ('id_producto_precio', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Tienda',
            fields=[
                ('id_tienda', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('direccion', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_usuario', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('nombre_usuario', models.CharField(max_length=255)),
                ('contrasenna', models.CharField(max_length=255)),
                ('rol', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id_producto', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('producto_precios', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backEnd_PythonApp.producto_precio')),
            ],
        ),
        migrations.CreateModel(
            name='TiendaProductoPrecio',
            fields=[
                ('id_tienda_producto_precio', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cantidad_en_tienda', models.IntegerField()),
                ('producto_precios', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='backEnd_PythonApp.producto_precio')),
                ('tienda', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='backEnd_PythonApp.tienda')),
            ],
        ),
        migrations.AddField(
            model_name='producto_precio',
            name='tienda_producto_precio',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backEnd_PythonApp.tiendaproductoprecio'),
        ),
        migrations.AddField(
            model_name='tienda',
            name='usuarios',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backEnd_PythonApp.usuario'),
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id_venta', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cantidad', models.IntegerField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('producto_precio', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='backEnd_PythonApp.tiendaproductoprecio')),
                ('tienda', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='backEnd_PythonApp.tienda')),
            ],
        ),
    ]
