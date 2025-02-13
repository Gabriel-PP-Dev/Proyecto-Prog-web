from .models import Tienda, Usuario
from django.db.models import Q
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

def getAllTiendas():
    tiendas = Tienda.objects.all()
    resultado = []
    for tienda in tiendas:
        usuarios = Usuario.objects.filter(tienda=tienda)
        resultado.append({
            "id_tienda": tienda.id_tienda,
            "nombre": tienda.nombre,
            "direccion": tienda.direccion,
            "usuarios": [
                {
                    "id_usuario": usuario.id_usuario,
                    "nombre": usuario.nombre,
                    "nombre_usuario": usuario.nombre_usuario,
                    "contrasenna": usuario.contrasenna,
                    "rol": usuario.rol
                } for usuario in usuarios
            ]
        })
    return resultado

def addTienda(tienda_data):
    tienda = Tienda.objects.create(**tienda_data)
    return tienda

def getTiendaById(pk):
    tienda = Tienda.objects.get(id_tienda=pk)
    usuarios = Usuario.objects.filter(tienda=tienda)
    return {
        "id_tienda": tienda.id_tienda,
        "nombre": tienda.nombre,
        "direccion": tienda.direccion,
        "usuarios": [
            {
                "id_usuario": usuario.id_usuario,
                "nombre": usuario.nombre,
                "nombre_usuario": usuario.nombre_usuario,
                "contrasenna": usuario.contrasenna,
                "rol": usuario.rol
            } for usuario in usuarios
        ]
    }

def updateTienda(pk, tienda_data):
    tienda = Tienda.objects.get(id_tienda=pk)
    for key, value in tienda_data.items():
        setattr(tienda, key, value)
    tienda.save()
    return tienda

def deleteTienda(pk):
    tienda = Tienda.objects.get(id_tienda=pk)
    tienda.delete()
    return True

def getTiendaByName(name):
    tiendas = Tienda.objects.filter(Q(nombre__icontains=name))
    resultado = []
    for tienda in tiendas:
        usuarios = Usuario.objects.filter(tienda=tienda)
        resultado.append({
            "id_tienda": tienda.id_tienda,
            "nombre": tienda.nombre,
            "direccion": tienda.direccion,
            "usuarios": [
                {
                    "id_usuario": usuario.id_usuario,
                    "nombre": usuario.nombre,
                    "nombre_usuario": usuario.nombre_usuario,
                    "contrasenna": usuario.contrasenna,
                    "rol": usuario.rol
                } for usuario in usuarios
            ]
        })
    return resultado

def getAllUsers():
    usuarios = Usuario.objects.all()
    resultado = []
    for usuario in usuarios:
        tienda = Tienda.objects.get(id_tienda=usuario.tienda.id_tienda)
        resultado.append({"id_usuario": usuario.id_usuario, "nombre": usuario.nombre, "nombre_usuario": usuario.nombre_usuario, "contrasenna": usuario.contrasenna, "rol": usuario.rol, "tienda": {"id_tienda": tienda.id_tienda, "nombre": tienda.nombre, "direccion": tienda.direccion}})
    return resultado

def addUser(usuario_data):
    tienda = Tienda.objects.get(id_tienda=usuario_data['tienda']['id_tienda'])
    contrasenna_encriptada = make_password(usuario_data['contrasenna'])
    usuario = Usuario.objects.create(nombre=usuario_data['nombre'], nombre_usuario=usuario_data['nombre_usuario'], contrasenna=contrasenna_encriptada, rol=usuario_data['rol'], tienda=tienda)
    return {
        'id_usuario': usuario.id_usuario,
        'nombre': usuario.nombre,
        'nombre_usuario': usuario.nombre_usuario,
        'contrasenna': usuario.contrasenna,
        'rol': usuario.rol,
        'tienda': {
            'id_tienda': tienda.id_tienda,
            'nombre': tienda.nombre,
            'direccion': tienda.direccion
        }
    }

def getUserById(pk):
    usuario = Usuario.objects.get(id_usuario=pk)
    tienda = Tienda.objects.get(id_tienda=usuario.tienda.id_tienda)
    return {"id_usuario": usuario.id_usuario, "nombre": usuario.nombre, "nombre_usuario": usuario.nombre_usuario, "contrasenna": usuario.contrasenna, "rol": usuario.rol, "tienda": {"id_tienda": tienda.id_tienda, "nombre": tienda.nombre, "direccion": tienda.direccion}}

def updateUser(pk, usuario_data):
    usuario = Usuario.objects.get(id_usuario=pk)
    if 'contrasenna' in usuario_data:
        contrasenna_encriptada = make_password(usuario_data['contrasenna'])
        usuario.contrasenna = contrasenna_encriptada
    usuario.nombre = usuario_data.get('nombre', usuario.nombre)
    usuario.nombre_usuario = usuario_data.get('nombre_usuario', usuario.nombre_usuario)
    usuario.rol = usuario_data.get('rol', usuario.rol)
    tienda = Tienda.objects.get(id_tienda=usuario_data['tienda']['id_tienda'])
    usuario.tienda = tienda
    usuario.save()
    return {
        'id_usuario': usuario.id_usuario,
        'nombre': usuario.nombre,
        'nombre_usuario': usuario.nombre_usuario,
        'contrasenna': usuario.contrasenna,
        'rol': usuario.rol,
        'tienda': {
            'id_tienda': tienda.id_tienda,
            'nombre': tienda.nombre,
            'direccion': tienda.direccion
        }
    }

def deleteUser(pk):
    usuario = Usuario.objects.get(id_usuario=pk)
    usuario.delete()
    return True

def getUserByName(name):
    usuarios = Usuario.objects.filter(Q(nombre__icontains=name) | Q(nombre_usuario__icontains=name))
    resultado = []
    for usuario in usuarios:
        tienda = Tienda.objects.get(id_tienda=usuario.tienda.id_tienda)
        resultado.append({"id_usuario": usuario.id_usuario, "nombre": usuario.nombre, "nombre_usuario": usuario.nombre_usuario, "contrasenna": usuario.contrasenna, "rol": usuario.rol, "tienda": {"id_tienda": tienda.id_tienda, "nombre": tienda.nombre, "direccion": tienda.direccion}})
    return resultado

def authenticateUser(nombre_usuario, contrasenna):
    try:
        usuario = Usuario.objects.get(nombre_usuario=nombre_usuario)
        if check_password(contrasenna, usuario.contrasenna):
            tienda = Tienda.objects.get(id_tienda=usuario.tienda.id_tienda)
            return {
                'id_usuario': usuario.id_usuario,
                'nombre': usuario.nombre,
                'nombre_usuario': usuario.nombre_usuario,
                'contrasenna': usuario.contrasenna,
                'rol': usuario.rol,
                'tienda': {
                    'id_tienda': tienda.id_tienda,
                    'nombre': tienda.nombre,
                    'direccion': tienda.direccion
                }
            }
        else:
            return None
    except Usuario.DoesNotExist:
        return None