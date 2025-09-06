DROP DATABASE IF EXISTS DB_Ahorcado;
CREATE DATABASE DB_Ahorcado;
USE DB_Ahorcado;

CREATE TABLE Palabra(
codigoPalabra INT AUTO_INCREMENT,
palabra VARCHAR(50),
pista1 VARCHAR(50),
pista2 VARCHAR(50),
pista3 VARCHAR(50),
PRIMARY KEY PK_codigoPalabra(codigoPalabra)
);

INSERT INTO Palabra (palabra, pista1, pista2, pista3)
VALUES  ('BARCELONA', 'Ciudad en España', 'Tiene la famosa iglesia La Sagrada Familia', 'Conocida por el mejor club de fútbol'),
		('GUATEMALA', 'País de Centroamérica', 'Capital con mismo nombre', 'Famoso por el quetzal'),
		('COMPUTADORA', 'Se usa para programar', 'Puede ser portátil', 'Procesa información'),
		('COCODRILO', 'Es un animal grande', 'Es un reptil', 'Suelen vivir en mucha soledad'),
        ('TELEFONO', 'Sirve para comunicación', 'Puede ser móvil o fijo', 'Se conecta a la red');
        
SELECT * FROM Palabra;