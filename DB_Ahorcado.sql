DROP DATABASE IF EXISTS DB_Ahorcado;
CREATE DATABASE DB_Ahorcado;
USE DB_Ahorcado;

CREATE TABLE Usuario(
codigo_usuario INT AUTO_INCREMENT,
correo_usuario VARCHAR (250),
contraseña_usuario VARCHAR(250),
PRIMARY KEY PK_codigo_usuario(codigo_usuario)
);

CREATE TABLE Palabra(
codigo_palabra INT AUTO_INCREMENT,
palabra VARCHAR(50),
pista1 VARCHAR(50),
pista2 VARCHAR(50),
pista3 VARCHAR(50),
PRIMARY KEY PK_codigo_palabra(codigo_palabra)
);

INSERT INTO Palabra (palabra, pista1, pista2, pista3)
VALUES  ('BARCELONA', 'Ciudad en España', 'Tiene la famosa iglesia La Sagrada Familia', 'Conocida por el mejor club de fútbol'),
		('GUATEMALA', 'País de Centroamérica', 'Capital con mismo nombre', 'Famoso por el quetzal'),
		('COMPUTADORA', 'Se usa para programar', 'Puede ser portátil', 'Procesa información'),
		('COCODRILO', 'Es un animal grande', 'Es un reptil', 'Suelen vivir en mucha soledad'),
        ('TELEFONO', 'Sirve para comunicación', 'Puede ser móvil o fijo', 'Se conecta a la red');
        
INSERT INTO Usuario (correo_usuario, contraseña_usuario)
VALUES ('xaportilloe@gmail.com', 'Rokaxixa'),
	   ('miltonlarita@gmail.com', 'Pachon'	);

delimiter //
create procedure sp_ObtenerPalabraAleatoria()
begin
    select codigo_palabra, palabra, pista1, pista2, pista3
    from palabra
    order by rand()
    limit 1;
end //
delimiter ;
        
        
SELECT * FROM Palabra;

SELECT * FROM Usuario;
