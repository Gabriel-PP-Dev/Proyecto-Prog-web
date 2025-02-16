from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, TiendaViewSet, TiendaProductoPrecioViewSet, Producto_PrecioViewSet, ProductoViewSet, VentaViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'producto', ProductoViewSet)
router.register(r'producto_precio', Producto_PrecioViewSet)
router.register(r'tienda', TiendaViewSet)
router.register(r'tiendaProductoPrecio', TiendaProductoPrecioViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'venta', VentaViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Incluye las rutas del router
    path('tienda/buscar/<str:nombre>/', TiendaViewSet.as_view({'get': 'buscar_por_nombre'})),
    path('usuarios/buscar/<str:nombre>/', UsuarioViewSet.as_view({'get': 'buscar_por_nombre'})),
    path('usuarios/login/', UsuarioViewSet.as_view({'post': 'login'})),
    path('producto_precio/producto/<str:producto_id>/', Producto_PrecioViewSet.as_view({'get': 'producto_precio_por_producto'}), name='producto_precio_por_producto'),
    path('tiendaProductoPrecio/tienda/<str:tienda_id>/', TiendaProductoPrecioViewSet.as_view({'get': 'tienda_por_id'})),
    path('tiendaProductoPrecio/producto/<str:producto_id>/', TiendaProductoPrecioViewSet.as_view({'get': 'producto_por_id'})),
    path('tiendaProductoPrecio/tienda/ordenado/<str:tienda_id>/', TiendaProductoPrecioViewSet.as_view({'get': 'tienda_por_id_ordenado'})),
    path('venta/tienda/<str:tienda_id>/', VentaViewSet.as_view({'get': 'ventas_por_tienda'})),
    path('venta/exportar/', VentaViewSet.as_view({'get': 'exportar_ventas'})),
    path('tiendaProductoPrecio/mover/', TiendaProductoPrecioViewSet.as_view({'post': 'mover_producto'})),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint para obtener el token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint para refrescar el token
]
