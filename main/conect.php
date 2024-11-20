<?php

$host = "localhost";
$port = "5432";
$dbname = "PCDoctor";
$user = "postgres";
$password = "pg";


$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// Verificar conexión
if (!$conn)
    die("Error en la conexión a la base de datos.");
?>