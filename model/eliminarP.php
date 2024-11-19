<?php
include '../main/conect.php';

if (isset($_GET['id_producto']) && is_numeric($_GET['id_producto'])) {
    $id_producto = intval($_GET['id_producto']);

    $sqlCheck = "SELECT * FROM producto_local WHERE id_producto = $1";
    $resultCheck = pg_query_params($conn, $sqlCheck, array($id_producto));

    if (pg_num_rows($resultCheck) > 0) {
    // El registro existe, procede a eliminar
    } else {
    echo "No se encontró un producto con ese ID.";
}

    $sql = "DELETE FROM producto_local WHERE id_producto = $1"; 
    $result = pg_query_params($conn, $sql, array($id_producto));

} else {
    echo "ID de producto no válido.";
}

?>

