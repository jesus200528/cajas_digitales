
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit;
}

include "conexion.php";

$datos = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $consulta = $conexion->query("SELECT * FROM cajas");
    $cajas = $consulta->fetchAll(PDO::FETCH_ASSOC);

    foreach ($cajas as &$caja) {
        $consulta = $conexion->prepare(
            "SELECT * FROM notas WHERE caja_id = ?"
        );

        $consulta->execute([$caja["id"]]);
        $caja["notas"] = $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode($cajas);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($datos["accion"] == "agregar_caja") {

        $consulta = $conexion->prepare(
            "INSERT INTO cajas (nombre) VALUES (?)"
        );

        $consulta->execute([$datos["nombre"]]);
    }

    if ($datos["accion"] == "agregar_nota") {

        $consulta = $conexion->prepare(
            "INSERT INTO notas (caja_id, contenido) VALUES (?, ?)"
        );

        $consulta->execute([
            $datos["caja_id"],
            $datos["contenido"]
        ]);
    }

    echo json_encode(["mensaje" => "Guardado correctamente"]);
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {

    if ($datos["accion"] == "borrar_nota") {

        $consulta = $conexion->prepare(
            "DELETE FROM notas WHERE id = ?"
        );

        $consulta->execute([$datos["id"]]);
    }

    if ($datos["accion"] == "borrar_caja") {

        $consulta = $conexion->prepare(
            "DELETE FROM cajas WHERE id = ?"
        );

        $consulta->execute([$datos["id"]]);
    }

    echo json_encode(["mensaje" => "Eliminado correctamente"]);
}

?>
