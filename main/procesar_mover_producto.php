<?php
// Incluir el archivo de conexión
include 'conect.php';

// Verificar si se ha recibido el ID del producto
if (!isset($_POST['id_producto'])) {
    echo "<script>alert('No se ha especificado el producto.'); window.history.back();</script>";
    exit;
}

$id_producto = intval($_POST['id_producto']);
$cantidad = intval($_POST['cantidad']);
$tienda_id = intval($_POST['tienda']);

// Verificar que la cantidad y tienda sean válidas
if ($cantidad <= 0) {
    echo "<script>alert('La cantidad debe ser mayor que 0.'); window.history.back();</script>";
    exit;
}

if ($tienda_id <= 0) {
    echo "<script>alert('Debe seleccionar una tienda.'); window.history.back();</script>";
    exit;
}

// Consultar la cantidad disponible en el almacén
$query_cantidad_almacen = "SELECT cantidad FROM public.producto_almacen WHERE id = $id_producto";
$result_cantidad_almacen = pg_query($conn, $query_cantidad_almacen);
if (!$result_cantidad_almacen || pg_num_rows($result_cantidad_almacen) === 0) {
    echo "<script>alert('Producto no encontrado en el almacén.'); window.history.back();</script>";
    exit;
}

$almacen = pg_fetch_assoc($result_cantidad_almacen);
$cantidad_almacen = $almacen['cantidad'];

// Verificar que haya suficiente cantidad en el almacén
if ($cantidad > $cantidad_almacen) {
    echo "<script>alert('No hay suficiente cantidad en el almacén para mover.'); window.history.back();</script>";
    exit;
}

// Restar la cantidad del almacén
$query_restar_almacen = "UPDATE public.producto_almacen SET cantidad = cantidad - $cantidad WHERE id = $id_producto";
$result_restar_almacen = pg_query($conn, $query_restar_almacen);
if (!$result_restar_almacen) {
    echo "<script>alert('Error al restar la cantidad del almacén.'); window.history.back();</script>";
    exit;
}

// Sumar la cantidad a la tienda seleccionada en la tabla 'prodcuto_local'
$query_sumar_tienda = "INSERT INTO public.producto_local (id_producto, id_local, cantidad) 
                       VALUES ($id_producto, $tienda_id, $cantidad)
                       ON CONFLICT (id_producto, id_local) 
                       DO UPDATE SET cantidad = producto_local.cantidad + $cantidad";
$result_sumar_tienda = pg_query($conn, $query_sumar_tienda);
if (!$result_sumar_tienda) {
    echo "<script>alert('Error al mover la cantidad a la tienda.'); window.history.back();</script>";
    exit;
}

// Mostrar alerta de éxito y redirigir al usuario
echo "<script>
    alert('Producto movido correctamente.');
    window.location.href = 'Tab_Almacen.php'; // Cambia esta ruta según sea necesario
</script>";
exit;
?>
