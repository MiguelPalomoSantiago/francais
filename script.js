/* ============================================================
   CARNET FRANÇAIS — script.js
   Base de datos simulada + lógica de los 3 modos de juego
   ============================================================ */

/* ---------------------------------------------------------
   1. BASE DE DATOS
   --------------------------------------------------------- */

// Vocabulario compartido por los modos "ES→FR" y "FR→ES"
const VOCABULARY = [
  // A1
  { es: "hola",            fr: "bonjour",       level: "A1", type: "conector" },
  { es: "gracias",         fr: "merci",         level: "A1", type: "conector" },
  { es: "comer",           fr: "manger",        level: "A1", type: "verbo" },
  { es: "la casa",         fr: "la maison",     level: "A1", type: "sustantivo" },
  { es: "el agua",         fr: "l'eau",         level: "A1", type: "sustantivo" },
  // A2
  { es: "porque",          fr: "parce que",     level: "A2", type: "conector" },
  { es: "viajar",          fr: "voyager",       level: "A2", type: "verbo" },
  { es: "el trabajo",      fr: "le travail",    level: "A2", type: "sustantivo" },
  { es: "elegir",          fr: "choisir",       level: "A2", type: "verbo" },
  { es: "sin embargo",     fr: "cependant",     level: "A2", type: "conector" },
  // B1
  { es: "sin embargo",     fr: "toutefois",     level: "B1", type: "conector" },
  { es: "lograr",          fr: "réussir",       level: "B1", type: "verbo" },
  { es: "la reunión",      fr: "la réunion",    level: "B1", type: "sustantivo" },
  { es: "aunque",          fr: "bien que",      level: "B1", type: "conector" },
  { es: "convencer",       fr: "convaincre",    level: "B1", type: "verbo" },
  // B2
  { es: "a pesar de",      fr: "malgré",        level: "B2", type: "conector" },
  { es: "el reto",         fr: "le défi",       level: "B2", type: "sustantivo" },
  { es: "suceder / ocurrir", fr: "se produire", level: "B2", type: "verbo" },
  { es: "de hecho",        fr: "en effet",      level: "B2", type: "conector" },
  { es: "sospechar",       fr: "soupçonner",    level: "B2", type: "verbo" },
];

// Frases para completar conjugaciones — cubre los 11 tiempos solicitados
const CONJUGATIONS = [
  {
    level: "A1", tense: "Présent", infinitive: "manger",
    before: "Tous les matins, je", after: "une tartine.",
    answer: "mange",
    translation: "Todas las mañanas, como una tostada."
  },
  {
    level: "A1", tense: "Présent", infinitive: "être",
    before: "Nous", after: "très contents aujourd'hui.",
    answer: "sommes",
    translation: "Estamos muy contentos hoy."
  },
  {
    level: "A2", tense: "Passé Composé", infinitive: "manger",
    before: "Hier, nous", after: "une pomme.",
    answer: "avons mangé",
    translation: "Ayer comimos una manzana."
  },
  {
    level: "A2", tense: "Passé Composé", infinitive: "aller",
    before: "Elle", after: "au marché ce matin.",
    answer: "est allée",
    translation: "Ella fue al mercado esta mañana."
  },
  {
    level: "A2", tense: "Imparfait", infinitive: "habiter",
    before: "Quand j'étais petit, j'", after: "à Lyon.",
    answer: "habitais",
    translation: "Cuando era pequeño, vivía en Lyon."
  },
  {
    level: "A2", tense: "Futur Proche", infinitive: "partir",
    before: "Attends, je", after: "dans cinq minutes.",
    answer: "vais partir",
    translation: "Espera, voy a salir en cinco minutos."
  },
  {
    level: "B1", tense: "Futur Simple", infinitive: "finir",
    before: "Demain, tu", after: "ton projet.",
    answer: "finiras",
    translation: "Mañana terminarás tu proyecto."
  },
  {
    level: "B1", tense: "Plus-que-parfait", infinitive: "partir",
    before: "Quand je suis arrivé, ils", after: "déjà.",
    answer: "étaient déjà partis",
    translation: "Cuando llegué, ellos ya se habían ido."
  },
  {
    level: "B1", tense: "Conditionnel Présent", infinitive: "aimer",
    before: "Si j'avais le temps, j'", after: "voyager plus souvent.",
    answer: "aimerais",
    translation: "Si tuviera tiempo, me gustaría viajar más seguido."
  },
  {
    level: "B2", tense: "Futur Antérieur", infinitive: "terminer",
    before: "Quand tu arriveras, nous", after: "le dîner.",
    answer: "aurons terminé",
    translation: "Cuando llegues, ya habremos terminado la cena."
  },
  {
    level: "B2", tense: "Subjonctif Présent", infinitive: "faire",
    before: "Il faut que tu", after: "tes devoirs ce soir.",
    answer: "fasses",
    translation: "Es necesario que hagas tu tarea esta noche."
  },
  {
    level: "B2", tense: "Subjonctif Passé", infinitive: "finir",
    before: "Je suis content que vous", after: "à temps.",
    answer: "ayez fini",
    translation: "Me alegra que hayan terminado a tiempo."
  },
  {
    level: "B2", tense: "Conditionnel Passé", infinitive: "savoir",
    before: "Si j'avais su, je te l'", after: "dit.",
    answer: "aurais",
    translation: "Si lo hubiera sabido, te lo habría dicho."
  },
];

