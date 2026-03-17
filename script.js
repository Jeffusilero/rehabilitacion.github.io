let fraseArray = [];
let vozMasculina = null;

// Cargar las voces del sistema
function cargarVoces() {
    const voces = window.speechSynthesis.getVoices();
    // Intenta buscar una voz masculina en español
    vozMasculina = voces.find(v => (v.lang.includes('es') && 
        (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Pablo') || v.name.includes('Google español')))) 
        || voces.find(v => v.lang.includes('es'));
}

// Escuchar cuando las voces cambian
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = cargarVoces;
}

// Función base para hablar
function hablar(texto, velocidad = 0.8) {
    window.speechSynthesis.cancel(); // Cancela cualquier sonido previo
    const u = new SpeechSynthesisUtterance(texto);
    if (vozMasculina) u.voice = vozMasculina;
    u.lang = 'es-ES';
    u.rate = velocidad; 
    u.pitch = 0.75; // Tono un poco más grave
    window.speechSynthesis.speak(u);
}

// PARA LOS PRIMEROS 6 BOTONES: Suenan al tocar
function addDirecto(palabra) {
    fraseArray.push(palabra);
    actualizarVisual();
    hablar(palabra, 1.0);
}

// PARA EL RESTO DE BOTONES: Guardan silencio al tocar
function addSilencio(palabra) {
    fraseArray.push(palabra);
    actualizarVisual();
}

// Actualiza el recuadro blanco donde se ven las palabras
function actualizarVisual() {
    const area = document.getElementById('area-frase');
    area.innerHTML = '';
    fraseArray.forEach(p => {
        const div = document.createElement('div');
        div.className = 'palabra-bloque';
        div.innerText = p;
        area.appendChild(div);
    });
}

// FUNCION DEL BOTÓN VERDE "HABLAR FRASE"
function reproducirFrase() {
    if (fraseArray.length === 0) return;
    hablar(fraseArray.join(' '), 0.85);
}

// FUNCION DEL BOTÓN ROJO "BORRAR"
function limpiarTodo() {
    fraseArray = [];
    actualizarVisual();
    window.speechSynthesis.cancel();
}

// Iniciar carga de voces
cargarVoces();