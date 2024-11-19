<?php
include '../main/conect.php';


if (isset($_GET['carnet'])) {
    $carnet = $_GET['carnet'];

    
    $sql = "DELETE FROM Trabajador WHERE carnet = $1";
    $result = pg_query_params($conn, $sql, array($carnet));

    if ($result) {
        
        header("Location: ../main/Tab_Trabajadores.php?mensaje=Trabajador eliminado con éxito");
        exit();
    } else {
        
        header("Location: ../main/Tab_Trabajadores.php?mensaje=Error al eliminar el trabajador");
        exit();
    }
} else {
    
    header("Location: ../main/Tab_Trabajadores.php?mensaje=Carnet no proporcionado");
    exit();
}


pg_close($conn);
?>
