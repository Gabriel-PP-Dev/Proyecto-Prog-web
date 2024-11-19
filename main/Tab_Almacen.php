<?php
// Incluir el archivo de conexión
include 'conect.php';

// Consulta SQL para obtener todos los productos
$query = "SELECT 
    pa.*, 
    COUNT(pl.id_producto) AS cantidad_local
FROM 
    producto_almacen AS pa
LEFT JOIN 
    producto_local pl ON pa.id = pl.id_producto
GROUP BY 
    pa.id;";
$result = pg_query($conn, $query);

// Verificar si la consulta fue exitosa
if (!$result) {
    die("Error en la consulta: " . pg_last_error($conn));
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../styles/Register_Tab.css">
</head>
<body>

    <div id="menu-nav"></div>

    <header class="header">
        <h1>Registro del almacen</h1>
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
                    <th>#</th>
                    <th>Imagen</th>
                    <th>Nombre de Producto</th>
                    <th>Precio unitario</th>
                    <th>Cantidad</th>
                    <th>Costo</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if (pg_num_rows($result) > 0) {
                    $index = 1;
                    while ($row = pg_fetch_assoc($result)) {
                        echo "<tr>";
                        echo "<td>" . $index++ . "</td>";
                        echo "<td><img src='". htmlspecialchars($row["imagen"]). "' alt='Imagen de " . htmlspecialchars($row["nombre"]) . "' style='width:50px; height:auto;'></td>"; 
                        echo "<td>" . htmlspecialchars($row["nombre"]) . "</td>"; 
                        echo "<td>$" . htmlspecialchars($row["precio"]) . "</td>"; 
                        echo "<td>" . htmlspecialchars($row["cantidad_local"]) . "</td>"; 
                        echo "<td>$" . htmlspecialchars($row["costo"]) . "</td>"; 
                        echo "<td><a href='mover_Producto.php?id=" . htmlspecialchars($row["id"]) . "'>
        <button title='Mover a tienda'>Mover a tienda</button>
      </a></td>";
                        echo "</tr>";
                    }
                } else {
                    echo "<tr><td colspan='7'>No se encontraron productos.</td></tr>"; 
                }

                pg_close($conn);
                ?>
            </tbody>
        </table>

    </div>

    <script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);

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
