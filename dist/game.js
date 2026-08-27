"use strict";

const COLS = 20;
const ROWS = 8;
const TOTAL = COLS * ROWS;
const ROUND_SECONDS = 120;
const TARGET = 10;
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const STORAGE_KEY = "counterside-matchten-best-v2-8x20";
const LANGUAGE_STORAGE_KEY = "counterside-matchten-language-v1";
const SNACKS = ["snack", "noodles", "soda"];

const COPY = {
  en: {
    pageTitle: "Break Room RAID — Match Ten",
    score: "SCORE",
    timeLeft: "TIME LEFT",
    rules: "RULES",
    bestScore: "BEST SCORE",
    gameStart: "GAME START",
    operationRules: "OPERATION RULES",
    rulesTitle: "Rules",
    rule1: "Tap and drag to select a rectangular area.",
    rule2: "If the sum of the selected numbers equals 10, Yoo Mina will obtain a snack.",
    rule3: "Each snack collected adds 1 point.",
    rule4: "Collect as many snacks as possible within the time limit to earn a high score.",
    rule5: "If all snacks are collected before time runs out, the remaining time will be recorded.",
    keyboardHelp: "Keyboard: <kbd>R</kbd> restart · <kbd>M</kbd> mute",
    gotIt: "GOT IT",
    noMatches: "NO MATCHES DETECTED",
    restockTitle: "Restock the shelf?",
    restockDetail: "The remaining numbers will change. Cleared spaces and your score stay put.",
    refreshPrompt: "Press the refresh button.",
    reroll: "REFRESH",
    newRecord: "NEW RECORD",
    exit: "EXIT",
    retry: "RETRY",
    switchLanguage: "Switch to Korean",
    languageLabel: "한국어",
    returnTitle: "Return to title",
    restartGame: "Restart game",
    muteAudio: "Mute audio",
    unmuteAudio: "Unmute audio",
    gameLabel: "Match Ten game",
    boardLabel: "20 columns by 8 rows of numbered pantry items",
    tileLabel: "Row {row}, column {column}, number {value}",
    cleared: "Cleared",
    snack: "snack bag",
    noodles: "noodle cup",
    soda: "soda can",
    restocked: "SHELVES RESTOCKED",
    restartConfirm: "Restart this Match Ten round?",
    operationComplete: "OPERATION COMPLETE",
    timeLimit: "TIME LIMIT REACHED",
    successTitle: "Break room secured!",
    failTitle: "The pantry items escaped.",
    reactionAlt: "A frustrated CounterSide chibi character",
    resultArtAlt: "Result character illustration for a score of {score}",
    titleCharactersAlt: "Yoo Mina and Seo Yoon carrying pantry items",
    go: "GO!"
  },
  ko: {
    pageTitle: "탕비실 침공작전 — 숫자 10 맞추기",
    score: "점수",
    timeLeft: "남은 시간",
    rules: "규칙",
    bestScore: "최고 점수",
    gameStart: "게임 시작",
    operationRules: "작전 규칙",
    rulesTitle: "규칙",
    rule1: "터치&드래그로 사각형 영역을 선택할 수 있습니다.",
    rule2: "선택한 숫자의 합이 10이 되면, 유미나가 간식을 획득합니다.",
    rule3: "간식을 획득할 때마다 1점이 추가됩니다.",
    rule4: "제한 시간 안에 최대한 많은 간식을 획득하여 높은 점수에 도전하세요.",
    rule5: "제한 시간이 끝나기 전에 모든 간식을 획득하면 남은 시간이 기록됩니다.",
    keyboardHelp: "키보드: <kbd>R</kbd> 재시작 · <kbd>M</kbd> 음소거",
    gotIt: "확인",
    noMatches: "조합 가능한 숫자가 없습니다.",
    restockTitle: "진열대를 다시 채울까요?",
    restockDetail: "남은 숫자만 바뀝니다. 빈칸과 현재 점수는 유지됩니다.",
    refreshPrompt: "새로고침 버튼을 눌러주세요.",
    reroll: "새로고침",
    newRecord: "신기록",
    exit: "종료",
    retry: "재도전",
    switchLanguage: "영어로 전환",
    languageLabel: "English",
    returnTitle: "타이틀로 돌아가기",
    restartGame: "게임 다시 시작",
    muteAudio: "소리 끄기",
    unmuteAudio: "소리 켜기",
    gameLabel: "숫자 10 맞추기 게임",
    boardLabel: "숫자가 적힌 탕비실 물품 20열 8행",
    tileLabel: "{row}행 {column}열, 숫자 {value}",
    cleared: "빈칸",
    snack: "과자 봉지",
    noodles: "컵라면",
    soda: "탄산음료 캔",
    restocked: "진열대 재입고 완료",
    restartConfirm: "현재 게임을 다시 시작할까요?",
    operationComplete: "작전 완료",
    timeLimit: "제한 시간 종료",
    successTitle: "탕비실 확보 완료!",
    failTitle: "간식을 놓쳤습니다.",
    reactionAlt: "화가 난 카운터사이드 캐릭터",
    resultArtAlt: "{score}점 결과 캐릭터 일러스트",
    titleCharactersAlt: "탕비실 물품을 들고 달리는 유미나와 서윤",
    go: "시작!"
  }
};

