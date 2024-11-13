<?php
include '../model/conect.php';
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
        <h1>Registro de trabajadores</h1>
    </header>

    <div class="container">

        <div class="table-header">
            <h2>Trabajadores</h2>
        </div>

        <div class="search-area-container">
            <div class="search-area">
                <label for="search">Buscar:</label>
                <input type="text" id="search" placeholder="Buscar aqui..">
            </div>
        </div>

        <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Carnet</th>
                <th>Rol</th>
                <th>Salario</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>

            <?php
              $sql = conect->query("SELECT * FROM trabajador");
              while($datos =$sql->fetch_object()) { ?>
                <tr>
                 <td><?=$datos->id_local ?></td>
                 <td><?=$datos->carnet ?></td>
                 <td><?=$datos->rol ?></td>
                 <td><?=$datos->salario ?></td>
                 <td><?=$datos->id ?></td>
                </tr>
              <?php }
              
              ?>

            </tbody>
          </table>
    </main>

    <script>
        fetch('menu.html')
        .then(response => response.text())
        .then(data => document.getElementById('menu-nav').innerHTML = data);
    </script>
    
</body>
</html>