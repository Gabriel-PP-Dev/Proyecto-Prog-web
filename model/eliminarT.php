<?php
include '../main/conect.php';

if (isset($_GET['telefono']) && is_numeric($_GET['telefono'])) {
    $telefono = intval($_GET['telefono']);

    $sqlCheck = "SELECT * FROM trabajador WHERE telefono = $1";
    $resultCheck = pg_query_params($conn, $sqlCheck, array($telefono));

if (pg_num_rows($resultCheck) > 0) {
    // El registro existe, procede a eliminar
} else {
    echo "No se encontró un trabajador con ese ID.";
}

    $sql = "DELETE FROM trabajador WHERE telefono = $1"; 
    $result = pg_query_params($conn, $sql, array($telefono));

} else {
    echo "ID no válido.";
}

?>
