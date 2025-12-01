const keys = ["Q","W","E","R","T","Y","U","I","O","P",
"A","S","D","F","G","H","J","K","L",
"Z","X","C","V","B","N","M"];

const words = [
  "APPLE", "BANANA", "CAT", "DOG", "ELEPHANT",
  "FROG", "GRAPE", "HOUSE", "ICE", "JUNGLE",
  "KITE", "LEMON", "MOON", "NEST", "OCEAN",
  "PIANO", "QUEEN", "RIVER", "SUN", "TREE",
  "UMBRELLA", "VIOLIN", "WATER", "XRAY", "YELLOW", "ZEBRA",
  "AIR", "BALL", "CLOUD", "DREAM", "EAGLE",
  "FLOOR", "GOOSE", "HONEY", "IRON", "JACKET",
  "KNIFE", "LUNCH", "MAGNET", "NORTH", "ORANGE",
  "PAPER", "QUIET", "ROCK", "SNAKE", "TRAIN",
  "UNITY", "VALLEY", "WINDOW", "XOLO", "YEAST", "ZONE",
  "ANGEL", "BREAD", "CANDLE", "DESK", "ENERGY",
  "FEATHER", "GARDEN", "HAMMER", "ISLAND", "JOKE",
  "KING", "LAMP", "MIRROR", "NEEDLE", "OASIS",
  "PEARL", "QUILL", "ROSE", "SILVER", "TOWER",
  "UNDER", "VILLAGE", "WHEEL", "XYLOPHONE", "YARD", "ZINC",
  "ALARM", "BERRY", "CHAIR", "DOLPHIN", "ENGINE",
  "FLOWER", "GHOST", "HAT", "INK", "JAR",
  "KETTLE", "LEAF", "MARKET", "NURSE", "OPERA",
  "PEACH", "QUERY", "RABBIT", "STONE", "TURTLE",
  "UNITY", "VIOLET", "WATERFALL", "XENON", "YACHT", "ZIPPER",
  "ALPHA", "BRIDGE", "CARGO", "DRAGON", "ELEMENT",
  "FOREST", "GUITAR", "HARBOR", "IMAGE", "JOURNEY",
  "KNOCK", "LADDER", "MEMORY", "NINJA", "ORBIT",
  "PILOT", "QUARTZ", "ROBOT", "SCARF", "THUNDER",
  "ULTIMA", "VISION", "WORLD", "XMAS", "YOUTH", "ZODIAC",
  "AMBER", "BOTTLE", "CIRCLE", "DIALOG", "EMERALD",
  "FALCON", "GALAXY", "HERO", "ICON", "JELLY",
  "KERNEL", "LION", "MOTOR", "NATURE", "OMEGA",
  "POTION", "QUOTE", "RHYTHM", "SHADOW", "TEMPLE",
  "URBAN", "VOLCANO", "WONDER", "XOR", "YARN", "ZAPPER",
  "ACORN", "BRANCH", "COFFEE", "DRUM", "ELEVATOR",
  "FLAG", "GOBLIN", "HARBOR", "IVORY", "JUNGLE",
  "KRAKEN", "LOVELY", "MONKEY", "NICKEL", "OATMEAL",
  "PUZZLE", "QUICKSAND", "REACTOR", "SPEAR", "TORCH",
  "UMPIRE", "VOYAGE", "WIZARD", "XENO", "YONDER", "ZIRCON",
  "ANVIL", "BLADE", "COTTON", "DEVICE", "EMBER",
  "FROST", "GEM", "HUNTER", "IDIOM", "JOURNAL",
  "KAYAK", "LOCUST", "MEADOW", "NYLON", "OMELET",
  "POCKET", "QUASAR", "RADIO", "SERPENT", "TICKET",
  "ULTRA", "VECTOR", "WOLF", "XAXIS", "YOGURT", "ZEBU",
  "ARROW", "BRAVO", "CRYSTAL", "DELTA", "ECHO",
  "FIBER", "GIANT", "HUNGER", "INPUT", "JUMP",
  "KARMA", "LOTUS", "METAL", "NOVEL", "ONYX",
  "PHOENIX", "QUIZ", "RALLY", "SPIRIT", "TITAN",
  "URCHIN", "VAULT", "WHALE", "XENIA", "YAM", "ZONEA",
  "AVOCADO", "BISON", "CROWN", "DEER", "ELIXIR",
  "FROGLET", "GLOW", "HEART", "IDEA", "JET",
  "KIDNEY", "LAGOON", "MOSAIC", "NOBLE", "OCTAGON",
  "PANIC", "QUEST", "REWARD", "SWORD", "TWIG",
  "UPPER", "VOLT", "WANDER", "XIPHOS", "YULE", "ZIP"
];

