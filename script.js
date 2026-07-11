/* ============================================================
   CARNET FRANÇAIS — script.js
   Base de datos simulada + lógica de los 3 modos de juego
   ============================================================ */

/* ---------------------------------------------------------
   1. BASE DE DATOS
   --------------------------------------------------------- */

// Estas listas son el banco de RESPALDO (por si el Excel no carga, por ejemplo
// al abrir el archivo con doble clic en vez de por un servidor/GitHub Pages).
// Si datos.xlsx se carga correctamente, estas listas se REEMPLAZAN por su contenido.
let VOCABULARY = [
  // ---------- A1 ----------
  { es: "hola",            fr: "bonjour",       level: "A1", type: "conector" },
  { es: "gracias",         fr: "merci",         level: "A1", type: "conector" },
  { es: "y",               fr: "et",            level: "A1", type: "conector" },
  { es: "pero",            fr: "mais",          level: "A1", type: "conector" },
  { es: "comer",           fr: "manger",        level: "A1", type: "verbo" },
  { es: "hablar",          fr: "parler",        level: "A1", type: "verbo" },
  { es: "vivir",           fr: "habiter",       level: "A1", type: "verbo" },
  { es: "amar / gustar",   fr: "aimer",         level: "A1", type: "verbo" },
  { es: "mirar",           fr: "regarder",      level: "A1", type: "verbo" },
  { es: "la casa",         fr: "la maison",     level: "A1", type: "sustantivo" },
  { es: "el agua",         fr: "l'eau",         level: "A1", type: "sustantivo" },
  { es: "el gato",         fr: "le chat",       level: "A1", type: "sustantivo" },
  { es: "el amigo",        fr: "l'ami",         level: "A1", type: "sustantivo" },
  { es: "la mesa",         fr: "la table",      level: "A1", type: "sustantivo" },
  { es: "grande",          fr: "grand",         level: "A1", type: "adjetivo" },
  { es: "pequeño",         fr: "petit",         level: "A1", type: "adjetivo" },
  { es: "contento",        fr: "content",       level: "A1", type: "adjetivo" },
  { es: "cansado",         fr: "fatigué",       level: "A1", type: "adjetivo" },
  { es: "bien",            fr: "bien",          level: "A1", type: "adverbio" },
  { es: "aquí",            fr: "ici",           level: "A1", type: "adverbio" },
  { es: "ahora",           fr: "maintenant",    level: "A1", type: "adverbio" },

  // ---------- A2 ----------
  { es: "porque",          fr: "parce que",     level: "A2", type: "conector" },
  { es: "entonces",        fr: "alors",         level: "A2", type: "conector" },
  { es: "después",         fr: "ensuite",       level: "A2", type: "conector" },
  { es: "viajar",          fr: "voyager",       level: "A2", type: "verbo" },
  { es: "elegir",          fr: "choisir",       level: "A2", type: "verbo" },
  { es: "vender",          fr: "vendre",        level: "A2", type: "verbo" },
  { es: "esperar",         fr: "attendre",      level: "A2", type: "verbo" },
  { es: "entender",        fr: "comprendre",    level: "A2", type: "verbo" },
  { es: "salir",           fr: "sortir",        level: "A2", type: "verbo" },
  { es: "el trabajo",      fr: "le travail",    level: "A2", type: "sustantivo" },
  { es: "la ciudad",       fr: "la ville",      level: "A2", type: "sustantivo" },
  { es: "la familia",      fr: "la famille",    level: "A2", type: "sustantivo" },
  { es: "el fin de semana",fr: "le week-end",   level: "A2", type: "sustantivo" },
  { es: "interesante",     fr: "intéressant",   level: "A2", type: "adjetivo" },
  { es: "difícil",         fr: "difficile",     level: "A2", type: "adjetivo" },
  { es: "fácil",           fr: "facile",        level: "A2", type: "adjetivo" },
  { es: "diferente",       fr: "différent",     level: "A2", type: "adjetivo" },
  { es: "a menudo",        fr: "souvent",       level: "A2", type: "adverbio" },
  { es: "rara vez",        fr: "rarement",      level: "A2", type: "adverbio" },
  { es: "rápido",          fr: "vite",          level: "A2", type: "adverbio" },
  { es: "ya",              fr: "déjà",          level: "A2", type: "adverbio" },

  // ---------- B1 ----------
  { es: "sin embargo",     fr: "toutefois",     level: "B1", type: "conector" },
  { es: "aunque",          fr: "bien que",      level: "B1", type: "conector" },
  { es: "mientras que",    fr: "tandis que",    level: "B1", type: "conector" },
  { es: "lograr",          fr: "réussir",       level: "B1", type: "verbo" },
  { es: "convencer",       fr: "convaincre",    level: "B1", type: "verbo" },
  { es: "permitir",        fr: "permettre",     level: "B1", type: "verbo" },
  { es: "resolver",        fr: "résoudre",      level: "B1", type: "verbo" },
  { es: "preocuparse",     fr: "s'inquiéter",   level: "B1", type: "verbo" },
  { es: "la reunión",      fr: "la réunion",    level: "B1", type: "sustantivo" },
  { es: "el consejo",      fr: "le conseil",    level: "B1", type: "sustantivo" },
  { es: "la decisión",     fr: "la décision",   level: "B1", type: "sustantivo" },
  { es: "el éxito",        fr: "le succès",     level: "B1", type: "sustantivo" },
  { es: "convincente",     fr: "convaincant",   level: "B1", type: "adjetivo" },
  { es: "eficaz",          fr: "efficace",      level: "B1", type: "adjetivo" },
  { es: "sorprendente",    fr: "surprenant",    level: "B1", type: "adjetivo" },
  { es: "sin embargo",     fr: "néanmoins",     level: "B1", type: "adverbio" },
  { es: "no obstante",     fr: "pourtant",      level: "B1", type: "adverbio" },
  { es: "cada vez más",    fr: "davantage",     level: "B1", type: "adverbio" },

  // ---------- B2 ----------
  { es: "a pesar de",      fr: "malgré",        level: "B2", type: "conector" },
  { es: "de modo que",     fr: "de sorte que",  level: "B2", type: "conector" },
  { es: "aunque",          fr: "quoique",       level: "B2", type: "conector" },
  { es: "de hecho",        fr: "en effet",      level: "B2", type: "conector" },
  { es: "suceder / ocurrir", fr: "se produire", level: "B2", type: "verbo" },
  { es: "sospechar",       fr: "soupçonner",    level: "B2", type: "verbo" },
  { es: "considerar / plantearse", fr: "envisager", level: "B2", type: "verbo" },
  { es: "provocar / suscitar", fr: "susciter",  level: "B2", type: "verbo" },
  { es: "esforzarse",      fr: "s'efforcer",    level: "B2", type: "verbo" },
  { es: "el reto",         fr: "le défi",       level: "B2", type: "sustantivo" },
  { es: "lo que está en juego", fr: "l'enjeu",  level: "B2", type: "sustantivo" },
  { es: "la desconfianza", fr: "la méfiance",   level: "B2", type: "sustantivo" },
  { es: "desconfiado",     fr: "méfiant",       level: "B2", type: "adjetivo" },
  { es: "ambiguo",         fr: "ambigu",        level: "B2", type: "adjetivo" },
  { es: "matizado",        fr: "nuancé",        level: "B2", type: "adjetivo" },
  { es: "ineludible",      fr: "inéluctable",   level: "B2", type: "adjetivo" },
  { es: "de ahora en adelante", fr: "désormais",level: "B2", type: "adverbio" },
  { es: "a pesar de todo", fr: "malgré tout",   level: "B2", type: "adverbio" },

  // ---------- Cuerpo humano ----------
  { es: "la cabeza",       fr: "la tête",       level: "A1", type: "sustantivo" },
  { es: "los ojos",        fr: "les yeux",      level: "A1", type: "sustantivo" },
  { es: "la boca",         fr: "la bouche",     level: "A1", type: "sustantivo" },
  { es: "la mano",         fr: "la main",       level: "A1", type: "sustantivo" },
  { es: "el pie",          fr: "le pied",       level: "A1", type: "sustantivo" },
  { es: "el brazo",        fr: "le bras",       level: "A1", type: "sustantivo" },
  { es: "la pierna",       fr: "la jambe",      level: "A1", type: "sustantivo" },
  { es: "la nariz",        fr: "le nez",        level: "A1", type: "sustantivo" },
  { es: "el pelo",         fr: "les cheveux",   level: "A1", type: "sustantivo" },
  { es: "la oreja",        fr: "l'oreille",     level: "A1", type: "sustantivo" },
  { es: "la espalda",      fr: "le dos",        level: "A2", type: "sustantivo" },
  { es: "el corazón",      fr: "le cœur",       level: "A2", type: "sustantivo" },

  // ---------- Animales ----------
  { es: "el perro",        fr: "le chien",      level: "A1", type: "sustantivo" },
  { es: "el pájaro",       fr: "l'oiseau",      level: "A1", type: "sustantivo" },
  { es: "el caballo",      fr: "le cheval",     level: "A1", type: "sustantivo" },
  { es: "la vaca",         fr: "la vache",      level: "A1", type: "sustantivo" },
  { es: "el pez",          fr: "le poisson",    level: "A1", type: "sustantivo" },
  { es: "el león",         fr: "le lion",       level: "A2", type: "sustantivo" },
  { es: "el elefante",     fr: "l'éléphant",    level: "A2", type: "sustantivo" },
  { es: "el ratón",        fr: "la souris",     level: "A2", type: "sustantivo" },
  { es: "el conejo",       fr: "le lapin",      level: "A2", type: "sustantivo" },

  // ---------- Familia / árbol genealógico ----------
  { es: "el padre",        fr: "le père",       level: "A1", type: "sustantivo" },
  { es: "la madre",        fr: "la mère",       level: "A1", type: "sustantivo" },
  { es: "el hermano",      fr: "le frère",      level: "A1", type: "sustantivo" },
  { es: "la hermana",      fr: "la sœur",       level: "A1", type: "sustantivo" },
  { es: "el hijo",         fr: "le fils",       level: "A1", type: "sustantivo" },
  { es: "la hija",         fr: "la fille",      level: "A1", type: "sustantivo" },
  { es: "el abuelo",       fr: "le grand-père", level: "A1", type: "sustantivo" },
  { es: "la abuela",       fr: "la grand-mère", level: "A1", type: "sustantivo" },
  { es: "el tío",          fr: "l'oncle",       level: "A2", type: "sustantivo" },
  { es: "la tía",          fr: "la tante",      level: "A2", type: "sustantivo" },
  { es: "el primo",        fr: "le cousin",     level: "A2", type: "sustantivo" },
  { es: "la esposa / mujer", fr: "la femme",    level: "A2", type: "sustantivo" },
  { es: "el esposo / marido", fr: "le mari",    level: "A2", type: "sustantivo" },

  // ---------- Ciudad y edificios ----------
  { es: "la calle",        fr: "la rue",        level: "A1", type: "sustantivo" },
  { es: "la escuela",      fr: "l'école",       level: "A1", type: "sustantivo" },
  { es: "el hospital",     fr: "l'hôpital",     level: "A2", type: "sustantivo" },
  { es: "el banco",        fr: "la banque",     level: "A2", type: "sustantivo" },
  { es: "la estación",     fr: "la gare",       level: "A2", type: "sustantivo" },
  { es: "el aeropuerto",   fr: "l'aéroport",    level: "A2", type: "sustantivo" },
  { es: "el museo",        fr: "le musée",      level: "A2", type: "sustantivo" },
  { es: "el parque",       fr: "le parc",       level: "A1", type: "sustantivo" },
  { es: "el ayuntamiento", fr: "la mairie",     level: "B1", type: "sustantivo" },
  { es: "el supermercado", fr: "le supermarché",level: "A2", type: "sustantivo" },
  { es: "la biblioteca",   fr: "la bibliothèque",level: "A2", type: "sustantivo" },
  { es: "la iglesia",      fr: "l'église",      level: "A2", type: "sustantivo" },
  { es: "la farmacia",     fr: "la pharmacie",  level: "A2", type: "sustantivo" },

  // ---------- Profesiones ----------
  { es: "el médico",       fr: "le médecin",    level: "A2", type: "sustantivo" },
  { es: "el profesor",     fr: "l'enseignant",  level: "A2", type: "sustantivo" },
  { es: "el abogado",      fr: "l'avocat",      level: "B1", type: "sustantivo" },
  { es: "el ingeniero",    fr: "l'ingénieur",   level: "B1", type: "sustantivo" },
  { es: "el cocinero",     fr: "le cuisinier",  level: "A2", type: "sustantivo" },
  { es: "el policía",      fr: "le policier",   level: "A2", type: "sustantivo" },
  { es: "el enfermero",    fr: "l'infirmier",   level: "A2", type: "sustantivo" },
  { es: "el panadero",     fr: "le boulanger",  level: "A2", type: "sustantivo" },
  { es: "el agricultor",   fr: "l'agriculteur", level: "B1", type: "sustantivo" },
  { es: "el periodista",   fr: "le journaliste",level: "B1", type: "sustantivo" },

  // ---------- Países y nacionalidades ----------
  { es: "España",          fr: "l'Espagne",     level: "A1", type: "sustantivo" },
  { es: "español",         fr: "espagnol",      level: "A1", type: "adjetivo" },
  { es: "Francia",         fr: "la France",     level: "A1", type: "sustantivo" },
  { es: "francés",         fr: "français",      level: "A1", type: "adjetivo" },
  { es: "Alemania",        fr: "l'Allemagne",   level: "A2", type: "sustantivo" },
  { es: "alemán",          fr: "allemand",      level: "A2", type: "adjetivo" },
  { es: "Italia",          fr: "l'Italie",      level: "A2", type: "sustantivo" },
  { es: "italiano",        fr: "italien",       level: "A2", type: "adjetivo" },
  { es: "Estados Unidos",  fr: "les États-Unis",level: "A2", type: "sustantivo" },
  { es: "estadounidense",  fr: "américain",     level: "A2", type: "adjetivo" },
  { es: "Marruecos",       fr: "le Maroc",      level: "B1", type: "sustantivo" },
  { es: "marroquí",        fr: "marocain",      level: "B1", type: "adjetivo" },
  { es: "China",           fr: "la Chine",      level: "B1", type: "sustantivo" },
  { es: "chino",           fr: "chinois",       level: "B1", type: "adjetivo" },

  // ---------- Material escolar ----------
  { es: "el bolígrafo",    fr: "le stylo",      level: "A1", type: "sustantivo" },
  { es: "el cuaderno",     fr: "le cahier",     level: "A1", type: "sustantivo" },
  { es: "el lápiz",        fr: "le crayon",     level: "A1", type: "sustantivo" },
  { es: "la goma",         fr: "la gomme",      level: "A1", type: "sustantivo" },
  { es: "la regla",        fr: "la règle",      level: "A1", type: "sustantivo" },
  { es: "la mochila",      fr: "le sac à dos",  level: "A1", type: "sustantivo" },
  { es: "el estuche",      fr: "la trousse",    level: "A1", type: "sustantivo" },
  { es: "la calculadora",  fr: "la calculatrice",level: "A2", type: "sustantivo" },
  { es: "la pizarra",      fr: "le tableau",    level: "A1", type: "sustantivo" },
  { es: "el libro",        fr: "le livre",      level: "A1", type: "sustantivo" },

  // ---------- Números ----------
  { es: "uno",             fr: "un",            level: "A1", type: "número" },
  { es: "dos",             fr: "deux",          level: "A1", type: "número" },
  { es: "tres",            fr: "trois",         level: "A1", type: "número" },
  { es: "cinco",           fr: "cinq",          level: "A1", type: "número" },
  { es: "diez",            fr: "dix",           level: "A1", type: "número" },
  { es: "veinte",          fr: "vingt",         level: "A1", type: "número" },
  { es: "treinta",         fr: "trente",        level: "A2", type: "número" },
  { es: "cien",            fr: "cent",          level: "A2", type: "número" },
  { es: "mil",             fr: "mille",         level: "A2", type: "número" },

  // ---------- Ropa ----------
  { es: "el pantalón",     fr: "le pantalon",   level: "A1", type: "sustantivo" },
  { es: "la camisa",       fr: "la chemise",    level: "A1", type: "sustantivo" },
  { es: "el vestido",      fr: "la robe",       level: "A1", type: "sustantivo" },
  { es: "los zapatos",     fr: "les chaussures",level: "A1", type: "sustantivo" },
  { es: "el abrigo",       fr: "le manteau",    level: "A2", type: "sustantivo" },
  { es: "el sombrero",     fr: "le chapeau",    level: "A2", type: "sustantivo" },
  { es: "la falda",        fr: "la jupe",       level: "A2", type: "sustantivo" },
  { es: "el jersey",       fr: "le pull",       level: "A2", type: "sustantivo" },

  // ---------- Determinantes ----------
  { es: "el (artículo masc.)", fr: "le",        level: "A1", type: "determinante" },
  { es: "la (artículo fem.)",  fr: "la",        level: "A1", type: "determinante" },
  { es: "los / las",       fr: "les",           level: "A1", type: "determinante" },
  { es: "un",              fr: "un",            level: "A1", type: "determinante" },
  { es: "una",             fr: "une",           level: "A1", type: "determinante" },
  { es: "mi",              fr: "mon",           level: "A1", type: "determinante" },
  { es: "tu (posesivo)",   fr: "ton",           level: "A2", type: "determinante" },
  { es: "su (de él/ella)", fr: "son",           level: "A2", type: "determinante" },
  { es: "este / esta",     fr: "ce / cette",    level: "A2", type: "determinante" },
  { es: "cada",            fr: "chaque",        level: "B1", type: "determinante" },

  // ---------- Pronombres ----------
  { es: "yo",              fr: "je",            level: "A1", type: "pronombre" },
  { es: "tú",              fr: "tu",            level: "A1", type: "pronombre" },
  { es: "él",              fr: "il",            level: "A1", type: "pronombre" },
  { es: "ella",            fr: "elle",          level: "A1", type: "pronombre" },
  { es: "nosotros",        fr: "nous",          level: "A1", type: "pronombre" },
  { es: "vosotros / ustedes", fr: "vous",       level: "A1", type: "pronombre" },
  { es: "ellos",           fr: "ils",           level: "A1", type: "pronombre" },
  { es: "me (objeto)",     fr: "me",            level: "A2", type: "pronombre" },
  { es: "lo / la (objeto directo)", fr: "le / la", level: "B1", type: "pronombre" },
  { es: "le (objeto indirecto)",    fr: "lui",  level: "B1", type: "pronombre" },
  { es: "que / quien (relativo)",   fr: "qui",  level: "B1", type: "pronombre" },
  { es: "esto / eso",      fr: "cela",          level: "B2", type: "pronombre" },

  // ---------- Preposiciones ----------
  { es: "a",               fr: "à",             level: "A1", type: "preposición" },
  { es: "de",              fr: "de",            level: "A1", type: "preposición" },
  { es: "en (lugar)",      fr: "dans",          level: "A1", type: "preposición" },
  { es: "sobre",           fr: "sur",           level: "A1", type: "preposición" },
  { es: "bajo / debajo de",fr: "sous",          level: "A2", type: "preposición" },
  { es: "con",             fr: "avec",          level: "A1", type: "preposición" },
  { es: "sin",             fr: "sans",          level: "A1", type: "preposición" },
  { es: "para / por",      fr: "pour",          level: "A1", type: "preposición" },
  { es: "en casa de",      fr: "chez",          level: "A2", type: "preposición" },
  { es: "entre",           fr: "entre",         level: "A2", type: "preposición" },
  { es: "antes de",        fr: "avant",         level: "A2", type: "preposición" },
  { es: "después de",      fr: "après",         level: "A2", type: "preposición" },
  { es: "durante",         fr: "pendant",       level: "B1", type: "preposición" },
  { es: "gracias a",       fr: "grâce à",       level: "B1", type: "preposición" },

  // ---------- Partes de la casa ----------
  { es: "la cocina (habitación)", fr: "la cuisine",   level: "A1", type: "sustantivo" },
  { es: "el salón",        fr: "le salon",      level: "A1", type: "sustantivo" },
  { es: "el dormitorio",   fr: "la chambre",    level: "A1", type: "sustantivo" },
  { es: "el baño",         fr: "la salle de bains", level: "A1", type: "sustantivo" },
  { es: "el jardín",       fr: "le jardin",     level: "A1", type: "sustantivo" },
  { es: "el garaje",       fr: "le garage",     level: "A2", type: "sustantivo" },
  { es: "el sótano",       fr: "la cave",       level: "A2", type: "sustantivo" },
  { es: "el techo",        fr: "le toit",       level: "A2", type: "sustantivo" },
  { es: "la pared",        fr: "le mur",        level: "A1", type: "sustantivo" },
  { es: "el suelo",        fr: "le sol",        level: "A1", type: "sustantivo" },
  { es: "la escalera",     fr: "l'escalier",    level: "A2", type: "sustantivo" },
  { es: "el balcón",       fr: "le balcon",     level: "A2", type: "sustantivo" },
  { es: "el pasillo",      fr: "le couloir",    level: "A2", type: "sustantivo" },

  // ---------- Muebles y electrodomésticos ----------
  { es: "la silla",        fr: "la chaise",     level: "A1", type: "sustantivo" },
  { es: "la cama",         fr: "le lit",        level: "A1", type: "sustantivo" },
  { es: "el sofá",         fr: "le canapé",     level: "A1", type: "sustantivo" },
  { es: "el armario",      fr: "l'armoire",     level: "A1", type: "sustantivo" },
  { es: "la estantería",   fr: "l'étagère",     level: "A2", type: "sustantivo" },
  { es: "la lámpara",      fr: "la lampe",      level: "A1", type: "sustantivo" },
  { es: "el espejo",       fr: "le miroir",     level: "A2", type: "sustantivo" },
  { es: "la nevera",       fr: "le réfrigérateur", level: "A2", type: "sustantivo" },
  { es: "la cocina (aparato)", fr: "la cuisinière", level: "A2", type: "sustantivo" },
  { es: "el fregadero",    fr: "l'évier",       level: "A2", type: "sustantivo" },
];

