<?php
include '../main/conect.php'; // Asegúrate de que la conexión a la base de datos esté incluida

if (isset($_GET['id_producto'])) {
    $id_producto = $_GET['id_producto'];

    // Escapar el ID del producto para evitar inyecciones SQL
    $id_producto = pg_escape_string($conn, $id_producto);

    // Consulta para eliminar el producto
    $sql = "DELETE FROM producto_local WHERE id_producto = '$id_producto'";
    
    // Ejecutar la consulta
    if (pg_query($conn, $sql)) {
        // Redirigir a la página anterior con un mensaje de éxito
        header("Location: ../main/Tab_Product_Vend.php?mensaje=Producto eliminado exitosamente");
        exit();
    } else {
        // En caso de error, redirigir con un mensaje de error
        header("Location: ../main/Tab_Product_Vend.php?error=Error al eliminar el producto");
        exit();
    }
} else {
    // Si no se proporciona un ID de producto, redirigir con un mensaje de error
    header("Location: ../main/Tab_Product_Vend.php?error=ID de producto no válido");
    exit();
}

// Cerrar la conexión a la base de datos
pg_close($conn);
?>
