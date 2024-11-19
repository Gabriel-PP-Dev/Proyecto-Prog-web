<?php
include '../main/conect.php';

if (isset($_GET['telefono']) && is_numeric($_GET['telefono'])) {
    $telefono = intval($_GET['telefono']);

    $sqlCheck = "SELECT * FROM trabajador WHERE telefono = $1";
    $resultCheck = pg_query_params($conn, $sqlCheck, array($telefono));

if (pg_num_rows($resultCheck) > 0) {
    // El registro existe, proceder a eliminar
} else {
    echo "No se encontró un producto con ese ID.";
}


    // Proceder con la eliminación

    $sql = "DELETE FROM trabajador WHERE telefono = $1"; 
    $result = pg_query_params($conn, $sql, array($telefono)); // Asegúrate de usar $id aquí

} else {
    echo "ID no válido.";
}

?>