// Frases para completar conjugaciones — cubre los 11 tiempos solicitados
// y varía las personas (je, tu, il/elle, nous, vous, ils/elles)
let CONJUGATIONS = [
  // ---------- Présent ----------
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
    level: "A1", tense: "Présent", infinitive: "avoir",
    before: "Tu", after: "vingt ans cette année.",
    answer: "as",
    translation: "Tú cumples veinte años este año."
  },
  {
    level: "A2", tense: "Présent", infinitive: "faire",
    before: "Vous", after: "toujours vos devoirs le soir.",
    answer: "faites",
    translation: "Vosotros siempre hacéis los deberes por la noche."
  },
  {
    level: "A2", tense: "Présent", infinitive: "vendre",
    before: "Ils", after: "des fruits au marché.",
    answer: "vendent",
    translation: "Ellos venden fruta en el mercado."
  },

  // ---------- Passé Composé ----------
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
    level: "A2", tense: "Passé Composé", infinitive: "voir",
    before: "J'", after: "un très bon film hier soir.",
    answer: "ai vu",
    translation: "Vi una muy buena película anoche."
  },
  {
    level: "B1", tense: "Passé Composé", infinitive: "prendre",
    before: "Tu", after: "le train ce matin ?",
    answer: "as pris",
    translation: "¿Cogiste el tren esta mañana?"
  },
  {
    level: "B1", tense: "Passé Composé", infinitive: "venir",
    before: "Ils", after: "nous voir le week-end dernier.",
    answer: "sont venus",
    translation: "Ellos vinieron a vernos el fin de semana pasado."
  },

  // ---------- Imparfait ----------
  {
    level: "A2", tense: "Imparfait", infinitive: "habiter",
    before: "Quand j'étais petit, j'", after: "à Lyon.",
    answer: "habitais",
    translation: "Cuando era pequeño, vivía en Lyon."
  },
  {
    level: "A2", tense: "Imparfait", infinitive: "avoir",
    before: "Tu", after: "toujours peur du noir, enfant.",
    answer: "avais",
    translation: "De niño, siempre tenías miedo a la oscuridad."
  },
  {
    level: "B1", tense: "Imparfait", infinitive: "être",
    before: "À cette époque, elle", after: "très timide.",
    answer: "était",
    translation: "En esa época, ella era muy tímida."
  },
  {
    level: "B1", tense: "Imparfait", infinitive: "aller",
    before: "Nous", after: "souvent à la plage en été.",
    answer: "allions",
    translation: "Íbamos a menudo a la playa en verano."
  },

  // ---------- Plus-que-parfait ----------
  {
    level: "B1", tense: "Plus-que-parfait", infinitive: "partir",
    before: "Quand je suis arrivé, ils", after: "déjà.",
    answer: "étaient déjà partis",
    translation: "Cuando llegué, ellos ya se habían ido."
  },
  {
    level: "B1", tense: "Plus-que-parfait", infinitive: "finir",
    before: "Je", after: "mon repas quand tu as appelé.",
    answer: "avais fini",
    translation: "Ya había terminado mi comida cuando llamaste."
  },
  {
    level: "B2", tense: "Plus-que-parfait", infinitive: "voir",
    before: "Elle m'a dit qu'elle", after: "ce film avant.",
    answer: "avait déjà vu",
    translation: "Ella me dijo que ya había visto esa película antes."
  },

  // ---------- Futur Simple ----------
  {
    level: "B1", tense: "Futur Simple", infinitive: "finir",
    before: "Demain, tu", after: "ton projet.",
    answer: "finiras",
    translation: "Mañana terminarás tu proyecto."
  },
  {
    level: "B1", tense: "Futur Simple", infinitive: "aller",
    before: "L'année prochaine, j'", after: "au Canada.",
    answer: "irai",
    translation: "El año que viene iré a Canadá."
  },
  {
    level: "B1", tense: "Futur Simple", infinitive: "avoir",
    before: "Nous", after: "plus de temps le mois prochain.",
    answer: "aurons",
    translation: "Tendremos más tiempo el mes que viene."
  },
  {
    level: "B2", tense: "Futur Simple", infinitive: "être",
    before: "Ils", after: "présents à la conférence.",
    answer: "seront",
    translation: "Ellos estarán presentes en la conferencia."
  },

  // ---------- Futur Proche ----------
  {
    level: "A1", tense: "Futur Proche", infinitive: "partir",
    before: "Attends, je", after: "dans cinq minutes.",
    answer: "vais partir",
    translation: "Espera, voy a salir en cinco minutos."
  },
  {
    level: "A2", tense: "Futur Proche", infinitive: "manger",
    before: "Nous", after: "au restaurant ce soir.",
    answer: "allons manger",
    translation: "Vamos a comer en el restaurante esta noche."
  },
  {
    level: "A2", tense: "Futur Proche", infinitive: "venir",
    before: "Elle", after: "avec nous demain.",
    answer: "va venir",
    translation: "Ella va a venir con nosotros mañana."
  },

  // ---------- Futur Antérieur ----------
  {
    level: "B2", tense: "Futur Antérieur", infinitive: "terminer",
    before: "Quand tu arriveras, nous", after: "le dîner.",
    answer: "aurons terminé",
    translation: "Cuando llegues, ya habremos terminado la cena."
  },
  {
    level: "B2", tense: "Futur Antérieur", infinitive: "partir",
    before: "Dès que tu", after: ", appelle-moi.",
    answer: "seras parti",
    translation: "En cuanto hayas salido, llámame."
  },
  {
    level: "B2", tense: "Futur Antérieur", infinitive: "finir",
    before: "Ils", after: "avant la fin du mois.",
    answer: "auront fini",
    translation: "Ellos habrán terminado antes de fin de mes."
  },

  // ---------- Subjonctif Présent ----------
  {
    level: "B2", tense: "Subjonctif Présent", infinitive: "faire",
    before: "Il faut que tu", after: "tes devoirs ce soir.",
    answer: "fasses",
    translation: "Es necesario que hagas tu tarea esta noche."
  },
  {
    level: "B2", tense: "Subjonctif Présent", infinitive: "être",
    before: "Je veux que vous", after: "à l'heure.",
    answer: "soyez",
    translation: "Quiero que lleguéis puntuales."
  },
  {
    level: "B2", tense: "Subjonctif Présent", infinitive: "avoir",
    before: "Il est possible qu'elle n'", after: "pas le temps.",
    answer: "ait",
    translation: "Es posible que ella no tenga tiempo."
  },
  {
    level: "B2", tense: "Subjonctif Présent", infinitive: "pouvoir",
    before: "Je doute qu'ils", after: "venir ce soir.",
    answer: "puissent",
    translation: "Dudo que ellos puedan venir esta noche."
  },

  // ---------- Subjonctif Passé ----------
  {
    level: "B2", tense: "Subjonctif Passé", infinitive: "finir",
    before: "Je suis content que vous", after: "à temps.",
    answer: "ayez fini",
    translation: "Me alegra que hayan terminado a tiempo."
  },
  {
    level: "B2", tense: "Subjonctif Passé", infinitive: "partir",
    before: "Il est étonnant qu'il", after: "sans nous prévenir.",
    answer: "soit parti",
    translation: "Es sorprendente que él se haya ido sin avisarnos."
  },
  {
    level: "B2", tense: "Subjonctif Passé", infinitive: "réussir",
    before: "Je suis ravi que tu", after: "ton examen.",
    answer: "aies réussi",
    translation: "Estoy encantado de que hayas aprobado tu examen."
  },

  // ---------- Conditionnel Présent ----------
  {
    level: "B1", tense: "Conditionnel Présent", infinitive: "aimer",
    before: "Si j'avais le temps, j'", after: "voyager plus souvent.",
    answer: "aimerais",
    translation: "Si tuviera tiempo, me gustaría viajar más seguido."
  },
  {
    level: "B1", tense: "Conditionnel Présent", infinitive: "pouvoir",
    before: "Tu", after: "m'aider, s'il te plaît ?",
    answer: "pourrais",
    translation: "¿Podrías ayudarme, por favor?"
  },
  {
    level: "B1", tense: "Conditionnel Présent", infinitive: "vouloir",
    before: "Nous", after: "réserver une table pour deux.",
    answer: "voudrions",
    translation: "Querríamos reservar una mesa para dos."
  },
  {
    level: "B2", tense: "Conditionnel Présent", infinitive: "devoir",
    before: "À ta place, ils", after: "réfléchir davantage.",
    answer: "devraient",
    translation: "En tu lugar, ellos deberían pensarlo más."
  },

  // ---------- Conditionnel Passé ----------
  {
    level: "B2", tense: "Conditionnel Passé", infinitive: "savoir",
    before: "Si j'avais su, je te l'", after: "dit.",
    answer: "aurais",
    translation: "Si lo hubiera sabido, te lo habría dicho."
  },
  {
    level: "B2", tense: "Conditionnel Passé", infinitive: "avoir",
    before: "Sans ton aide, tu n'", after: "jamais fini à temps.",
    answer: "aurais",
    translation: "Sin tu ayuda, nunca habrías terminado a tiempo."
  },
  {
    level: "B2", tense: "Conditionnel Passé", infinitive: "être",
    before: "À ta place, elle", after: "plus prudente.",
    answer: "aurait été",
    translation: "En tu lugar, ella habría sido más prudente."
  },
];

