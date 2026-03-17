let fraseArray = [];
let vozMasculina = null;

function cargarVoces() {
    const voces = window.speechSynthesis.getVoices();
    vozMasculina = voces.find(v => (v.lang.includes('es') && 
        (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Pablo') || v.name.includes('Google español')))) 
        || voces.find(v => v.lang.includes('es'));
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = cargarVoces;
}

function hablar(texto, velocidad = 0.8) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    if (vozMasculina) u.voice = vozMasculina;
    u.lang = 'es-ES';
    u.rate = velocidad; 
    u.pitch = 0.75; 
    window.speechSynthesis.speak(u);
}

function add(palabra) {
    fraseArray.push(palabra);
    actualizarVisual();
    hablar(palabra, 1.0);
}

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

function reproducirFrase() {
    if (fraseArray.length === 0) return;
    hablar(fraseArray.join(' '), 0.85);
}

function limpiarTodo() {
    fraseArray = [];
    actualizarVisual();
    window.speechSynthesis.cancel();
}

cargarVoces();