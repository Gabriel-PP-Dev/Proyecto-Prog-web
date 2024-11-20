<?php
  include '../main/conect.php';
  
  try{
      $conn = new PDO("pgsql:host=$host; dbname=$dbname", $user, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //manejar excepciones
      //obtener nombre de la imagen recibida
      $fileName = $_FILES['imagen'] ['name'];
      $fileTempPath = $_FILES['imagen'] ['tmp_name'];
      //definir la carpeta de almacenamiento de la imagen
      $uploadFileDir = '../imgProducts/';
      $destPath = $uploadFileDir . basename($fileName);
      if(move_uploaded_file($fileTempPath, $destPath)){
      $urImage = "http://localhost/Main-Branch/Proyecto-Prog-web/imgProducts/" . basename( $fileName); //almacenamiento en la base de datos
      //obtener el nombre del formulario(protección contre inyecciones SQL)
      $nombre = $_POST["nombre"];
      $costo = $_POST["costo"];
      $precio = $_POST["precio"];
      $cantidad = $_POST["cantidad"];
      //escapar caracteres especiales del html
      $nombre = htmlspecialchars($nombre); 
      $costo = htmlspecialchars($costo);
      $precio = htmlspecialchars($precio);
      $cantidad = htmlspecialchars($cantidad);
      //escapar para sql
      $nombre =  $conn->quote($nombre); 
      $costo = $conn->quote($costo); 
      $precio = $conn->quote($precio);
      $urImage =  $conn->quote($urImage);
      $cantidad =  $conn->quote($cantidad);
      //preparar para la consulta SQl (Prevención de inyecciones sQL)
      $query = "INSERT INTO producto_almacen(nombre, costo, precio, imagen, cantidad) VALUES($nombre, $costo, $precio, $urImage, $cantidad)";
      $stmt = $conn->prepare($query);
      $stmt->execute();
      header("Location: ../main/index.html");
      exit();
      }else
        echo "Ha habido un problema con la inserción de la imagen";
  }catch(PDOException $exp){
      echo("No se pudo conectar, $exp");
  }
  $conn=null; //cerrar la conexión
?>