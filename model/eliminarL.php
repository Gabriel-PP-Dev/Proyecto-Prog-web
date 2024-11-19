<?php
include '../main/conect.php';

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']);

    $sqlCheck = "SELECT * FROM Local WHERE id = $1";
    $resultCheck = pg_query_params($conn, $sqlCheck, array($id));

if (pg_num_rows($resultCheck) > 0) {
    
} else {
    echo "No se encontró un trabajador con ese ID.";
}

    // Proceder con la eliminación

    $sql = "DELETE FROM Local WHERE id = $1"; 
    $result = pg_query_params($conn, $sql, array($id));

} else {
    echo "ID de producto no válido.";
}

?>