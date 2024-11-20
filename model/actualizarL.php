<?php
include '../main/conect.php'; // Asegúrate de incluir tu archivo de conexión a la base de datos

// Verificar si se han recibido los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
    $direccion = isset($_POST['direccion']) ? $_POST['direccion'] : null;

    // Validación básica
    if ($id && $nombre && $direccion) {
        // Preparar la consulta de actualización
        $sql = "UPDATE Local SET nombre = $1, direccion = $2 WHERE id = $3";
        $result = pg_query_params($conn, $sql, array($nombre, $direccion, $id));

        if ($result) {
            // Redirigir a una página de éxito o a la lista de locales
            header("Location: ../main/Tab_Local.php?mensaje=Actualización exitosa");
            exit;
        } else {
            echo "Error al actualizar el local: " . pg_last_error($conn);
        }
    } else {
        echo "Por favor, complete todos los campos.";
    }
} else {
    echo "Método de solicitud no válido.";
}

pg_close($conn); // Cerrar la conexión a la base de datos
?>
