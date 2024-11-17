<?php

class cconection {

    public static function conectionDB(){

        $host = "localhost";
        $dtbname = "newP";
        $user = "postgres";
        $password = "postgreMi@";

        try {
            $conn = new PDO ("pgsql:host=$host; dbname=$dtbname", $user, $password);
            echo "Se conecta correctamente la base de datos";
        }
        catch (PDOException $exp){
            echo ("No se pudo conectar, $exp");
        }

        return $conn;

    }
    

}

$query = "SELECT * FROM trabajadores";
$consulta = pg_query(conectionDB, $query);

?>