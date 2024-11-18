<?php
include '../main/conect.php';


if (isset($_GET['nombre'])) {
    $carnet = $_GET['nombre'];


    $sql = "DELETE FROM local WHERE nombre = $1";
    $result = pg_query_params($conn, $sql, array($nombre));

    if ($result) {

        header("Location: ../main/Tab_Local.php?mensaje=Local eliminado con éxito");
        exit();
    } else {

        header("Location: ../main/Tab_Local.php?mensaje=Error al eliminar");
        exit();
    }
} else {

    header("Location: ../main/Tab_Local.php?mensaje=Nombre no proporcionado");
    exit();
}

pg_close($conn);
?>