const elements = {
  stage: document.querySelector("#stage"),
  gameFrame: document.querySelector(".game-frame"),
  boardShell: document.querySelector(".board-shell"),
  board: document.querySelector("#board"),
  score: document.querySelector("#score"),
  time: document.querySelector("#time"),
  timeReadout: document.querySelector("#time-readout"),
  dragBox: document.querySelector("#drag-box"),
  toast: document.querySelector("#toast"),
  titleScreen: document.querySelector("#title-screen"),
  rulesScreen: document.querySelector("#rules-screen"),
  rerollScreen: document.querySelector("#reroll-screen"),
  resultScreen: document.querySelector("#result-screen"),
  countdown: document.querySelector("#countdown"),
  titleBest: document.querySelector("#title-best"),
  titleBestTime: document.querySelector("#title-best-time"),
  titleLogo: document.querySelector("#game-title"),
  titleStartImage: document.querySelector("#title-start-image"),
  resultScore: document.querySelector("#result-score"),
  resultTime: document.querySelector("#result-time"),
  resultCharacter: document.querySelector("#result-character"),
  newRecord: document.querySelector("#new-record"),
  music: document.querySelector("#music"),
  countSound: document.querySelector("#count-sound"),
  matchSound: document.querySelector("#match-sound"),
  startSound: document.querySelector("#start-sound"),
  audioButton: document.querySelector("#audio-button"),
  languageButton: document.querySelector("#language-button"),
  languageLabel: document.querySelector("#language-label")
};

function updateStageScale() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  document.documentElement.style.setProperty("--stage-scale", String(scale));
}

function viewportPointToStage(clientX, clientY) {
  const rect = elements.stage.getBoundingClientRect();
  return {
    x: (clientX - rect.left) * DESIGN_WIDTH / rect.width,
    y: (clientY - rect.top) * DESIGN_HEIGHT / rect.height
  };
}

const state = {
  values: new Array(TOTAL).fill(0),
  score: 0,
  secondsLeft: ROUND_SECONDS,
  running: false,
  selecting: false,
  dragOrigin: null,
  tileHitboxes: [],
  selectionKey: "",
  selected: [],
  snack: SNACKS[0],
  timer: null,
  deadline: 0,
  muted: false,
  dragBoxTimer: null,
  toastTimer: null,
  best: readBest(),
  language: readLanguage()
};

function readLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en" || saved === "ko") return saved;
  } catch { /* file:// privacy mode */ }
  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function t(key, values = {}) {
  let text = COPY[state.language][key] ?? COPY.en[key] ?? key;
  Object.entries(values).forEach(([name, value]) => { text = text.replaceAll(`{${name}}`, String(value)); });
  return text;
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(element => { element.innerHTML = t(element.dataset.i18nHtml); });
  elements.languageLabel.textContent = t("languageLabel");
  elements.languageButton.setAttribute("aria-label", t("switchLanguage"));
  document.querySelector(".game-frame").setAttribute("aria-label", t("gameLabel"));
  elements.board.setAttribute("aria-label", t("boardLabel"));
  document.querySelector("#back-button").setAttribute("aria-label", t("returnTitle"));
  document.querySelector("#restart-button").setAttribute("aria-label", t("restartGame"));
  elements.audioButton.setAttribute("aria-label", state.muted ? t("unmuteAudio") : t("muteAudio"));
  document.querySelector(".title-characters").alt = t("titleCharactersAlt");
  document.querySelector(".title-reaction").alt = t("reactionAlt");
  const assetLanguage = state.language === "ko" ? "kr" : "en";
  elements.titleLogo.src = `assets/TitleScreen/title_${assetLanguage}.png`;
  elements.titleLogo.alt = t("pageTitle");
  elements.titleStartImage.src = `assets/TitleScreen/start_${assetLanguage}.png`;
  document.querySelector("#start-button").setAttribute("aria-label", t("gameStart"));
  document.querySelector("#rules-title").alt = t("rulesTitle");
  renderBoard();
  if (!elements.resultScreen.hidden) {
    updateResultArt();
  }
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language); } catch { /* file:// privacy mode */ }
}

function toggleLanguage() {
  state.language = state.language === "en" ? "ko" : "en";
  applyLanguage();
}

function readBest() {
  try {
    return { score: 0, remaining: 0, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { score: 0, remaining: 0 };
  }
}

function saveBest() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.best)); } catch { /* file:// privacy mode */ }
  elements.titleBest.textContent = String(state.best.score);
  elements.titleBestTime.textContent = formatTime(state.best.remaining);
}

function randomValue() { return 1 + Math.floor(Math.random() * 9); }

function createBoard() {
  elements.board.replaceChildren();
  for (let index = 0; index < TOTAL; index += 1) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = String(index);
    tile.setAttribute("role", "gridcell");
    tile.innerHTML = '<img class="number" alt="">';
    elements.board.append(tile);
  }
}

function fillBoard(remainingOnly = false) {
  let attempts = 0;
  do {
    for (let index = 0; index < TOTAL; index += 1) {
      if (!remainingOnly || state.values[index] !== 0) state.values[index] = randomValue();
    }
    attempts += 1;
  } while (!findMatch() && attempts < 80);
  renderBoard();
}

function renderBoard() {
  const snackUrl = `url("assets/${state.snack}.png")`;
  [...elements.board.children].forEach((tile, index) => {
    const value = state.values[index];
    tile.className = value ? "tile" : "tile cleared";
    tile.style.setProperty("--snack-image", snackUrl);
    tile.setAttribute("aria-label", value ? t("tileLabel", {
      row: Math.floor(index / COLS) + 1,
      column: index % COLS + 1,
      value
    }) : t("cleared"));
    const image = tile.querySelector(".number");
    image.src = value ? `assets/num-${value}.png` : "";
    image.alt = value ? String(value) : "";
  });
}

function cacheTileHitboxes() {
  state.tileHitboxes = [...elements.board.children].map((tile, index) => {
    const rect = tile.getBoundingClientRect();
    const thirdWidth = rect.width / 3;
    const thirdHeight = rect.height / 3;
    return {
      index,
      left: rect.left + thirdWidth,
      right: rect.right - thirdWidth,
      top: rect.top + thirdHeight,
      bottom: rect.bottom - thirdHeight
    };
  });
}

function rectanglesTouch(first, second) {
  return first.right >= second.left
    && first.left <= second.right
    && first.bottom >= second.top
    && first.top <= second.bottom;
}

function indexesTouchedByDrag(dragRect) {
  return state.tileHitboxes
    .filter(hitbox => rectanglesTouch(dragRect, hitbox))
    .map(hitbox => hitbox.index);
}

