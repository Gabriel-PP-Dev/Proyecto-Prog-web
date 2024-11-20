<?php
include '../main/conect.php';

// Verificar si se han enviado los datos del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $carnet = $_POST['carnet'];
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $salario = $_POST['salario'];
    $rol = $_POST['rol'];

    if (empty($carnet) || empty($nombre) || empty($telefono) || empty($salario) || empty($rol)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    // Consulta para actualizar los datos del trabajador
    $sql = "UPDATE Trabajador SET nombre = $1, telefono = $2, salario = $3, rol = $4 WHERE carnet = $5";
    $result = pg_query_params($conn, $sql, array($nombre, $telefono, $salario, $rol, $carnet));

    if ($result) {
        echo "Datos actualizados correctamente.";
        
        header("Location: ../main/Tab_Trabajadores.php");
        exit;
    } else {
        echo "Error al actualizar: " . pg_last_error($conn);
    }
} else {
    echo "Método no permitido.";
}

pg_close($conn); // Cerrar la conexión a la base de datos
?>