// Frases completas para el modo de traducción de oraciones (ES<->FR)
let PHRASES = [
  { level: "A1", es: "Me llamo Marie y vivo en París.",
    fr: "Je m'appelle Marie et j'habite à Paris." },
  { level: "A1", es: "¿Qué hora es?",
    fr: "Quelle heure est-il ?" },
  { level: "A1", es: "Son las tres y media.",
    fr: "Il est trois heures et demie." },
  { level: "A1", es: "Tengo dos hermanos y una hermana.",
    fr: "J'ai deux frères et une sœur." },
  { level: "A2", es: "Es mediodía y tengo mucha hambre.",
    fr: "Il est midi et j'ai très faim." },
  { level: "A2", es: "Mi padre trabaja en un hospital cerca de la estación.",
    fr: "Mon père travaille dans un hôpital près de la gare." },
  { level: "A2", es: "Son las nueve menos diez, vamos a llegar tarde.",
    fr: "Il est neuf heures moins dix, nous allons être en retard." },
  { level: "A2", es: "Todos los fines de semana visito a mis abuelos.",
    fr: "Tous les week-ends, je rends visite à mes grands-parents." },
  { level: "B1", es: "Aunque llueva, iremos al parque con los niños.",
    fr: "Même s'il pleut, nous irons au parc avec les enfants." },
  { level: "B1", es: "Ella dejó su trabajo porque quería viajar por el mundo.",
    fr: "Elle a quitté son travail parce qu'elle voulait voyager à travers le monde." },
  { level: "B1", es: "Si tuviera más tiempo, aprendería otro idioma.",
    fr: "Si j'avais plus de temps, j'apprendrais une autre langue." },
  { level: "B1", es: "Es necesario que hables con el médico antes del viaje.",
    fr: "Il faut que tu parles au médecin avant le voyage." },
  { level: "B2", es: "A pesar de las dificultades, lograron terminar el proyecto a tiempo.",
    fr: "Malgré les difficultés, ils ont réussi à terminer le projet à temps." },
  { level: "B2", es: "Dudo que ellos hayan entendido de verdad el problema.",
    fr: "Je doute qu'ils aient vraiment compris le problème." },
  { level: "B2", es: "En cuanto hayamos terminado la reunión, te llamaré.",
    fr: "Dès que nous aurons terminé la réunion, je t'appellerai." },
  { level: "B2", es: "En tu lugar, yo habría sido más prudente con esa decisión.",
    fr: "À ta place, j'aurais été plus prudent avec cette décision." },
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
  dataSourceStatus: document.getElementById("dataSourceStatus"),
  excelFileInput: document.getElementById("excelFileInput"),
  resetDataBtn: document.getElementById("resetDataBtn"),
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
    .replace(/[.,;!?¿¡"'’]/g, "")
    .replace(/\s+/g, " ")
    .replace(/^l'/, "")
    .trim();
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
  if (filterByLevel(PHRASES).length) modes.push("phrase-es-fr", "phrase-fr-es");
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
  } else if (state.mode === "phrase-es-fr") {
    state.current = randomFrom(filterByLevel(PHRASES));
    renderPhraseEsToFr(state.current);
  } else if (state.mode === "phrase-fr-es") {
    state.current = randomFrom(filterByLevel(PHRASES));
    renderPhraseFrToEs(state.current);
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
  el.word.classList.remove("sentence");
  el.word.hidden = false;
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

/* --- Modo 4: frase completa ES → FR --- */
function renderPhraseEsToFr(item) {
  el.level.textContent = item.level;
  el.hint.textContent = "Traduce la frase completa al francés";
  el.word.classList.add("sentence");
  el.word.textContent = item.es;
  el.input.placeholder = "Escribe la frase en francés…";
}

/* --- Modo 5: frase completa FR → ES --- */
function renderPhraseFrToEs(item) {
  el.level.textContent = item.level;
  el.hint.textContent = "Traduce la frase completa al español";
  el.word.classList.add("sentence");
  el.word.textContent = item.fr;
  el.input.placeholder = "Escribe la frase en español…";
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
  } else if (state.mode === "phrase-es-fr") {
    correctAnswer = state.current.fr;
    isCorrect = normalize(value) === normalize(correctAnswer);
  } else if (state.mode === "phrase-fr-es") {
    correctAnswer = state.current.es;
    isCorrect = normalize(value) === normalize(correctAnswer);
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

  if (state.mode === "es-fr" || state.mode === "phrase-es-fr") {
    el.micBtn.hidden = state.mode !== "es-fr"; // el mic inline solo aplica a palabras sueltas
    el.listenBtn.hidden = false;
  } else if (state.mode === "fr-es" || state.mode === "phrase-fr-es") {
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
  if (
    state.mode === "es-fr" ||
    state.mode === "fr-es" ||
    state.mode === "phrase-es-fr" ||
    state.mode === "phrase-fr-es"
  ) {
    el.listenBtn.hidden = false;
  }
}

function extraFeedback() {
  if (state.mode === "conjugate") return state.current.translation;
  if (state.mode === "phrase-es-fr" || state.mode === "phrase-fr-es") {
    return "(Puede haber otras formas válidas de traducir esta frase; esta es solo una referencia.)";
  }
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
   0-bis. CARGA DE DATOS (datos.xlsx del servidor, o tu Excel local)
   --------------------------------------------------------- */

const STORAGE_KEY = "carnetFrancais.customData.v1";

// Convierte una fila de la hoja "Vocabulario" a nuestro formato interno
function rowToVocab(row) {
  return {
    es: String(row.espanol ?? "").trim(),
    fr: String(row.frances ?? "").trim(),
    level: String(row.nivel ?? "").trim().toUpperCase(),
    type: String(row.tipo ?? "").trim().toLowerCase(),
  };
}

function rowToConjugation(row) {
  return {
    level: String(row.nivel ?? "").trim().toUpperCase(),
    tense: String(row.tiempo_verbal ?? "").trim(),
    infinitive: String(row.infinitivo ?? "").trim(),
    before: String(row.antes_del_hueco ?? "").trim(),
    after: String(row.despues_del_hueco ?? "").trim(),
    answer: String(row.respuesta_correcta ?? "").trim(),
    translation: String(row.traduccion ?? "").trim(),
  };
}

function rowToPhrase(row) {
  return {
    level: String(row.nivel ?? "").trim().toUpperCase(),
    es: String(row.espanol ?? "").trim(),
    fr: String(row.frances ?? "").trim(),
  };
}

// Extrae {vocab, conj, phrases} de un workbook de SheetJS ya leído
function workbookToData(workbook) {
  const vocabSheet = workbook.Sheets["Vocabulario"];
  const conjSheet = workbook.Sheets["Conjugaciones"];
  const phraseSheet = workbook.Sheets["Frases"];

  const vocab = vocabSheet
    ? XLSX.utils.sheet_to_json(vocabSheet).map(rowToVocab).filter((v) => v.es && v.fr)
    : [];
  const conj = conjSheet
    ? XLSX.utils.sheet_to_json(conjSheet).map(rowToConjugation).filter((c) => c.answer)
    : [];
  const phrases = phraseSheet
    ? XLSX.utils.sheet_to_json(phraseSheet).map(rowToPhrase).filter((p) => p.es && p.fr)
    : [];

  return { vocab, conj, phrases };
}

function applyData({ vocab, conj, phrases }) {
  if (vocab.length) VOCABULARY = vocab;
  if (conj.length) CONJUGATIONS = conj;
  if (phrases.length) PHRASES = phrases;
}

/* ----- localStorage: recuerda el último Excel que cargaste a mano ----- */
function saveCustomDataToStorage(data, filename) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...data, filename, savedAt: new Date().toISOString() })
    );
  } catch (err) {
    console.warn("No se pudo guardar en localStorage:", err);
  }
}

function loadCustomDataFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("No se pudo leer localStorage:", err);
    return null;
  }
}

function clearCustomDataFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ----- Origen 1: datos.xlsx servido junto a la app (GitHub Pages) ----- */
async function loadExcelFromServer() {
  if (typeof XLSX === "undefined") return false;
  try {
    const response = await fetch("datos.xlsx");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const data = workbookToData(workbook);
    applyData(data);
    return true;
  } catch (err) {
    console.warn("No se pudo cargar datos.xlsx del servidor:", err);
    return false;
  }
}

/* ----- Origen 2: un Excel elegido a mano desde tu ordenador ----- */
function loadExcelFromLocalFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: "array" });
        const data = workbookToData(workbook);
        if (!data.vocab.length && !data.conj.length && !data.phrases.length) {
          reject(new Error("El Excel no tiene datos reconocibles (revisa los nombres de hoja/columnas)."));
          return;
        }
        applyData(data);
        saveCustomDataToStorage(data, file.name);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsArrayBuffer(file);
  });
}

function formatSavedAt(isoString) {
  try {
    return new Date(isoString).toLocaleString("es-ES", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function updateDataSourceStatus(mode, extra) {
  el.resetDataBtn.hidden = mode !== "local";
  if (mode === "local") {
    el.dataSourceStatus.textContent = `📂 Usando tu Excel local "${extra.filename}" (cargado el ${formatSavedAt(extra.savedAt)}).`;
  } else if (mode === "server") {
    el.dataSourceStatus.textContent = "☁️ Usando datos.xlsx publicado en la web.";
  } else {
    el.dataSourceStatus.textContent = "📦 Usando el banco de datos incorporado en la app.";
  }
}

/* ----- Eventos del selector de Excel local ----- */
el.excelFileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  el.dataSourceStatus.textContent = "Leyendo tu archivo…";
  try {
    const data = await loadExcelFromLocalFile(file);
    updateDataSourceStatus("local", { filename: file.name, savedAt: new Date().toISOString() });
    nextExercise();
  } catch (err) {
    el.dataSourceStatus.textContent = `⚠️ ${err.message}`;
  }
  e.target.value = ""; // permite volver a elegir el mismo archivo tras editarlo
});

el.resetDataBtn.addEventListener("click", () => {
  clearCustomDataFromStorage();
  location.reload();
});

/* ---------------------------------------------------------
   10. INICIALIZACIÓN
   --------------------------------------------------------- */
async function init() {
  el.hint.textContent = "Cargando el banco de palabras…";
  el.word.textContent = "📖";
  el.form.hidden = true;

  // Prioridad: 1) tu último Excel local guardado, 2) datos.xlsx del servidor, 3) datos incorporados
  const stored = loadCustomDataFromStorage();
  if (stored && (stored.vocab?.length || stored.conj?.length || stored.phrases?.length)) {
    applyData(stored);
    updateDataSourceStatus("local", { filename: stored.filename, savedAt: stored.savedAt });
  } else {
    const loadedFromServer = await loadExcelFromServer();
    updateDataSourceStatus(loadedFromServer ? "server" : "default");
  }

  el.form.hidden = false;
  el.supportNote.textContent =
    "Carnet Français · practica de la mano de la Web Speech API — compatible con Safari y Chrome.";

  nextExercise();
}

init();
