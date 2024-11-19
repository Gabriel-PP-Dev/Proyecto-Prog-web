<?php
include '../main/conect.php'; // Asegúrate de que la conexión a la base de datos esté incluida

if (isset($_GET['id_producto'])) {
    $id_producto = $_GET['id_producto'];

    // Escapar el ID del producto para evitar inyecciones SQL
    $id_producto = pg_escape_string($conn, $id_producto);

    // Consulta para obtener los detalles del producto
    $sql = "SELECT * FROM producto_local WHERE id_producto = '$id_producto'";
    $result = pg_query($conn, $sql);

    if ($result) {
        $producto = pg_fetch_assoc($result);
    } else {
        echo "Error al obtener el producto.";
        exit();
    }
} else {
    echo "ID de producto no válido.";
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualizar Producto</title>
    <link rel="stylesheet" href="../styles/Forms.css">
</head>
<body>
    <div class="wrapper">
      <div class="title">Actualizar producto:</div>
      <form action="actualizarP.php" method="POST" id="FormProduct" enctype="multipart/form-data">
          <input type="text" name="id_producto" value="<?php echo htmlspecialchars($producto['id_producto']); ?>">
          
          <div class="field">
            <input type="text" name="nombre" maxlength="250" id="id_local" value="<?php echo htmlspecialchars($producto['id_local']); ?>" required>
            <p class ="error" id="id_local"></p>
          </div>
          <div class="options">
            <div class="enviar">
              <input type="submit" value="Actualizar">
            </div>
            <div class="cancelar">
              <input type="button" value="Cancelar" onclick="toIndex()">
            </div>
          </div>
      </form>
     </div>
      <script src="../forms_validations/Validation_Form_Product.js"></script>
      <script>
        function toIndex(){
          window.location.href = "../main/index.html";
        }
      </script>
</body>
</html>

