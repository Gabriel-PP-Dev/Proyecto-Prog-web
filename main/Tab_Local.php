<?php

include 'conect.php';

$sql = "SELECT 
    nombre,
    direccion,
    id
FROM 
    Local";
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
        <h1>Registro de locales</h1>
    </header>

    <div class="container">

        <div class="table-header">
            <h2>Locales</h2>
        </div>

        <div class="search-area-container">
            <div class="search-area">
                <label for="search">Buscar:</label>
                <input type="text" id="search" placeholder="Buscar aquí.." oninput="filterTable()">
            </div>
        </div>

        <table id="localTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>ID</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <?php if (pg_num_rows($result) > 0): ?>
                  <?php $index = 1; ?>
                  <?php while ($row = pg_fetch_assoc($result)): ?>
                      <tr>
                          <td><?php echo $index++; ?></td>
                          <td><?php echo htmlspecialchars($row['nombre']); ?></td>
                          <td><?php echo htmlspecialchars($row['direccion']); ?></td>
                          <td><?php echo htmlspecialchars($row['id']); ?></td>
                          <td>

                          <a href="editarL.php?id=<?php echo urlencode($row['id']); ?>" class="btn-edit">Editar</a>

                          <button class="btn-remov" onclick="eliminarL(<?php echo $row['id']; ?>)">Eliminar</button>
                          </td>
                            
                      </tr>
                  <?php endwhile; ?>
              <?php else: ?>
                  <tr>
                      <td colspan="5">No se encontraron locales.</td>
                  </tr>
              <?php endif; ?>
            </tbody>
        </table>
    </div>

    <script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);

        function eliminarL(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        fetch(`../model/eliminarL.php?id=${id}`, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }
}

            function filterTable() {
            const input = document.getElementById("search");
            const filter = input.value.toLowerCase();
            const table = document.getElementById("localTable");
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