/* ---------------------------------------------------------
   2. ESTADO DE LA APLICACIÓN
   --------------------------------------------------------- */
const state = {
  level: "all",
  mode: null,
  current: null,        // ítem actual (vocab o conjugación)
  answered: false,
  score: { correct: 0, streak: 0 },
};

/* ---------------------------------------------------------
   3. REFERENCIAS AL DOM
   --------------------------------------------------------- */
const el = {
  modePills: document.querySelectorAll(".mode-pill"),
  level: document.getElementById("itemLevel"),
  tense: document.getElementById("itemTense"),
  hint: document.getElementById("promptHint"),
  word: document.getElementById("promptWord"),
  context: document.getElementById("promptContext"),
  form: document.getElementById("answerForm"),
  input: document.getElementById("answerInput"),
  submitBtn: document.getElementById("submitBtn"),
  micBtn: document.getElementById("micBtn"),
  feedback: document.getElementById("feedback"),
  stampCorrect: document.getElementById("stampCorrect"),
  stampWrong: document.getElementById("stampWrong"),
  listenBtn: document.getElementById("listenBtn"),
  nextBtn: document.getElementById("nextBtn"),
  scoreCorrect: document.getElementById("scoreCorrect"),
  scoreStreak: document.getElementById("scoreStreak"),
  supportNote: document.getElementById("supportNote"),
};

/* ---------------------------------------------------------
   4. UTILIDADES
   --------------------------------------------------------- */

// Quita acentos y normaliza para comparar respuestas con tolerancia
function normalize(str) {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/^l'/, "");
}

function filterByLevel(list) {
  if (state.level === "all") return list;
  return list.filter((item) => item.level === state.level);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------------------------------------------------------
   5. SÍNTESIS DE VOZ (SpeechSynthesis) — modo 1
   --------------------------------------------------------- */
let frenchVoice = null;

function loadVoices() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  frenchVoice =
    voices.find((v) => v.lang === "fr-FR") ||
    voices.find((v) => v.lang && v.lang.startsWith("fr")) ||
    null;
}

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speakFrench(text) {
  if (!("speechSynthesis" in window)) {
    el.feedback.textContent =
      "Tu navegador no soporta síntesis de voz (SpeechSynthesis).";
    el.feedback.className = "feedback wrong";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.92;
  if (frenchVoice) utterance.voice = frenchVoice;
  window.speechSynthesis.speak(utterance);
}

/* ---------------------------------------------------------
   6. MODO 2: se resolvió con reproducción de audio en lugar de
   reconocimiento de voz, ya que SpeechRecognition no está
   disponible en Safari / iOS. Reutiliza speakFrench() (arriba).
   --------------------------------------------------------- */

/* ---------------------------------------------------------
   7. SELECCIÓN Y RENDER DE EJERCICIOS
   --------------------------------------------------------- */

function availableModes() {
  const modes = [];
  if (filterByLevel(VOCABULARY).length) modes.push("es-fr", "fr-es");
  if (filterByLevel(CONJUGATIONS).length) modes.push("conjugate");
  return modes;
}

function nextExercise() {
  resetCardUI();

  const modes = availableModes();
  if (!modes.length) {
    el.word.textContent = "No hay ejercicios para este nivel todavía.";
    return;
  }
  state.mode = randomFrom(modes);
  highlightModePill(state.mode);

  if (state.mode === "es-fr") {
    state.current = randomFrom(filterByLevel(VOCABULARY));
    renderEsToFr(state.current);
  } else if (state.mode === "fr-es") {
    state.current = randomFrom(filterByLevel(VOCABULARY));
    renderFrToEs(state.current);
  } else {
    state.current = randomFrom(filterByLevel(CONJUGATIONS));
    renderConjugation(state.current);
  }
}

function highlightModePill(mode) {
  el.modePills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.mode === mode);
  });
}

