<?php
  $host = "localhost";
  $dtb_name = "PCDoctor";
  $user = "postgres";
  $password = "corazoncito*2024";
  
  try{
      $conn = new PDO("pgsql:host=$host; dbname=$dtb_name", $user, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //manejar excepciones
      //obtener nombre de la imagen recibida
      $fileName = $_FILES['imagen'] ['name'];
      $fileTempPath = $_FILES['imagen'] ['tmp_name'];
      //definir la carpeta de almacenamiento de la imagen
      $uploadFileDir = '../images_user/';
      $destPath = $uploadFileDir . basename($fileName);
      if(move_uploaded_file($fileTempPath, $destPath)){
      $urImage = "images_user/" . basename( $fileName); //almacenamiento en la base de datos
      //obtener el nombre del formulario(protección contre inyecciones SQL)
      $nombre = $_POST["nombre"];
      $costo = $_POST["costo"];
      $precio = $_POST["precio"];
      //escapar caracteres especiales del html
      $nombre = htmlspecialchars($nombre); 
      $costo = htmlspecialchars($costo);
      $precio = htmlspecialchars($precio);
      //escapar para sql
      $nombre =  $conn->quote($nombre); 
      $costo = $conn->quote($costo); 
      $precio = $conn->quote($precio);
      $urImage =  $conn->quote($urImage);
      //preparar para la consulta SQl (Prevención de inyecciones sQL)
      $query = "INSERT INTO producto_almacen(nombre, costo, precio, imagen) VALUES($nombre, $costo, $precio, $urImage)";
      $stmt = $conn->prepare($query);
      $stmt->execute();
      }else
        echo "Ha habido un problema con la inserción de la imagen";
  }catch(PDOException $exp){
      echo("No se pudo conectar, $exp");
  }
  $conn=null; //cerrar la conexión
?>