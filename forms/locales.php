<?php
header('Content-Type: application/json'); // Indica que se devolverá JSON
include '../main/conect.php';

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, nombre FROM local"; //Consulta SQL para obtener ID y nombre del local
    $stmt = $conn->query($sql);
    $locales = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($locales); //Devuelve los datos en formato JSON

} catch (PDOException $e) {
    // En caso de error, devolver un mensaje de error en formato JSON
    echo json_encode(["error" => $e->getMessage()]); 
    exit; // Asegúrate de salir después de enviar el mensaje de error
}

$conn = null; // Cerrar la conexión
?>