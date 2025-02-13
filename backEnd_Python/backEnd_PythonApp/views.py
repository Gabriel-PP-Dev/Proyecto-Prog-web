from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Tienda, Usuario
from .services import (
    getAllTiendas,
    addTienda,
    getTiendaById,
    updateTienda,
    deleteTienda,
    getTiendaByName,
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByName,
    authenticateUser  
)

class TiendaView(APIView):
    def get(self, request, pk=None, name=None):
        if pk:
            try:
                tienda = getTiendaById(pk)
                return Response(tienda, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif name:
            try:
                tiendas = getTiendaByName(name)
                return Response(tiendas, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            try:
                tiendas = getAllTiendas()
                return Response(tiendas, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            tienda = addTienda(request.data)
            return Response(tienda, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            tienda = updateTienda(pk, request.data)
            return Response(tienda, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            deleted = deleteTienda(pk)
            if deleted:
                return Response({"message": "Tienda eliminada"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"error": "Tienda no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UsuarioView(APIView):
    def get(self, request, pk=None, name=None):
        if pk:
            try:
                usuario = getUserById(pk)
                return Response(usuario, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif name:
            try:
                usuarios = getUserByName(name)
                return Response(usuarios, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            try:
                usuarios = getAllUsers()
                return Response(usuarios, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        if request.path == '/usuario/createUsuario/':
            try:
                usuario = addUser(request.data)
                return Response(usuario, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif request.path == '/usuario/authenticate/':
            try:
                usuario = authenticateUser(request.data['nombre_usuario'], request.data['contrasenna'])
                if usuario:
                    return Response(usuario, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error": "Método no permitido"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def put(self, request, pk):
        try:
            usuario = updateUser(pk, request.data)
            return Response(usuario, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            deleted = deleteUser(pk)
            if deleted:
                return Response({"message": "Usuario eliminado"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)