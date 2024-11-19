<?php
    $host = "localhost";
    $dtb_name = "PCDoctor";
    $user = "postgres";
    $password = "pg";
    
    try{
        $conn = new PDO("pgsql:host=$host; dbname=$dtb_name", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //manejar excepciones
        //obtener el nombre del formulario(protección contre inyecciones SQL)
        $nombre = $_POST["nombre"];
        $direccion = $_POST["direccion"];
        //escapar caracteres especiales del html
        $nombre = htmlspecialchars($nombre); 
        $direccion = htmlspecialchars($direccion);
        //escapar para sql
        $nombre =  $conn->quote($nombre); 
        $direccion = $conn->quote($direccion);
        //preparar para la consulta SQl (Prevención de inyecciones sQL)
        $query = "INSERT INTO local(nombre, direccion) VALUES($nombre, $direccion)";
        $stmt = $conn->prepare($query);
        $stmt->execute();
    }catch(PDOException $exp){
        echo("No se pudo conectar, $exp");
    }
    $conn=null; //cerrar la conexión
?>