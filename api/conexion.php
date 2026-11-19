<?php

$host = getenv("DB_HOST");
$base_datos = getenv("DB_NAME");
$usuario = getenv("DB_USER");
$password = getenv("DB_PASSWORD");

$conexion = new PDO(
    "mysql:host=$host;dbname=$base_datos;charset=utf8mb4",
    $usuario,
    $password
);

?>