function resetCardUI() {
  state.answered = false;
  el.input.value = "";
  el.input.classList.remove("correct", "wrong");
  el.input.disabled = false;
  el.submitBtn.disabled = false;
  el.submitBtn.hidden = false;
  el.feedback.textContent = "";
  el.feedback.className = "feedback";
  el.stampCorrect.hidden = true;
  el.stampWrong.hidden = true;
  el.micBtn.hidden = true;
  el.listenBtn.hidden = true;
  el.nextBtn.hidden = true;
  el.context.hidden = true;
  el.tense.hidden = true;
  el.input.focus();
}

/* --- Modo 1: ES → FR con audio --- */
function renderEsToFr(item) {
  el.level.textContent = item.level;
  el.hint.textContent = `Traduce al francés (${item.type})`;
  el.word.textContent = item.es;
  el.input.placeholder = "Escribe la palabra en francés…";
}

/* --- Modo 2: FR → ES con validación de voz --- */
function renderFrToEs(item) {
  el.level.textContent = item.level;
  el.hint.textContent = `¿Qué significa esta palabra? (${item.type})`;
  el.word.textContent = item.fr;
  el.input.placeholder = "Escribe el significado en español…";
}

/* --- Modo 3: completar conjugación --- */
function renderConjugation(item) {
  el.level.textContent = item.level;
  el.tense.hidden = false;
  el.tense.textContent = item.tense;
  el.hint.textContent = "Completa con la conjugación correcta";
  el.word.textContent = `(${item.infinitive})`;
  el.context.hidden = false;
  el.context.innerHTML = `${item.before} <strong>_____</strong> ${item.after}`;
  el.input.placeholder = "Escribe la conjugación…";
}

/* ---------------------------------------------------------
   8. VALIDACIÓN DE RESPUESTAS
   --------------------------------------------------------- */
function checkAnswer() {
  if (state.answered) return;
  const value = el.input.value.trim();
  if (!value) return;

  let isCorrect = false;
  let correctAnswer = "";

  if (state.mode === "es-fr") {
    correctAnswer = state.current.fr;
    isCorrect = normalize(value) === normalize(correctAnswer);
  } else if (state.mode === "fr-es") {
    correctAnswer = state.current.es;
    // Tolerante: acepta cualquiera de las variantes separadas por " / "
    const variants = correctAnswer.split("/").map((v) => normalize(v));
    isCorrect = variants.includes(normalize(value));
  } else {
    correctAnswer = state.current.answer;
    isCorrect = normalize(value) === normalize(correctAnswer);
  }

  state.answered = true;
  el.input.disabled = true;
  el.submitBtn.hidden = true;
  el.nextBtn.hidden = false;

  if (isCorrect) {
    handleCorrect(correctAnswer);
  } else {
    handleWrong(correctAnswer);
  }
}

function handleCorrect(correctAnswer) {
  state.score.correct += 1;
  state.score.streak += 1;
  updateScore();

  el.input.classList.add("correct");
  el.stampCorrect.hidden = false;
  el.feedback.textContent = "¡Correcto! " + extraFeedback();
  el.feedback.className = "feedback correct";

  if (state.mode === "es-fr") {
    el.micBtn.hidden = false;
    el.listenBtn.hidden = false;
  } else if (state.mode === "fr-es") {
    el.listenBtn.hidden = false;
  }
}

function handleWrong(correctAnswer) {
  state.score.streak = 0;
  updateScore();

  el.input.classList.add("wrong");
  el.stampWrong.hidden = false;
  el.feedback.textContent = `La respuesta correcta era: "${correctAnswer}". ${extraFeedback()}`;
  el.feedback.className = "feedback wrong";

  // Aun en un fallo, deja escuchar la pronunciación correcta
  if (state.mode === "es-fr" || state.mode === "fr-es") {
    el.listenBtn.hidden = false;
  }
}

function extraFeedback() {
  if (state.mode === "conjugate") return state.current.translation;
  return "";
}

function updateScore() {
  el.scoreCorrect.textContent = state.score.correct;
  el.scoreStreak.textContent = state.score.streak;
}

/* ---------------------------------------------------------
   9. EVENTOS
   --------------------------------------------------------- */

el.form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkAnswer();
});

el.micBtn.addEventListener("click", () => {
  if (state.mode === "es-fr" && state.current) {
    speakFrench(state.current.fr);
  }
});

el.listenBtn.addEventListener("click", () => {
  if (!state.current) return;
  const textToSpeak = state.mode === "conjugate"
    ? `${state.current.before} ${state.current.answer} ${state.current.after}`
    : state.current.fr;
  speakFrench(textToSpeak);
});

el.nextBtn.addEventListener("click", nextExercise);

/* ---------------------------------------------------------
   10. INICIALIZACIÓN
   --------------------------------------------------------- */
function init() {
  el.supportNote.textContent =
    "Carnet Français · practica de la mano de la Web Speech API — compatible con Safari y Chrome.";
  nextExercise();
}

init();