function updateSelection(event) {
  if (!state.selecting) return;
  updateDragBox(event);
  const dragRect = elements.dragBox.getBoundingClientRect();
  const selected = indexesTouchedByDrag(dragRect);
  const selectionKey = selected.join(",");
  if (selectionKey === state.selectionKey) return;
  state.selectionKey = selectionKey;
  state.selected = selected;
  const sum = selectionSum();
  const active = new Set(state.selected.filter(index => state.values[index] > 0));

  [...elements.board.children].forEach((tile, index) => {
    tile.classList.toggle("selected", active.has(index));
    tile.classList.toggle("valid", active.has(index) && sum === TARGET);
    tile.classList.toggle("over", active.has(index) && sum > TARGET);
  });

}

function updateDragBox(event) {
  if (!state.dragOrigin) return;
  window.clearTimeout(state.dragBoxTimer);
  const stageRect = elements.stage.getBoundingClientRect();
  const boardRect = elements.board.getBoundingClientRect();
  const scaleX = DESIGN_WIDTH / stageRect.width;
  const scaleY = DESIGN_HEIGHT / stageRect.height;
  const boardLeft = (boardRect.left - stageRect.left) * scaleX;
  const boardRight = (boardRect.right - stageRect.left) * scaleX;
  const boardTop = (boardRect.top - stageRect.top) * scaleY;
  const boardBottom = (boardRect.bottom - stageRect.top) * scaleY;
  const pointer = viewportPointToStage(event.clientX, event.clientY);
  const pointerX = Math.min(boardRight, Math.max(boardLeft, pointer.x));
  const pointerY = Math.min(boardBottom, Math.max(boardTop, pointer.y));
  const left = Math.min(state.dragOrigin.x, pointerX);
  const top = Math.min(state.dragOrigin.y, pointerY);
  const right = Math.max(state.dragOrigin.x, pointerX);
  const bottom = Math.max(state.dragOrigin.y, pointerY);
  elements.dragBox.style.left = `${left}px`;
  elements.dragBox.style.top = `${top}px`;
  elements.dragBox.style.width = `${Math.max(1, right - left)}px`;
  elements.dragBox.style.height = `${Math.max(1, bottom - top)}px`;
  elements.dragBox.classList.add("visible");
}

function hideDragBox(delay = 0) {
  window.clearTimeout(state.dragBoxTimer);
  if (delay > 0) {
    state.dragBoxTimer = window.setTimeout(() => elements.dragBox.classList.remove("visible"), delay);
  } else {
    elements.dragBox.classList.remove("visible");
  }
}

function selectionSum() {
  return state.selected.reduce((sum, index) => sum + state.values[index], 0);
}

function beginSelection(event) {
  if (!state.running || event.button > 0) return;
  event.preventDefault();
  state.selecting = true;
  state.dragOrigin = viewportPointToStage(event.clientX, event.clientY);
  cacheTileHitboxes();
  state.selectionKey = "";
  state.selected = [];
  elements.boardShell.setPointerCapture?.(event.pointerId);
  updateSelection(event);
}

function endSelection(event) {
  if (!state.selecting) return;
  updateSelection(event);
  state.selecting = false;
  state.dragOrigin = null;
  state.tileHitboxes = [];
  state.selectionKey = "";
  hideDragBox(180);
  const activeIndexes = state.selected.filter(index => state.values[index] > 0);
  const matched = activeIndexes.length > 0 && selectionSum() === TARGET;

  if (matched) {
    playSound(elements.matchSound, true);
    activeIndexes.forEach(index => elements.board.children[index].classList.add("match-pop"));
    state.score += activeIndexes.length;
    elements.score.textContent = String(state.score);
    window.setTimeout(() => {
      activeIndexes.forEach(index => { state.values[index] = 0; });
      renderBoard();
      if (state.score >= TOTAL) finishRound(true);
      else if (!findMatch()) showScreen(elements.rerollScreen);
    }, 220);
  } else if (activeIndexes.length) {
    elements.board.classList.remove("invalid");
    void elements.board.offsetWidth;
    elements.board.classList.add("invalid");
  }

  clearSelectionClasses();
}

function clearSelectionClasses() {
  [...elements.board.children].forEach(tile => tile.classList.remove("selected", "valid", "over"));
  state.selected = [];
}

