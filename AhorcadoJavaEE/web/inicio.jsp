<%-- 
    Document   : index
    Created on : 2 sept 2025, 08:35:41
    Author     : informatica
--%>

<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Bienvenido</title>
        <link rel="stylesheet" href="css/style.css" />
    </head>
    <body style="background-image: url('images/FONDO.png'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div class="pantalla-inicio">
            <h1>¡¡Bienvenido al juego de Ahorcado</h1>
            <h1>Vamos a ver si puedes adivinar las palabras!!</h1>
            <form action="juego.jsp" method="get">
                <button type="submit">Iniciar Juego</button>
            </form>
        </div>
    </body>
</html>



