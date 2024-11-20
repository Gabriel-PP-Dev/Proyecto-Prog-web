<?php

include 'conect.php';

$sql = "SELECT 
    p.id_producto,
    pa.nombre AS nombre_producto,
    l.nombre,
    p.cantidad
FROM 
    prodcuto_local p
JOIN 
    Local l ON p.id_local = l.id
JOIN
    prodcuto_almacen pa ON pa.id = p.id_producto
WHERE 
    p.id_local = l.id";
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
        <h1>Productos para venta</h1>
    </header>

    <div class="container">

        <div class="table-header">
            <h2>Productos</h2>
        </div>

        <div class="search-area-container">
            <div class="search-area">
                <label for="search">Buscar:</label>
                <input type="text" id="search" placeholder="Buscar aqui.." oninput="filterTable()">
            </div>
        </div>

        <table id="productTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Local</th>
                <th>Cantidad</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <?php if (pg_num_rows($result) > 0): ?>
                  <?php $index = 1; ?>
                  <?php while ($row = pg_fetch_assoc($result)): ?>
                      <tr>
                    
                          <td><?php echo htmlspecialchars($row['id_producto']); ?></td>
                          <td><?php echo htmlspecialchars($row['nombre_producto']); ?></td>
                          <td><?php echo htmlspecialchars($row['nombre']); ?></td>
                          <td><?php echo htmlspecialchars($row['cantidad']); ?></td>
                          <td>
                          <button class="btn-vend" onclick=""></button>

                          <button class="btn-remov" onclick="eliminarProducto(<?php echo $row['id_producto']; ?>)">Eliminar</button>
                          </td>
                            
                      </tr>
                  <?php endwhile; ?>
              <?php else: ?>
                  <tr>
                      <td colspan="5">No se encontraron productos.</td>
                  </tr>
              <?php endif; ?>
            </tbody>
        </table>
    </div>

    <script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);

        function eliminarProducto(id_producto) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        fetch(`../model/eliminarP.php?id_producto=${id_producto}`, {
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

            function filterTable() {
            const input = document.getElementById("search");
            const filter = input.value.toLowerCase();
            const table = document.getElementById("productTable");
            const trs = table.getElementsByTagName("tr");

            for (let i = 1; i < trs.length; i++) {
                const tds = trs[i].getElementsByTagName("td");
                let rowContainsText = false;

                for (let j = 0; j < tds.length; j++) {
                    if (tds[j]) {
                        const cellText = tds[j].textContent || tds[j].innerText;
                        if (cellText.toLowerCase().indexOf(filter) > -1) {
                            rowContainsText = true;
                            break;
                        }
                    }
                }

                trs[i].style.display = rowContainsText ? "" : "none";
            }
        }
    </script>
    
</body>
</html>

<?php

pg_close($conn); // Cerrar la conexión a la base de datos
?>