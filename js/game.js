let canvas;
let world;
let keyboard = new Keyboard;
let restartTimeout;
let gamePaused = false;
let countdownActive = false;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("My character is", world.character);
}

window.addEventListener("keydown", (e) => {
  if (gamePaused && e.keyCode !== 80) return;
  console.log(e.keyCode);
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  if (e.keyCode == 70) {
    keyboard.F = true;
  }
  if (e.keyCode == 74) {
    keyboard.J = true;
  }
  if (e.keyCode == 78) {
    keyboard.N = true;
  }
  if (e.keyCode == 45) {
    keyboard.ZERO = true;
  }
  if (e.keyCode == 77) {
    keyboard.M = true;
  }
  if (e.keyCode == 80) {
    togglePause();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
  if (e.keyCode == 77) {
    keyboard.M = false;
  }
  if (e.keyCode == 74) {
    keyboard.J = false;
  }
  if (e.keyCode == 78) {
    keyboard.N = false;
  }
  if (e.keyCode == 45) {
    keyboard.ZERO = false;
  }
  if (e.keyCode == 80) {
    keyboard.PAUSE = false;
  }
});


/* -------------------PAUSE-------------------------------*/
function togglePause() {
  if (!gamePaused) {
    gamePaused = true;
    world.pauseGame();
    drawPauseScreen();
  } else if (!countdownActive) {
    clearPauseScreen();
    startCountdown();
  }
}

function startCountdown() {
  countdownActive = true;
  let count = 5;

  function countDownStep() {
    if (count > 0) {
      console.log(count);
      speak(count);
      count--;
      setTimeout(countDownStep, 1000);
    } else {
      console.log("GO!");
      speak("GO!");
      world.resumeGame();
      gamePaused = false;
      countdownActive = false;
    }
  }
  countDownStep();
}

function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "de-DE";
  window.speechSynthesis.speak(speech);
}

function drawPauseScreen() {
  let ctx = world.ctx;
  ctx.fillStyle = "rgba(139, 69, 19, 0.9)";
  ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 - 120, 360, 240);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Das Game wurde pausiert.",
    canvas.width / 2,
    canvas.height / 2 - 30
  );
  ctx.fillText(
    "Drücke bitte p erneut.",
    canvas.width / 2,
    canvas.height / 2 + 10
  );
}

function clearPauseScreen() {
  world.draw();
}