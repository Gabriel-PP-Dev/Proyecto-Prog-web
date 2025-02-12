from django.urls import path
from backEnd_PythonApp.views import TiendaView, UsuarioView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title="API de Tiendas",
        default_version='v1',
        description="API de tiendas",
        terms_of_service="https://www.example.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
    patterns=[
        path('tienda/createTienda/', TiendaView.as_view(), name='add_tienda'),
        path('tienda/updateTienda/<uuid:pk>/', TiendaView.as_view(), name='update_tienda'),
        path('tienda/deleteTienda/<uuid:pk>/', TiendaView.as_view(), name='delete_tienda'),
        path('tienda/<uuid:pk>/', TiendaView.as_view(), name='get_tienda_by_id'),
        path('tienda/', TiendaView.as_view(), name='get_all_tiendas'),
        path('tienda/searchByName/<str:name>/', TiendaView.as_view(), name='get_tienda_by_name'),
        path('usuario/', UsuarioView.as_view(), name='get_all_usuarios'),
        path('usuario/createUsuario/', UsuarioView.as_view(), name='add_usuario'),
        path('usuario/<uuid:pk>/', UsuarioView.as_view(), name='get_usuario_by_id'),
        path('usuario/updateUsuario/<uuid:pk>/', UsuarioView.as_view(), name='update_usuario'),
        path('usuario/deleteUsuario/<uuid:pk>/', UsuarioView.as_view(), name='delete_usuario'),
        path('usuario/searchByName/<str:name>/', UsuarioView.as_view(), name='get_usuario_by_name'),
        path('usuario/authenticate/', UsuarioView.as_view(), name='authenticate_usuario'),
    ]
)

urlpatterns = [
    # Crear una nueva tienda
    path('tienda/createTienda/', TiendaView.as_view(), name='add_tienda'),
    # Actualizar una tienda
    path('tienda/updateTienda/<uuid:pk>/', TiendaView.as_view(), name='update_tienda'),
    # Eliminar una tienda
    path('tienda/deleteTienda/<uuid:pk>/', TiendaView.as_view(), name='delete_tienda'),
    # Obtener una tienda por ID
    path('tienda/<uuid:pk>/', TiendaView.as_view(), name='get_tienda_by_id'),
    # Obtener todas las tiendas
    path('tienda/', TiendaView.as_view(), name='get_all_tiendas'),
    # Buscar tiendas por nombre
    path('tienda/searchByName/<str:name>/', TiendaView.as_view(), name='get_tienda_by_name'),
    # Devuelve todos los usuarios del sistema (no params)
    path('usuario/', UsuarioView.as_view(), name='get_all_usuarios'),
    # Agrega un nuevo usuario al sistema 
    # (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
    #  contrasenna, rol: string, tienda: {"id_tienda": string} })
    path('usuario/createUsuario/', UsuarioView.as_view(), name='add_usuario'),
    # Devuelve un usuario por su id
    path('usuario/<uuid:pk>/', UsuarioView.as_view(), name='get_usuario_by_id'),
    # Actualiza los datos del usuario segun su id
    # (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
    #  contrasenna, rol: string, id_tienda: string })
    path('usuario/updateUsuario/<uuid:pk>/', UsuarioView.as_view(), name='update_usuario'),
    # Elimina un usuario segun el id
    path('usuario/deleteUsuario/<uuid:pk>/', UsuarioView.as_view(), name='delete_usuario'),
    # Busca un usuario por su nombre
    path('usuario/searchByName/<str:name>/', UsuarioView.as_view(), name='get_usuario_by_name'),
    # Autentificacion de usuario
    # (body: {nombre_usuario: string, contrasenna: string})
    path('usuario/authenticate/', UsuarioView.as_view(), name='authenticate_usuario'),
    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]