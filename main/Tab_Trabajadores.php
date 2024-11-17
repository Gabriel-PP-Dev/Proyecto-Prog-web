<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php'; // Asegúrate de que la ruta sea correcta

// Realizar la consulta
$sql = "SELECT * FROM trabajador";
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
                <input type="text" id="search" placeholder="Buscar aquí..">
            </div>
        </div>

        <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th> <!-- Asumiendo que tienes un apellido -->
                <th>Cargo</th> <!-- Asumiendo que tienes un cargo -->
                <th>Salario</th> <!-- Asumiendo que tienes un salario -->
              </tr>
            </thead>
            <tbody>
              <?php if (pg_num_rows($result) > 0): ?>
                  <?php $index = 1; ?>
                  <?php while ($row = pg_fetch_assoc($result)): ?>
                      <tr>
                          <td><?php echo $index++; ?></td> <!-- Contador para el número -->
                          <td><?php echo htmlspecialchars($row['id_local']); ?></td> <!-- Cambia 'nombre' por el nombre real de tu columna -->
                          <td><?php echo htmlspecialchars($row['carnet_persona']); ?></td> <!-- Cambia 'apellido' por el nombre real de tu columna -->
                          <td><?php echo htmlspecialchars($row['rol']); ?></td> <!-- Cambia 'cargo' por el nombre real de tu columna -->
                          <td><?php echo htmlspecialchars($row['salario']); ?></td> <!-- Cambia 'salario' por el nombre real de tu columna -->
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
    </script>
    
</body>
</html>

<?php
// Cerrar conexión
pg_close($conn); // Cerrar la conexión a la base de datos
?>
