<?php
header('Content-Type: application/json'); // Indica que se devolverá JSON
include '../main/conect.php';

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, nombre FROM producto_almacen"; 
    $stmt = $conn->query($sql);
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($productos); //Devuelve los datos en formato JSON
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]); //Maneja errores devolviendo un JSON con el mensaje de error
}
$conn = null; // Cerrar la conexión
?>