let palabraContainer = document.getElementById("palabra");
let pistasContainer = document.getElementById("pistas");
let intentosContainer = document.getElementById("intentos");
let letrasContainer = document.getElementById("letras");
let imagenAhorcado = document.getElementById("imagenAhorcado");
let cronometro = document.getElementById("cronometro");

let modal = document.getElementById("modal");
let modalMensaje = document.getElementById("modalMensaje");
let btnAceptar = document.getElementById("btnAceptar");

let btnReiniciar = document.getElementById("btnReiniciar");
let btnSalir = document.getElementById("btnSalir");
let btnPausa = document.getElementById("btnPausa");

let palabraSecreta = "";
let palabraMostrada = [];
let intentos = 8;
let juegoPausado = false;
let intervaloTiempo;
let tiempoLimite = 10 * 60;
let tiempoRestante = tiempoLimite;
let letrasOriginales = [];


let palabraImagen = "";
let imagenesPalabras = {
    "BARCELONA": "BARCELONA.png",
    "GUATEMALA": "GUATEMALA.png",
    "COMPUTADORA": "COMPUTADORA.png",
    "COCODRILO": "COCODRILO.png",
    "TELEFONO": "TELEFONO.png"
};

// --- Eventos ---
btnReiniciar.addEventListener("click", iniciarJuego);
btnSalir.addEventListener("click", () => window.location.href = "index.jsp");
btnAceptar.addEventListener("click", () => modal.classList.remove("show"));
btnPausa.addEventListener("click", () => juegoPausado ? continuarJuego() : pausarJuego());

window.addEventListener("load", iniciarJuego);

// --- Funciones ---

function togglePassword() {
    var passwordField = document.getElementById("contrasena");
    var checkbox = document.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
        passwordField.type = "text";  // Mostrar la contraseña
    } else {
        passwordField.type = "password";  // Ocultar la contraseña
    }
}

async function iniciarJuego() {
    juegoPausado = false;
    intentos = 8;
    tiempoRestante = tiempoLimite;

    try {
        let respuesta = await fetch('./Controlador?accion=obtenerPalabra');
        if (!respuesta.ok)
            throw new Error("Error al obtener la palabra del servidor");
        const palabraData = await respuesta.json();

        palabraSecreta = palabraData.palabra;
        palabraMostrada = Array(palabraSecreta.length).fill("_");

        palabraImagen = imagenesPalabras[palabraSecreta.toUpperCase()] || "default.png";

        actualizarPalabra();
        generarPistas([palabraData.pista1, palabraData.pista2, palabraData.pista3]);
        actualizarIntentos();
        generarBotones();

        imagenAhorcado.src = "images/Ahorcado0.png";
        btnPausa.textContent = "Pausa";
        btnPausa.disabled = false;

        if (intervaloTiempo)
            clearInterval(intervaloTiempo);
        iniciarCronometro();

    } catch (error) {
        console.error("Error en la petición:", error);
        palabraContainer.textContent = "No se pudo iniciar el juego.";
    }
}

function actualizarPalabra() {
    palabraContainer.textContent = palabraMostrada.join(" ");
}

function generarPistas(pistas) {
    pistasContainer.innerHTML = "";
    pistas.forEach((pista, i) => {
        let p = document.createElement("p");
        p.textContent = `Pista ${i + 1}: ${pista}`;
        pistasContainer.appendChild(p);
    });
}

function actualizarIntentos() {
    intentosContainer.textContent = `Intentos restantes: ${intentos}`;
}

function generarBotones() {
    letrasContainer.innerHTML = "";
    let abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    letrasOriginales = abecedario.split("");

    abecedario.split("").forEach(letra => {
        let btn = document.createElement("button");
        btn.textContent = letra;
        btn.classList.remove("usado");
        btn.disabled = false;
        btn.addEventListener("click", () => probarLetra(letra, btn));
        letrasContainer.appendChild(btn);
    });
}

function probarLetra(letra, boton) {
    if (juegoPausado)
        return;

    boton.disabled = true;
    boton.classList.add("usado");

    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra)
                palabraMostrada[i] = letra;
        }
        actualizarPalabra();
        if (!palabraMostrada.includes("_")) {
            mostrarModal("ganaste");
            finalizarJuego();
        }
    } else {
        intentos--;
        actualizarIntentos();
        let errores = 8 - intentos;
        if (errores > 0 && errores <= 8)
            imagenAhorcado.src = `images/Ahorcado${errores}.png`;
        if (intentos <= 0) {
            mostrarModal("perdiste");
            finalizarJuego();
        }
    }
}

function finalizarJuego() {
    deshabilitarBotones();
    clearInterval(intervaloTiempo);
    btnPausa.disabled = true;
}

function deshabilitarBotones() {
    letrasContainer.querySelectorAll("button").forEach(b => b.disabled = true);
}

function mostrarModal(estado) {
    let mensaje = "";

    if (estado === "ganaste")
        mensaje = `¡Felicitaciones! Has ganado. La palabra era:`;
    else if (estado === "perdiste")
        mensaje = `Perdiste. La palabra era:`;
    else if (estado === "tiempo")
        mensaje = `¡Se acabó el tiempo! Perdiste. La palabra era:`;

    modalMensaje.innerHTML = `
        <p>${mensaje}</p>
        <p class="palabra-modal">${palabraSecreta}</p>
        <img src="images/${palabraImagen}" alt="${palabraSecreta}" class="imagen-modal">
    `;
    modal.classList.add("show");
}

function mostrarTiempo() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    cronometro.textContent = `Tiempo restante: ${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}

function iniciarCronometro() {
    mostrarTiempo();
    intervaloTiempo = setInterval(() => {
        if (!juegoPausado) {
            tiempoRestante--;
            mostrarTiempo();
            if (tiempoRestante <= 0) {
                clearInterval(intervaloTiempo);
                mostrarModal("tiempo");
                finalizarJuego();
            }
        }
    }, 1000);
}

function pausarJuego() {
    juegoPausado = true;
    btnPausa.textContent = "Continuar";
    letrasOriginales = [];
    letrasContainer.querySelectorAll("button").forEach((btn, i) => {
        letrasOriginales[i] = btn.textContent;
        btn.textContent = "";
        btn.disabled = true;
    });
}

function continuarJuego() {
    juegoPausado = false;
    btnPausa.textContent = "Pausa";
    letrasContainer.querySelectorAll("button").forEach((btn, i) => {
        btn.textContent = letrasOriginales[i];
        if (!btn.classList.contains("usado"))
            btn.disabled = false;
    });
}
