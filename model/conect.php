<?php
$host = "localhost";
$port = "5432";
$dtb_name = "newP";
$user = "postgres";
$password = "postgreMi@";

$conection = pg_connect("host=$host port=$port dtb_name=$dtb_name user=$user password=$password");

?>