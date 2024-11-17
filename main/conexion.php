<?php
// conexion.php

// Parámetros de conexión
$host = "localhost";
$port = "5432";
$dbname = "ProgramacionWebUniversidad";
$user = "postgres";
$password = "pg";

// Crear conexión
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// Verificar conexión
if (!$conn) {
    die("Error en la conexión a la base de datos.");
} else {
    // Si la conexión es exitosa, imprime un mensaje en la consola
    echo "<script>console.log('Conexión exitosa a la base de datos.');</script>";
}
?>
