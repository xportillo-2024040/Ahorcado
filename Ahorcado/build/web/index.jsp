<%-- 
    Document   : index
    Created on : 2 sept 2025, 08:35:41
    Author     : informatica
--%>

<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <title>Iniciar Sesión - Ahorcado</title>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
    </head>

    <body class="pagina-inicio">

        <header>
            <h1>Ahorcado</h1>
        </header>

        <main class="contenido-inicio">
            <section>
                <h2>Iniciar Sesión</h2>
                <form action="Validar" method="POST" class="form-login" autocomplete="off">
                    <div class="campo">
                        <label for="usuario">Usuario:</label>
                        <div>
                            <i class='bx bxs-user'></i>
                            <input type="text" id="usuario" name="usuario" required autocomplete="off"
                                   value="<%= request.getAttribute("usuario") != null ? request.getAttribute("usuario") : ""%>">
                        </div>
                    </div>
                    <div class="campo">
                        <label for="contrasena">Contraseña:</label>
                        <div>
                            <i class='bx bxs-lock-alt'></i>
                            <input type="password" id="contrasena" name="contrasena" required autocomplete="off">
                        </div>
                    </div>
                    <div class="campo">
                        <label><input type="checkbox" onclick="togglePassword()"> Ver contraseña</label>
                    </div>
                    <div class="botones-inicio">
                        <button type="submit" name="accion" value="Ingresar">Entrar</button>
                    </div>

                    <!-- Aquí mostramos el mensaje de error solo si existe -->
                    <% if (request.getAttribute("error") != null) {%>
                    <div id="mensaje-error" style="color:red; font-size:14px; margin-top: 10px;">
                        <%= request.getAttribute("error")%>
                    </div>
                    <% }%>

                </form>
            </section>
        </main>

        <footer>
            <p>&copy; Ahorcado Xavier Portillo</p>
        </footer>

        <script src="js/script.js"></script>

    </body>

</html>

