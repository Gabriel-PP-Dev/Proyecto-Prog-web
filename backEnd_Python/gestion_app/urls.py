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
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint para obtener el token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint para refrescar el token
]
