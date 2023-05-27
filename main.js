const animals = [
  "Baleia",
  "Cachorro",
  "Cavalo",
  "Cobra",
  "Crocodilo",
  "Elefante",
  "Galinha",
  "Gambá",
  "Gato",
  "Golfinho",
  "Leão",
  "Girafa",
  "Lobo",
  "Macaco",
  "Ovelha",
  "Papagaio",
  "Polvo",
  "Pombo",
  "Rinoceronte",
  "Tartaruga",
  "Touro",
  "Urso",
  "Vaca",
];
const countries = [
  "França",
  "Alemanha",
  "Suíça",
  "Suécia",
  "Índia",
  "Afeganistão",
  "Japão",
  "Austrália",
  "Argentina",
];
const fruits = [
  "Abacate",
  "Abacaxi",
  "açaí",
  "Acerola",
  "Amora",
  "Banana",
  "Carambola",
  "Cereja",
  "Goiaba",
  "Jabuticaba",
  "Jaca",
  "Laranja",
];
const professions = [
  "Médico",
  "Dentista",
  "Mecânico",
  "Soldador",
  "Pedreiro",
  "Advogado",
  "Professor",
  "Programador",
  "Vaqueiro",
  "Padeiro",
  "Pintor",
  "Eletricista",
];
const options = [animals, countries, fruits, professions];
const category = ["Animal", "País", "Fruta", "Profissão"];

let currentImage = 0;

let correctChars = "";
let wrongChars = "";

let hasWon = false;
let hasLost = false;

let isComplete = false;

const sortedCategoryIndex = parseInt(Math.random() * options.length);
const sortedWordIndex = parseInt(
  Math.random() * options[sortedCategoryIndex].length
);

const sortedWord = options[sortedCategoryIndex][sortedWordIndex];

function changeImage() {
  currentImage++;
  document.getElementById("image").src = "./images/f" + currentImage + ".png";
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

function addWrongChar(char) {
  wrongChars += char;
  document.getElementById("errors").innerHTML = wrongChars;
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
    addWrongChar(char);
    changeImage();

    if (wrongChars.length >= 6) {
      handleLoss();
    }
  }
}

function handleVictory() {
  hasWon = true;

  setTimeout(() => alert("Você ganhou!\nMeus Parabéns!"), 0);

  handleEndGame();
}

function handleLoss() {
  hasLost = true;

  handleEndGame();

  setTimeout(() => alert('Você perdeu!\nA resposta certa é "' + sortedWord), 0);
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

function handleKey(key) {
  const char = String.fromCharCode(key).toLowerCase();

  if (hasLost) {
    alert("Você já perdeu o jogo!");
  }

  if (hasWon) {
    alert("Você já venceu o jogo!");
  }

  if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
    if (correctChars.indexOf(char) >= 0 || wrongChars.indexOf(char) >= 0) {
      alert('Você já digitou a tecla "' + char + '"');
    } else {
      handleCompare(char);
    }
  } else {
    alert("Caractere inválido! Insira uma letra.");
  }
}

function handleInput(element) {
  handleKey(sanitizeChar(element.value).charCodeAt(0));
  element.value = "";
}

function handleEndGame() {
  document.removeEventListener("keydown", handleKeyDown);

  document.getElementById("input").classList.add("finished");
}

function handleKeyDown() {
  const inputElement = document.getElementById("input");

  inputElement.focus();
}

function onLoad() {
  document.getElementById("category").innerText = category[sortedCategoryIndex];

  const correctCharsContainerElement = document.getElementById(
    "correctCharsContainer"
  );
  for (let i = 0; i < sortedWord.length; i++) {
    correctCharsContainerElement.innerHTML +=
      '<span id="correctWords_' + i + '" class="correctChar">_</span>';
  }

  document.addEventListener("keydown", handleKeyDown);
}

window.addEventListener("load", onLoad);
