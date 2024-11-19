<?php
// Incluir el archivo de conexión
include 'conect.php';

// Verificar si se ha recibido un ID
if (!isset($_GET['id'])) {
    die("No se ha especificado un producto para mover.");
}

$id_producto = intval($_GET['id']);

// Consulta SQL para obtener los datos del producto
$query = "SELECT * FROM producto_almacen WHERE id = $id_producto";
$result = pg_query($conn, $query);

// Verificar si se encontró el producto
if (!$result || pg_num_rows($result) === 0) {
    die("Producto no encontrado.");
}

$producto = pg_fetch_assoc($result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mover Producto</title>
    <link rel="stylesheet" href="../styles/Forms.css" />
</head>
<body>
<div id="menu-nav"></div>
<div class="wrapper">
    <div class="title">Mover producto desde almacen a tienda:</div>
    <form action="procesar_mover_producto.php" method="post">
        <!-- Mostrar el nombre del producto de forma estática -->
        <div class="field">
            <label>Producto:</label>
            <p id="producto"><?php echo htmlspecialchars($producto['nombre']); ?></p>
            <!-- Enviar el ID del producto como un campo oculto -->
            <input type="hidden" name="id_producto" value="<?php echo $id_producto; ?>" />
        </div>

        <!-- Lista de tiendas -->
        <div class="field">
            <select name="tienda" class="styled-select" required>
                <option value="" disabled selected>Seleccione una tienda</option>
                <?php
                $query_tiendas = "SELECT id, nombre FROM local";
                $result_tiendas = pg_query($conn, $query_tiendas);
                while ($row = pg_fetch_assoc($result_tiendas)) {
                    echo "<option value='" . htmlspecialchars($row['id']) . "'>" . htmlspecialchars($row['nombre']) . "</option>";
                }
                ?>
            </select>
        </div>

        <!-- Cantidad del producto -->
        <div class="field">
            <input
                type="number"
                name="cantidad"
                min="1"
                required
                placeholder="Cantidad"
            />
        </div>

        <!-- Botones de acción -->
        <div class="options">
            <div class="enviar">
                <input type="submit" value="Mover" onclick="validateForm(event)" />
            </div>
            <div class="cancelar">
                <input
                    type="button"
                    value="Cancelar"
                    onclick="window.location.href='index.html';"
                />
            </div>
        </div>
    </form>
</div>

<script>
    function validateForm(event) {
        const cantidad = document.querySelector('input[name="cantidad"]').value;
        if (cantidad <= 0) {
            alert('La cantidad debe ser mayor que 0');
            event.preventDefault();
        }
    }
</script>

<style>
    /* Contenedor general de la lista */
    .field {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    /* Estilo del texto del producto */
    #producto {
        font-size: 16px;
        font-weight: bold;
        color: #fff; /* Texto en blanco */
        margin-top: 5px;
    }

    /* Estilo del select */
    .styled-select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        color: #333;
        border: 2px solid #31a6bf;
        border-radius: 8px;
        background-color: #f9f9f9;
        appearance: none;
        outline: none;
        cursor: pointer;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Cambiar color al pasar el mouse por encima */
    .styled-select:hover {
        border-color: #1b5dad;
        background-color: #eef7ff;
    }
</style>

<script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);
    </script>
    
</body>
</html>

<?php
// Cerrar la conexión
pg_close($conn);
?>
