<%--
    Document : juego
    Created on : 2 sept 2025, 08:38:08
    Author      : informatica
--%>

<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Ahorcado</title>
        <link rel="stylesheet" href="css/style.css" />
    </head>
    <body>
        <h1>Juego de Ahorcado</h1>
        <h1>INSTRUCCIONES</h1>
        <h2>Intenta adivinar la palabra con las pistas que se te dan y sin pasar el limite de tiempo ni de intentos</h2>

        <div id="cronometro"></div>

        <div class="juego-container">
            <div class="palabra-container">
                <div id="palabra"></div>
            </div>
            <div class="ahorcado-container">
                <img id="imagenAhorcado" src="images/Ahorcado0.png" alt="Ahorcado" />
            </div>
        </div>

        <div id="pistas"></div>
        <div id="intentos"></div>
        <div id="letras"></div>

        <div class="controles">
            <button id="btnReiniciar">Reiniciar</button>
            <button id="btnPausa">Pausa</button>
            <button id="btnSalir">Salir</button>
        </div>

        <div id="modal" class="modal">
            <div class="modal-content">
                <p id="modalTexto"></p>
                <p id="modalPalabra" class="palabra-modal"></p>
                <img id="modalImagen" class="imagen-modal" alt="">
                <button id="btnAceptar">Aceptar</button>
            </div>
        </div>


        <script src="js/script.js"></script>
    </body>
</html>