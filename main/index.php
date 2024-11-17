<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php'; // Asegúrate de que la ruta sea correcta

// Realizar la consulta
$sql = "SELECT * FROM persona";
$result = pg_query($conn, $sql); // Cambia esto para usar pg_query()

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web de pcDoctor</title>
    <link rel="stylesheet" href="../styles/Global.css">
</head>
<body> 

    <div id="menu-nav"></div>

    <h1>Web con fines de organización para la mypime pcDoctor</h1>

    <div class="content_pricipal">

        <h4>Usos de la web</h4>
        <hr>

        <ul>
            <li>Administrar productos en venta de cada local.</li>
            <li>Registrar y administrar los empleados.</li>
            <li>Administrar los productos del almacén de la empresa.</li>
        </ul>

        <h4>Locales:</h4>

        <div class="images-container">
            <img src="../img/fondo-abstracto-hecho-lineas-inclinadas-puntos-semitono-colores-purpura-oscuro_444390-11694.jpg" alt="">
            <img src="../img/fondo-abstracto-morado.jpg" alt="">
            <img src="../img/mejores-portátiles-para-programadores.jpeg" alt="">
            <img src="../img/pfp-background-0q3uxtkti9cr7xax.jpg" alt="">
        </div>

        <!-- Aquí imprimimos los resultados de la consulta -->
        <h4>Lista de Personas:</h4>
        <?php if (pg_num_rows($result) > 0): ?> <!-- Cambia esto para usar pg_num_rows() -->
            <table border="1">
                <tr>
                    <th>Nombre</th>
                    <th>Carnet</th>
                    <th>Teléfono</th>
                </tr>
                <?php while($row = pg_fetch_assoc($result)): ?> <!-- Cambia esto para usar pg_fetch_assoc() -->
                    <tr>
                        <td><?php echo $row['nombre']; ?></td>
                        <td><?php echo $row['carnet']; ?></td>
                        <td><?php echo $row['telefono']; ?></td>
                    </tr>
                <?php endwhile; ?>
            </table>
        <?php else: ?>
            <p>No se encontraron registros.</p>
        <?php endif; ?>

    </div>

    <footer class="footer">
        <h3>¿Quiénes somos?</h3>
        <hr>
        <span>Mypime pcDoctor</span>
        <span>Número: 59 47 24 31</span>
    </footer>

    <script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);
    </script>

</body>
</html>

<?php
// Cerrar conexión
pg_close($conn); // Cambia esto para usar pg_close()
?>
