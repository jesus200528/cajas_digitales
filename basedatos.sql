
CREATE DATABASE cajas_digitales;

USE cajas_digitales;

CREATE TABLE cajas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    caja_id INT NOT NULL,
    contenido TEXT NOT NULL,
    FOREIGN KEY (caja_id)
        REFERENCES cajas(id)
        ON DELETE CASCADE
);

SHOW DATABASES;
