<?php
  $host = "localhost";
  $dtb_name = "PCDoctor";
  $user = "postgres";
  $password = "corazoncito*2024";
  
  try{
      $conn = new PDO("pgsql:host=$host; dbname=$dtb_name", $user, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //manejar excepciones
      //obtener el nombre del formulario(protección contre inyecciones SQL)
      $nombre = $_POST["nombre"];
      $carnet = $_POST["carnet"];
      $telefono = $_POST["telefono"];
      $salario = $_POST["salario"];
      $rol = $_POST["rol"];
      //escapar caracteres especiales del html
      $nombre = htmlspecialchars($nombre); 
      $carnet = htmlspecialchars($carnet); 
      $telefono = htmlspecialchars($telefono);  
      $salario = htmlspecialchars($salario); 
      $rol = htmlspecialchars($rol); 
      //escapar para sql
      $nombre =  $conn->quote($nombre); 
      $carnet = $conn->quote($carnet);
      $telefono = $conn->quote($telefono);
      $salario = $conn->quote($salario);
      $rol = $conn->quote($rol); 
      //preparar para la consulta SQl (Prevención de inyecciones sQL)
      $query = "INSERT INTO trabajador(nombre, carnet, telefono, salario, rol, id_local) VALUES($nombre, $carnet, $telefono, $salario, $rol, 44)";
      $stmt = $conn->prepare($query);
      $stmt->execute();
  }catch(PDOException $exp){
      echo("No se pudo conectar, $exp");
  }
  $conn=null; //cerrar la conexión
?>