<?php
    include '../main/conect.php';
    
    try{
        $conn = new PDO("pgsql:host=$host; dbname=$dbname", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //manejar excepciones
        //verificar que el trabajador y el producto pertenezcan al mismo local
        $idtrabajador= (string)$_POST["idTrabajador"];
        $idproducto = intval($_POST["idProducto"]);
        $query = "SELECT pl.id_local AS idLocal
              FROM local l1
              INNER JOIN producto_local pl ON l1.id = pl.id_local
              INNER JOIN trabajador t ON l1.id = t.id_local
              WHERE pl.id_producto = :idProducto AND t.carnet = :idTrabajador AND pl.id_local = t.id_local";

        // Preparar la consulta
       $stmt = $conn->prepare($query);
    
        // Asignar los valores de los parámetros
       $stmt->bindParam(':idProducto', $idproducto);
       $stmt->bindParam(':idTrabajador', $idtrabajador);
       // Ejecutar la consulta
       $stmt->execute();
       // Obtener los resultados de la consulta
       $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // Verificar si hay coincidencias
        if ($result) {
             $idLocalProducto = $result['idLocal'];
             //pprotección contre inyecciones SQL
             $cantidad = $_POST["cantidad"];
             $carnetUsuario = $_POST["carnet"];
             //escapar caracteres especiales del html
             $cantidad = htmlspecialchars($cantidad); 
             $carnetUsuario = htmlspecialchars($carnetUsuario);
             $idtrabajador = htmlspecialchars($idtrabajador); 
             $idproducto = htmlspecialchars($idproducto);
             $idlocal = htmlspecialchars($idLocalProducto);
             //escapar para sql
             $cantidad =  $conn->quote($cantidad); 
             $carnetUsuario = $conn->quote($carnetUsuario);
             $idtrabajador =  $conn->quote($idtrabajador); 
             $idproducto = $conn->quote($idproducto);
             $idlocal = $conn->quote($idlocal);
             //preparar para la consulta SQl (Prevención de inyecciones sQL)
             $query = "INSERT INTO local(carnet_cliente, id_producto, carnet_trabajador, id_local) VALUES($carnetUsuario, $idproducto, $idtrabajador, $idlocal)";
             $stmt = $conn->prepare($query);
             $stmt->execute();       
             header("Location: ../main/index.html");
             exit(); 
        } else {
            echo "El trabajador y el producto seleccionado pertenecen a diferentes locales. No se pudo realizar la venta";
        }
    }catch(PDOException $exp){
        echo("No se pudo conectar, $exp");
    }
    $conn=null; //cerrar la conexión
?>