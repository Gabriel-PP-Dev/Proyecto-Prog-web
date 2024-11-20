<?php
include 'conect.php'; // Asegúrate de incluir tu archivo de conexión a la base de datos

// Verificar si se ha pasado el carnet
if (isset($_GET['carnet'])) {
    $telefono = $_GET['carnet'];

    // Consulta para obtener los datos del trabajador
    $sql = "SELECT * FROM Trabajador WHERE carnet = $1";
    $result = pg_query_params($conn, $sql, array($telefono));

    if (!$result) {
        echo "Error en la consulta: " . pg_last_error($conn);
        exit;
    }

    $trabajador = pg_fetch_assoc($result);
} else {
    echo "telefono no especificado.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Trabajador</title>
    <link rel="stylesheet" href="../styles/Forms.css">
</head>
<body>
    <div class="wrapper">
        <div class="title">Editar trabajador:</div>
        <form action="../model/actualizarT.php" id="UpdateWork" method="POST">
            <input type="hidden" name="carnet" value="<?php echo htmlspecialchars($trabajador['carnet']); ?>">
            <div class="field">
                <input type="text" name="nombre" maxlength="250" placeholder="Nombre" id="nombre" value="<?php echo htmlspecialchars($trabajador['nombre']); ?>" required>
                <p class ="error" id="nombreError">El nombre solo puede contener letras y espacios</p>
            </div>
            <div class="field">
                <input type="text" name="carnet" maxlength="11" required placeholder="Carnet" id="carnet" value="<?php echo htmlspecialchars($trabajador['carnet']); ?>" readonly>
                <p class ="error" id="carnetError">El carnet solo puede contener números</p>
            </div>
            <div class="field">
                <input type="text" name="telefono" maxlength="11" required placeholder="Teléfono" id="telefono" value="<?php echo htmlspecialchars($trabajador['telefono']); ?>">
                <p class ="error" id="telefonoError">El teléfono solo puede contener números</p>
            </div>
            <div class="field">
                <input type="text" name="salario" maxlength="10" placeholder="Salario" id="salario" value="<?php echo htmlspecialchars($trabajador['salario']); ?>">
                <p class ="error" id="salarioError">El salario solo puede contener números</p>
            </div>
            <div class="field">
                <input type="text" name="rol" maxlength="250" placeholder="Rol" id="rol" value="<?php echo htmlspecialchars($trabajador['rol']); ?>">
                <p class ="error" id="rolError">El rol solo puede contener letras y espacios</p>
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

    <script>
        function toIndex(){
          window.location.href = "../main/index.html";
        }
    </script>
    <script src="../forms_validations/Validation_Form_Worker.js"></script>

</body>
</html>

<?php
pg_close($conn); // Cerrar la conexión a la base de datos
?>
