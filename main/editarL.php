<?php
include '../main/conect.php'; // Asegúrate de incluir tu archivo de conexión a la base de datos

// Verificar si se ha pasado un ID de local
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Consulta para obtener los datos del local
    $sql = "SELECT * FROM Local WHERE id = $1";
    $result = pg_query_params($conn, $sql, array($id));

    if ($result && pg_num_rows($result) > 0) {
        $local = pg_fetch_assoc($result);
    } else {
        echo "No se encontró el local.";
        exit;
    }
} else {
    echo "ID de local no especificado.";
    exit;
}

pg_close($conn); // Cerrar la conexión a la base de datos
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Local</title>
    <link rel="stylesheet" href="../styles/Forms.css">
</head>
<body>
    <div class="wrapper">
        <div class="title">Editar local:</div>
        <form action="../model/actualizarL.php" id="UpdateStor" method="post">
            <input type="hidden" name="id" value="<?php echo htmlspecialchars($local['id']); ?>">
            <div class="field">
                <input type="text" name="nombre" maxlength="250" placeholder="Nombre" id="nombre" value="<?php echo htmlspecialchars($local['nombre']); ?>" required>
                <p class ="error" id="nombreError">El nombre solo puede contener letras y espacios</p>
            </div>
            <div class="field">
                <input type="text" name="direccion" maxlength="250" required placeholder="Dirección" id="direccion" value="<?php echo htmlspecialchars($local['direccion']); ?>">
                <p class ="error" id="direccionError">La dirección solo puede contener números, letras, espacios, puntos y comas</p>
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
    <script src="../forms_validations/Validation_Form_Update.js"></script>
    <script>
        function toIndex(){
            window.location.href = "../main/index.html";
        }
    </script>
</body>
</html>
