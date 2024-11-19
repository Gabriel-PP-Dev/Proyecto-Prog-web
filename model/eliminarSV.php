<?php
include '../main/conect.php';

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']);

    // Proceder con la eliminación

    $sql = "DELETE FROM servicio_venta WHERE id = $1"; 
    $result = pg_query_params($conn, $sql, array($id)); // Asegúrate de usar $id aquí

} else {
    echo "ID de producto no válido.";
}

?>
