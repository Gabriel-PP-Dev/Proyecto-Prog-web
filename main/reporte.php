<?php

include 'conect.php';

$query = "SELECT l.nombre , COUNT(pl.id_producto) AS cantidad_productos
FROM local AS l
INNER JOIN producto_local AS pl ON (l.id = pl.id_local)
INNER JOIN producto_almacen AS pa ON (pl.id_producto = pa.id)
GROUP BY l.nombre
ORDER BY cantidad_productos DESC
LIMIT 1;";
$result = pg_query($conn, $query);

if (!$query) {
    die("Error en la consulta: " . pg_last_error($conn));
}

$query1 = "SELECT pa.nombre, COUNT(sv.id_producto) AS ventas
FROM servicio_venta AS sv 
INNER JOIN  producto_local AS pl ON (sv.id_producto = pl.id_producto) 
INNER JOIN producto_almacen AS pa ON (pa.id = pl.id_producto)
GROUP BY pa.nombre
ORDER BY ventas DESC
LIMIT 1;";
$RESULT = pg_query($conn, $query1);

if (!$query1) {
    die("Error en la consulta: " . pg_last_error($conn));
}

$query2 = "SELECT t.nombre, COUNT (sv.carnet_trabajador) AS ventas
FROM servicio_venta AS sv 
INNER JOIN  trabajador AS t ON (sv.carnet_trabajador = t.carnet)
GROUP BY t.nombre
ORDER BY ventas DESC
LIMIT 1;";
$RESULTS = pg_query($conn, $query2);

if (!$query2) {
    die("Error en la consulta: " . pg_last_error($conn));
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte</title>
    <link rel="stylesheet" href="../styles/Forms.css">
</head>
<body>
<div class="wrapper">
        <div class="title">Reportes Generados:</div>
        
        <div class="options">
            <button onclick="fetchReport('consulta1')">Reporte 1</button>
            <button onclick="fetchReport('consulta2')">Reporte 2</button>
            <button onclick="fetchReport('consulta3')">Reporte 3</button>
        </div>

        <div id="reportContainer" class="report-container">
            <!-- Aquí se mostrarán los resultados de las consultas -->
        </div>
    </div>

    <script>
        function fetchReport(consulta) {
            // Aquí podrías hacer una llamada AJAX a un archivo PHP que ejecute la consulta SQL y devuelva los resultados
            let url = ../reports/${consulta}.php; // Cambia esta URL según tu estructura de archivos

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text(); // O response.json() si devuelves JSON
                })
                .then(data => {
                    document.getElementById('reportContainer').innerHTML = data;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    document.getElementById('reportContainer').innerHTML = '<p>Error al cargar el reporte.</p>';
                });
        }
    </script>
</body>
</html>