function rectangleSum(minRow, minCol, maxRow, maxCol) {
  let sum = 0;
  let count = 0;
  for (let row = minRow; row <= maxRow; row += 1) {
    for (let col = minCol; col <= maxCol; col += 1) {
      const value = state.values[row * COLS + col];
      sum += value;
      if (value) count += 1;
      if (sum > TARGET) return { sum, count };
    }
  }
  return { sum, count };
}

function findMatch() {
  for (let minRow = 0; minRow < ROWS; minRow += 1) {
    for (let minCol = 0; minCol < COLS; minCol += 1) {
      for (let maxRow = minRow; maxRow < ROWS; maxRow += 1) {
        for (let maxCol = minCol; maxCol < COLS; maxCol += 1) {
          const result = rectangleSum(minRow, minCol, maxRow, maxCol);
          if (result.sum === TARGET && result.count) return { minRow, minCol, maxRow, maxCol };
        }
      }
    }
  }
  return null;
}

function showToast(message) {
  window.clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  state.toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 1450);
}

function formatTime(seconds) {
  return Math.max(0, seconds).toFixed(2);
}

function updateTimer() {
  if (!state.running) return;
  state.secondsLeft = Math.max(0, (state.deadline - performance.now()) / 1000);
  elements.time.textContent = formatTime(state.secondsLeft);
  elements.timeReadout.classList.toggle("danger", state.secondsLeft <= 15);
  if (state.secondsLeft <= 0) finishRound(false);
}

function startTimer() {
  stopTimer();
  state.deadline = performance.now() + state.secondsLeft * 1000;
  updateTimer();
  const tick = () => {
    updateTimer();
    if (state.running) state.timer = window.requestAnimationFrame(tick);
  };
  state.timer = window.requestAnimationFrame(tick);
}

function stopTimer() {
  if (state.timer === null) return;
  window.cancelAnimationFrame(state.timer);
  state.timer = null;
}

async function countdown() {
  elements.countdown.hidden = false;
  const label = elements.countdown.querySelector("span");
  for (const value of [3, 2, 1]) {
    label.textContent = String(value);
    label.style.animation = "none";
    void label.offsetWidth;
    label.style.animation = "countIn .65s ease both";
    playSound(elements.countSound, true);
    await wait(700);
  }
  label.textContent = t("go");
  playSound(elements.startSound, true);
  await wait(530);
  elements.countdown.hidden = true;
}

function wait(milliseconds) { return new Promise(resolve => window.setTimeout(resolve, milliseconds)); }

async function startRound() {
  document.querySelector("#stage").scrollTo(0, 0);
  hideAllScreens();
  state.running = false;
  stopTimer();
  state.score = 0;
  state.secondsLeft = ROUND_SECONDS;
  state.snack = SNACKS[Math.floor(Math.random() * SNACKS.length)];
  elements.score.textContent = "0";
  elements.time.textContent = formatTime(ROUND_SECONDS);
  elements.timeReadout.classList.remove("danger");
  elements.stage.classList.add("game-active");
  elements.stage.classList.remove("result-active");
  elements.gameFrame.classList.add("counting-down");
  fillBoard(false);
  startMusic();
  await countdown();
  elements.gameFrame.classList.remove("counting-down");
  state.running = true;
  startTimer();
}

function finishRound(cleared) {
  if (!state.running) return;
  state.running = false;
  state.selecting = false;
  hideDragBox();
  stopTimer();
  updateTimerDisplayOnly();

  const remaining = cleared ? Math.max(0, Math.ceil(state.secondsLeft)) : 0;
  const isRecord = state.score > state.best.score || (state.score === TOTAL && remaining > state.best.remaining);
  if (isRecord) {
    state.best = { score: state.score, remaining };
    saveBest();
  }

  elements.resultScore.textContent = String(state.score);
  elements.resultTime.textContent = formatTime(cleared ? state.secondsLeft : 0);
  updateResultArt();
  elements.newRecord.hidden = !isRecord;
  showScreen(elements.resultScreen);
}

