const animals = [
  "Águia",
  "Alce",
  "Andorinha",
  "Anta",
  "Arara",
  "Baleia",
  "Borboleta",
  "Cachorro",
  "Cabra",
  "Camelo",
  "Canguru",
  "Caracol",
  "Cavalo",
  "Cervo",
  "Cobra",
  "Coelho",
  "Coruja",
  "Crocodilo",
  "Elefante",
  "Esquilo",
  "Flamingo",
  "Galinha",
  "Gato",
  "Girafa",
  "Golfinho",
  "Hipopótamo",
  "Jacaré",
  "Jaguar",
  "Joaninha",
  "Leão",
  "Leopardo",
  "Lobo",
  "Macaco",
  "Mariposa",
  "Orangotango",
  "Ovelha",
  "Papagaio",
  "Pato",
  "Pavão",
  "Pinguim",
  "Polvo",
  "Pombo",
  "Raposa",
  "Rato",
  "Tartaruga",
  "Tigre",
  "Touro",
  "Urso",
  "Vaca",
  "Zebra",
];

const countries = [
  "Afeganistão",
  "Albânia",
  "Alemanha",
  "Andorra",
  "Angola",
  "Argentina",
  "Austrália",
  "Áustria",
  "Bélgica",
  "Brasil",
  "Canadá",
  "Chile",
  "China",
  "Colômbia",
  "Coreia do Norte",
  "Coreia do Sul",
  "Costa Rica",
  "Croácia",
  "Dinamarca",
  "Egito",
  "Equador",
  "Espanha",
  "Estados Unidos",
  "Finlândia",
  "França",
  "Grécia",
  "Holanda",
  "Hungria",
  "Índia",
  "Indonésia",
  "Irlanda",
  "Itália",
  "Japão",
  "Malásia",
  "México",
  "Noruega",
  "Nova Zelândia",
  "Panamá",
  "Paraguai",
  "Peru",
  "Polônia",
  "Portugal",
  "Reino Unido",
  "República Tcheca",
  "Rússia",
  "Suécia",
  "Suíça",
  "Tailândia",
  "Turquia",
  "Uruguai",
  "Venezuela",
];

const fruits = [
  "Abacate",
  "Abacaxi",
  "Acerola",
  "Ameixa",
  "Amora",
  "Banana",
  "Caju",
  "Caqui",
  "Carambola",
  "Cereja",
  "Coco",
  "Cupuaçu",
  "Damasco",
  "Figo",
  "Framboesa",
  "Goiaba",
  "Groselha",
  "Jabuticaba",
  "Jaca",
  "Kiwi",
  "Laranja",
  "Lichia",
  "Lima",
  "Limão",
  "Maçã",
  "Mamão",
  "Manga",
  "Maracujá",
  "Melancia",
  "Melão",
  "Mexerica",
  "Mirtilo",
  "Morango",
  "Nectarina",
  "Pera",
  "Pêssego",
  "Pitanga",
  "Pitaia",
  "Romã",
  "Tangerina",
];

const professions = [
  "Advogado",
  "Alfaiate",
  "Arquiteto",
  "Ator",
  "Barbeiro",
  "Biólogo",
  "Bombeiro",
  "Cabeleireiro",
  "Carpinteiro",
  "Cientista",
  "Contador",
  "Cozinheiro",
  "Dançarino",
  "Dentista",
  "Designer",
  "Desenhista",
  "Detetive",
  "Economista",
  "Eletricista",
  "Enfermeiro",
  "Engenheiro",
  "Escritor",
  "Farmacêutico",
  "Fisioterapeuta",
  "Garçom",
  "Geólogo",
  "Jornalista",
  "Médico",
  "Mecânico",
  "Motorista",
  "Nutricionista",
  "Oceanógrafo",
  "Padeiro",
  "Piloto",
  "Pintor",
  "Professor",
  "Psicólogo",
  "Publicitário",
  "Recepcionista",
  "Secretário",
  "Segurança",
  "Tradutor",
  "Soldador",
  "Veterinário",
];

const alphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const options = [animals, countries, fruits, professions];
const category = ["Animal", "País", "Fruta", "Profissão"];

let currentImage = 0;

let correctChars = "";

let isComplete = false;

let guessesLeft = 6;

