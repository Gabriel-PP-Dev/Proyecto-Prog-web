<?php

include 'conect.php';

$sql = "SELECT 
    sv.carnet_cliente,
    sv.carnet_trabajador,
    pa.nombre AS nombre_producto,
    l.nombre AS nombre_local,
    sv.id
FROM 
    servicio_venta sv
JOIN 
    producto_almacen pa ON sv.id_producto = pa.id
JOIN 
    local l ON sv.id_local = l.id";
$result = pg_query($conn, $sql); // Usar pg_query() para ejecutar la consulta
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Trabajadores</title>
    <link rel="stylesheet" href="../styles/Register_Tab.css">
</head>
<body>

    <div id="menu-nav"></div>

    <header class="header">
        <h1>Registro de ventas</h1>
    </header>

    <div class="container">

        <div class="table-header">
            <h2>Ventas</h2>
        </div>

        <div class="search-area-container">
            <div class="search-area">
                <label for="search">Buscar:</label>
                <input type="text" id="search" placeholder="Buscar aquí..">
            </div>
        </div>

        <table>
            <thead>
              <tr>
                
                <th>Carnet cliente</th>
                <th>Carnet trabajador</th>
                <th>Nombre</th>
                <th>Local</th>
                <th>Serial</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <?php if (pg_num_rows($result) > 0): ?>
                  <?php $index = 1; ?>
                  <?php while ($row = pg_fetch_assoc($result)): ?>
                      <tr>
                          
                          <td><?php echo htmlspecialchars($row['carnet_cliente']); ?></td>
                          <td><?php echo htmlspecialchars($row['carnet_trabajador']); ?></td>
                          <td><?php echo htmlspecialchars($row['nombre_producto']); ?></td>
                          <td><?php echo htmlspecialchars($row['nombre_local']); ?></td>
                          <td><?php echo htmlspecialchars($row['id']); ?></td>
                          <td>
                            
                            <button class="btn-remov" onclick="eliminarProducto(<?php echo $row['id']; ?>)">Eliminar</button>

                           </td>
                            
                      </tr>
                  <?php endwhile; ?>
              <?php else: ?>
                  <tr>
                      <td colspan="5">No se encontraron ventas.</td>
                  </tr>
              <?php endif; ?>
            </tbody>
        </table>
    </div>

    <script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);

        function eliminarProducto(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        fetch(`../model/eliminarSV.php?id=${id}`, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra el mensaje de éxito o error
            location.reload(); // Recarga la tabla para actualizar la lista de productos
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }
}


    </script>
    
</body>
</html>

<?php

pg_close($conn); // Cerrar la conexión a la base de datos
?>