function updateResultArt() {
  const tier = resultTierForScore(state.score);
  elements.resultCharacter.src = `assets/UI_SINGLE_MATCHTEN_RESULT_0${tier}.png`;
  elements.resultCharacter.className = `result-character result-art-${tier}`;
  elements.resultCharacter.alt = t("resultArtAlt", { score: state.score });
}

function resultTierForScore(score) {
  return score >= 100 ? 3 : score >= 50 ? 2 : 1;
}

function updateTimerDisplayOnly() {
  elements.time.textContent = formatTime(state.secondsLeft);
  elements.timeReadout.classList.remove("danger");
}

function reroll() {
  hideScreen(elements.rerollScreen);
  fillBoard(true);
  state.running = true;
  startTimer();
  showToast(t("restocked"));
}

function confirmRestart() {
  if (!state.running || window.confirm(t("restartConfirm"))) startRound();
}

function showTitle() {
  document.querySelector("#stage").scrollTo(0, 0);
  state.running = false;
  state.selecting = false;
  hideDragBox();
  elements.stage.classList.remove("game-active");
  elements.stage.classList.remove("result-active");
  elements.gameFrame.classList.remove("counting-down");
  stopTimer();
  hideAllScreens();
  elements.titleScreen.classList.add("visible");
  elements.titleScreen.hidden = false;
  startMusic();
}

function showScreen(screen) {
  screen.hidden = false;
  elements.stage.classList.toggle("result-active", screen === elements.resultScreen);
  state.running = false;
  stopTimer();
}

function hideScreen(screen) { screen.hidden = true; }

function hideAllScreens() {
  elements.titleScreen.classList.remove("visible");
  elements.titleScreen.hidden = true;
  [elements.rulesScreen, elements.rerollScreen, elements.resultScreen].forEach(hideScreen);
}

function playSound(audio, restart = false) {
  if (state.muted) return;
  if (restart) audio.currentTime = 0;
  audio.volume = audio === elements.music ? 0.28 : 0.72;
  audio.play().catch(() => {});
}

function startMusic() {
  if (state.muted) return;
  elements.music.volume = 0.28;
  elements.music.play().catch(() => {});
}

function toggleAudio() {
  state.muted = !state.muted;
  elements.audioButton.setAttribute("aria-pressed", String(state.muted));
  elements.audioButton.setAttribute("aria-label", state.muted ? t("unmuteAudio") : t("muteAudio"));
  if (state.muted) elements.music.pause();
  else startMusic();
}

elements.boardShell.addEventListener("pointerdown", beginSelection);
window.addEventListener("pointermove", updateSelection, { passive: false });
window.addEventListener("pointerup", endSelection);
window.addEventListener("pointercancel", endSelection);
document.querySelector("#start-button").addEventListener("click", startRound);
document.querySelector("#play-again-button").addEventListener("click", startRound);
document.querySelector("#restart-button").addEventListener("click", confirmRestart);
document.querySelector("#audio-button").addEventListener("click", toggleAudio);
document.querySelector("#back-button").addEventListener("click", showTitle);
document.querySelector("#title-button").addEventListener("click", showTitle);
document.querySelector("#rules-button").addEventListener("click", () => showScreen(elements.rulesScreen));
document.querySelector("#close-rules-button").addEventListener("click", () => {
  hideScreen(elements.rulesScreen);
  elements.titleScreen.hidden = false;
  elements.titleScreen.classList.add("visible");
});
document.querySelector("#reroll-button").addEventListener("click", reroll);
elements.languageButton.addEventListener("click", toggleLanguage);
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });

window.addEventListener("keydown", event => {
  if (event.repeat) return;
  if (event.key.toLowerCase() === "m") toggleAudio();
  if (event.key.toLowerCase() === "r" && state.running) confirmRestart();
});

window.addEventListener("resize", updateStageScale);
window.visualViewport?.addEventListener("resize", updateStageScale);

document.addEventListener("visibilitychange", () => {
  if (document.hidden || !state.running) return;
  updateTimer();
});

updateStageScale();
createBoard();
applyLanguage();
saveBest();
startMusic();