const sortedCategoryIndex = parseInt(Math.random() * options.length);
const sortedWordIndex = parseInt(
  Math.random() * options[sortedCategoryIndex].length
);
const sortedWord = options[sortedCategoryIndex][sortedWordIndex];

function changeImage(path) {
  const imageContainerElement = document.getElementById("imageContainer");
  imageContainerElement.style.background = `url('./images/${path}.png') center center`;
  imageContainerElement.style['background-size'] = "contain";
  imageContainerElement.style['background-repeat'] = "no-repeat";
}

function handleNextErrorImage() {
  currentImage++;

  changeImage(`f${currentImage}`);
}

function handleVictory() {
  changeImage("win");
}

function findMatchIndexes(char) {
  const indexes = [];

  for (let i = 0; i < sortedWord.length; i++) {
    const compareChar = sanitizeChar(sortedWord.charAt(i));

    if (char == compareChar) {
      indexes.push(i);
    }
  }

  return indexes;
}

function addCorrectChar(indexes, char) {
  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];

    document.getElementById("correctWords_" + index).innerHTML =
      sortedWord.charAt(index);
    correctChars += char;
  }
}

function handleWrongGuess() {
  guessesLeft--;
  const guessesLeftText = new Array(guessesLeft).fill('X').join(' ');
  document.getElementById("guessesLeft").innerHTML = "Tentativas restantes: <br/>" + guessesLeftText;
}

function handleCompare(char) {
  const matchIndexes = findMatchIndexes(char);
  const hasMatchedChar = matchIndexes.length > 0;

  if (hasMatchedChar) {
    addCorrectChar(matchIndexes, char);

    if (correctChars.length === sortedWord.length) {
      handleVictory();
    }
  } else {
    handleWrongGuess();
    handleNextErrorImage();

    if (guessesLeft === 0) {
      handleLoss();
    }
  }
}

function handleLoss() {
  for (let i = 0; i < sortedWord.length; i++) {
    document.getElementById("correctWords_" + i).innerHTML = sortedWord[i];
  }
}

function sanitizeChar(char) {
  char = char.toLowerCase();

  if (
    char == "a" ||
    char == "b" ||
    char == "c" ||
    char == "d" ||
    char == "e" ||
    char == "f" ||
    char == "g" ||
    char == "h" ||
    char == "i" ||
    char == "j" ||
    char == "k" ||
    char == "l" ||
    char == "m" ||
    char == "n" ||
    char == "o" ||
    char == "p" ||
    char == "q" ||
    char == "r" ||
    char == "s" ||
    char == "t" ||
    char == "u" ||
    char == "v" ||
    char == "x" ||
    char == "w" ||
    char == "y" ||
    char == "z"
  ) {
    return char;
  } else if (char == "á" || char == "à" || char == "ã" || char == "â") {
    return "a";
  } else if (char == "é" || char == "è" || char == "ê") {
    return "e";
  } else if (char == "í" || char == "ì") {
    return "i";
  } else if (char == "ó" || char == "ò" || char == "ô" || char == "õ") {
    return "o";
  } else if (char == "ú" || char == "ù") {
    return "u";
  } else if (char == "ç") {
    return "c";
  }
}

function handleClick(char) {
  handleCompare(char);
}

function addKeyboard() {
  const keyboardElement = document.getElementById("keyboard");

  for (let i = 0; i < alphabet.length; i++) {
    const button = document.createElement('button');
    button.innerText = alphabet[i];
    button.style['margin-right'] = '16px';
    button.style['margin-bottom'] = '16px';
    button.style.width = '48px';

    button.onclick = () => {
      handleClick(alphabet[i].toLowerCase());
      button.disabled = true;
      button.classList.add('disabled');
    }; 

    keyboardElement.appendChild(button);
  }
}

function onLoad() {
  document.getElementById("category").innerText =
    "Dica: " + category[sortedCategoryIndex];

  const correctCharsContainerElement = document.getElementById(
    "correctCharsContainer"
  );
  for (let i = 0; i < sortedWord.length; i++) {    
    correctCharsContainerElement.innerHTML +=
      '<span id="correctWords_' + i + '" class="correctChar">_</span>';
  }

  addKeyboard();
}

window.addEventListener("load", onLoad);
