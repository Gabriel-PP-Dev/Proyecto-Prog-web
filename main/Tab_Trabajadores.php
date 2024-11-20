<?php

include 'conect.php';

$sql = "SELECT 
    t.carnet,
    l.nombre,
    t.nombre,
    t.telefono,
    t.rol,
    t.salario
FROM 
    Trabajador t
JOIN 
    Local l ON t.id_local = l.id
WHERE 
    t.id_local = l.id";
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
        <h1>Registro de trabajadores</h1>
    </header>

    <div class="container">

        <div class="table-header">
            <h2>Trabajadores</h2>
        </div>

        <div class="search-area-container">
            <div class="search-area">
                <label for="search">Buscar:</label>
                <input type="text" id="search" placeholder="Buscar aqui.." oninput="filterTable()">
            </div>
        </div>

        <table id="workerTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Carnet</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Cargo</th>
                <th>Salario</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <?php if (pg_num_rows($result) > 0): ?>
                  <?php $index = 1; ?>
                  <?php while ($row = pg_fetch_assoc($result)): ?>
                      <tr>
                          <td><?php echo $index++; ?></td>
                          <td><?php echo htmlspecialchars($row['carnet']); ?></td>
                          <td><?php echo htmlspecialchars($row['nombre']); ?></td>
                          <td><?php echo htmlspecialchars($row['telefono']); ?></td>
                          <td><?php echo htmlspecialchars($row['rol']); ?></td>
                          <td><?php echo htmlspecialchars($row['salario']); ?></td>
                          <td>
                              <a href="editarT.php?carnet=<?php echo urlencode($row['carnet']); ?>" class="btn-edit">Editar</a>

                              <button class="btn-remov" onclick="eliminarTrabajador(<?php echo $row['telefono']; ?>)">Eliminar</button>
                          </td>
                            
                      </tr>
                  <?php endwhile; ?>
              <?php else: ?>
                  <tr>
                      <td colspan="5">No se encontraron trabajadores.</td>
                  </tr>
              <?php endif; ?>
            </tbody>
        </table>
    </div>

    <script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);

        function eliminarTrabajador(telefono) {
    if (confirm("¿Estás seguro de que deseas eliminar?")) {
        fetch(`../model/eliminarT.php?telefono=${telefono}`, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra el mensaje de éxito o error
            location.reload(); // Recarga la tabla para actualizar la lista de productos
        })
        .catch(error => {
            console.error('Error al eliminar:', error);
        });
    }
}

            function filterTable() {
            const input = document.getElementById("search");
            const filter = input.value.toLowerCase();
            const table = document.getElementById("workerTable");
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