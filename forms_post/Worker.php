<?php
  include '../main/conect.php';

  
  if (isset($_POST["idLocal"])) {
    try{
      $conn = new PDO("pgsql:host=$host; dbname=$dbname", $user, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //manejar excepciones
      //obtener el nombre del formulario(protección contre inyecciones SQL)
      $nombre = $_POST["nombre"];
      $carnet = $_POST["carnet"];
      $telefono = $_POST["telefono"];
      $salario = $_POST["salario"];
      $rol = $_POST["rol"];
      $idLocal= $_POST["idLocal"];
      //escapar caracteres especiales del html
      $nombre = htmlspecialchars($nombre); 
      $carnet = htmlspecialchars($carnet); 
      $telefono = htmlspecialchars($telefono);  
      $salario = htmlspecialchars($salario); 
      $rol = htmlspecialchars($rol); 
      $idLocal= htmlspecialchars($idLocal);
      //escapar para sql
      $nombre =  $conn->quote($nombre); 
      $carnet = $conn->quote($carnet);
      $telefono = $conn->quote($telefono);
      $salario = $conn->quote($salario);
      $rol = $conn->quote($rol); 
      $idLocal= $conn->quote($idLocal); 
      //preparar para la consulta SQl (Prevención de inyecciones sQL)
      $query = "INSERT INTO trabajador(nombre, carnet, telefono, salario, rol, id_local) VALUES($nombre, $carnet, $telefono, $salario, $rol, $idLocal)";
      $stmt = $conn->prepare($query);
      $stmt->execute();
      header("Location: ../main/index.html");
      exit();
    }catch(PDOException $exp){
      echo("No se pudo conectar, $exp");
  }
  } else {
    echo "Error: No se seleccionó un local.";
  }
  $conn=null; //cerrar la conexión
?>