const keyboard = document.getElementById("keyboard");
let targetWord = null;
let nextWord = null;
let score = 0;
let currentInput = "";
let wrongCount = 0;

// QWERTY 키보드 렌더링
function renderKeyboard() {
keyboard.innerHTML = "";
const rows = [
["Q","W","E","R","T","Y","U","I","O","P"],
["A","S","D","F","G","H","J","K","L"],
["Z","X","C","V","B","N","M"],
];
rows.forEach(row => {
const rowDiv = document.createElement("div");
rowDiv.className = "row";
row.forEach(letter => {
const keyBtn = document.createElement("div");
keyBtn.className = "key";
keyBtn.id = `key-${letter}`;
keyBtn.textContent = letter;
rowDiv.appendChild(keyBtn);
});
keyboard.appendChild(rowDiv);
});
}

function getRandomWord() {
return words[Math.floor(Math.random() * words.length)];
}

function updateScore() {
document.getElementById("score").textContent = "Score: " + score;
}

// 현재 목표 + 다음 목표 힌트
function showNewWord() {
currentInput = "";
wrongCount = 0;
// 다음 단어가 현재 타겟이 됨
if (nextWord) {
targetWord = nextWord;
} else {
// 첫 시작
targetWord = getRandomWord();
}

// 새로운 다음 단어 생성
nextWord = getRandomWord();

updateDisplay();

const nextDiv = document.getElementById("next-letter");
// 다음 목표 힌트
nextDiv.textContent = nextWord;
}

function updateDisplay() {
const targetDiv = document.getElementById("target");
targetDiv.innerHTML = "";

for (let i = 0; i < targetWord.length; i++) {
const span = document.createElement("span");
span.textContent = targetWord[i];

if (i < currentInput.length) {
// 이미 입력한 부분 - 초록색
span.className = "correct-char";
} else if (i === currentInput.length && wrongCount > 0) {
// 현재 위치에서 틀린 경우 - 빨간색
span.className = "wrong-char";
} else {
// 아직 입력 안한 부분 - 회색
span.className = "pending-char";
}

targetDiv.appendChild(span);
}
}

// 키 플래시 효과
function flashKey(letter, correct) {
const keyDiv = document.getElementById(`key-${letter}`);
if (!keyDiv) return;
keyDiv.classList.add(correct ? "active" : "wrong");
setTimeout(() => {
keyDiv.classList.remove("active", "wrong");
}, 200);
}

// 키 입력 처리
document.addEventListener("keydown", e => {
// 특수키 무시
if (e.ctrlKey || e.altKey || e.metaKey) return;

const keyPressed = e.key.toUpperCase();

// 알파벳 키만 처리
if (!keys.includes(keyPressed)) return;

// 기본 동작 방지 (스크롤 등)
e.preventDefault();

// 현재 입력 중인 글자의 인덱스
const currentIndex = currentInput.length;

// 현재 입력해야 할 글자
const expectedLetter = targetWord[currentIndex];

if (keyPressed === expectedLetter) {
// 정답
currentInput += keyPressed;
wrongCount = 0;
flashKey(keyPressed, true);
updateDisplay();

// 단어를 완성했는지 확인
if (currentInput === targetWord) {
score++;
updateScore();
setTimeout(() => showNewWord(), 300);
}
} else {
// 오답
wrongCount++;
flashKey(keyPressed, false);
updateDisplay();
}
});

// 게임 시작
window.onload = () => {
renderKeyboard();
showNewWord();
updateScore();
};