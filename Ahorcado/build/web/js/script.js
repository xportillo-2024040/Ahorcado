// Variables
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

let palabras = [
    {palabra: "BARCELONA", pistas: ["Ciudad en España", "Tiene la famosa iglesia La Sagrada Familia", "Conocida por el mejor club de fútbol"], imagen: "BARCELONA.png"},
    {palabra: "GUATEMALA", pistas: ["País de Centroamérica", "Capital con mismo nombre", "Famoso por el quetzal"], imagen: "GUATEMALA.png"},
    {palabra: "COMPUTADORA", pistas: ["Se usa para programar", "Puede ser portátil", "Procesa información"], imagen: "COMPUTADORA.png"},
    {palabra: "COCODRILO", pistas: ["Es un animal grande", "Es un reptil", "Suelen vivir en mucha soledad"], imagen: "COCODRILO.png"},
    {palabra: "TELEFONO", pistas: ["Sirve para comunicación", "Puede ser móvil o fijo", "Se conecta a la red"], imagen: "TELEFONO.png"}
];

let palabraSecreta = "";
let palabraMostrada = [];
let intentos = 8;
let juegoPausado = false;
let intervaloTiempo;
let tiempoLimite = 10 * 60;
let tiempoRestante = tiempoLimite;
let letrasOriginales = [];

// Eventos 
btnReiniciar.addEventListener("click", iniciarJuego);

btnSalir.addEventListener("click", function () {
    window.location.href = "index.jsp";
});

btnAceptar.addEventListener("click", function () {
    modal.classList.remove("show");
});

btnPausa.addEventListener("click", () => {
    if (juegoPausado) {
        continuarJuego();
    } else {
        pausarJuego();
    }
});

// Funciones 

function iniciarJuego() {
    let obj = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = obj.palabra;
    palabraMostrada = Array(palabraSecreta.length).fill("_");
    intentos = 8;
    tiempoRestante = tiempoLimite;

    actualizarPalabra();
    generarPistas(obj.pistas);
    actualizarIntentos();
    generarBotones();

    imagenAhorcado.src = "images/Ahorcado0.png";

    if (intervaloTiempo)
        clearInterval(intervaloTiempo);
    juegoPausado = false;
    btnPausa.textContent = "Pausa";
    btnPausa.disabled = false;
    iniciarCronometro();
}

function actualizarPalabra() {
    palabraContainer.textContent = palabraMostrada.join(" ");
}

function generarPistas(pistas) {
    pistasContainer.innerHTML = "";
    for (let i = 0; i < pistas.length; i++) {
        let pista = document.createElement("p");
        pista.textContent = `Pista ${i + 1}: ${pistas[i]}`;
        pistasContainer.appendChild(pista);
    }
}

function actualizarIntentos() {
    intentosContainer.textContent = `Intentos restantes: ${intentos}`;
}

function generarBotones() {
    letrasContainer.innerHTML = "";
    let abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < abecedario.length; i++) {
        let letra = abecedario[i];
        let btn = document.createElement("button");
        btn.textContent = letra;
        btn.classList.remove("usado");
        btn.disabled = false;
        btn.addEventListener("click", function () {
            probarLetra(letra, btn);
        });
        letrasContainer.appendChild(btn);
    }
    letrasOriginales = abecedario.split("");
}

function probarLetra(letra, boton) {
    if (juegoPausado)
        return;
    boton.disabled = true;
    boton.classList.add("usado");
    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                palabraMostrada[i] = letra;
            }
        }
        actualizarPalabra();
        if (!palabraMostrada.includes("_")) {
            mostrarModal("ganaste");
            deshabilitarBotones();
            clearInterval(intervaloTiempo);
            deshabilitarPausa();
        }
    } else {
        intentos--;
        actualizarIntentos();
        let errores = 8 - intentos;
        if (errores > 0 && errores <= 8) {
            imagenAhorcado.src = `images/Ahorcado${errores}.png`;
        }

        if (intentos <= 0) {
            mostrarModal("perdiste");
            deshabilitarBotones();
            clearInterval(intervaloTiempo);
            deshabilitarPausa();
        }
    }
}

function deshabilitarBotones() {
    let botones = letrasContainer.querySelectorAll("button");
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
}

function deshabilitarPausa() {
    btnPausa.disabled = true;
}

function mostrarModal(estado) {
    let mensaje = "";
    let imagenRuta = "";

    let objPalabraActual = palabras.find(p => p.palabra === palabraSecreta);

    if (estado === "ganaste") {
        mensaje = "¡Felicitaciones! HAS GANADO La palabra era:";
        imagenRuta = `images/${objPalabraActual.imagen}`;
    } else if (estado === "perdiste") {
        mensaje = "Perdiste. La palabra era:";
        imagenRuta = `images/${objPalabraActual.imagen}`;
    } else if (estado === "tiempo") {
        mensaje = "¡Se acabó el tiempo! Perdiste. La palabra era:";
        imagenRuta = `images/${objPalabraActual.imagen}`;
    }
    document.getElementById("modalTexto").textContent = mensaje;
    document.getElementById("modalPalabra").textContent = palabraSecreta;
    document.getElementById("modalImagen").src = imagenRuta;
    document.getElementById("modalImagen").alt = palabraSecreta;
    modal.classList.add("show");
}


function mostrarTiempo() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    cronometro.textContent = `Tiempo restante: ${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}

function iniciarCronometro() {
    mostrarTiempo();
    if (intervaloTiempo)
        clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(() => {
        if (!juegoPausado) {
            tiempoRestante--;
            mostrarTiempo();
            if (tiempoRestante <= 0) {
                clearInterval(intervaloTiempo);
                mostrarModal("tiempo");
                deshabilitarBotones();
                deshabilitarPausa();
            }
        }
    }, 1000);
}

function pausarJuego() {
    juegoPausado = true;
    btnPausa.textContent = "Continuar";

    const botones = letrasContainer.querySelectorAll("button");
    letrasOriginales = [];
    botones.forEach((btn, i) => {
        letrasOriginales[i] = btn.textContent;
        btn.textContent = "";
        btn.disabled = true;
    });
}

function continuarJuego() {
    juegoPausado = false;
    btnPausa.textContent = "Pausa";

    let botones = letrasContainer.querySelectorAll("button");
    botones.forEach((btn, i) => {
        btn.textContent = letrasOriginales[i];
        if (!btn.classList.contains("usado")) {
            btn.disabled = false;
        }
    });
}

window.addEventListener("load", iniciarJuego);