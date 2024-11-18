<?php

include 'conect.php';

$sql = "SELECT 
    direccion,
    nombre
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
                <input type="text" id="search" placeholder="Buscar aquí..">
            </div>
        </div>

        <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Direccion</th>
                <th>Nombre</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <?php if (pg_num_rows($result) > 0): ?>
                  <?php $index = 1; ?>
                  <?php while ($row = pg_fetch_assoc($result)): ?>
                      <tr>
                          <td><?php echo $index++; ?></td>
                          <td><?php echo htmlspecialchars($row['direccion']); ?></td>
                          <td><?php echo htmlspecialchars($row['nombre']); ?></td>
                          <td>
                          <a href="../model/eliminarL.php?nombre=<?php echo ($row['nombre']); ?>" onclick="return confirm('¿Estás seguro de que deseas eliminar este local?');">Eliminar Local</a>
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
    </script>
    
</body>
</html>

<?php

pg_close($conn); // Cerrar la conexión a la base de datos
?>