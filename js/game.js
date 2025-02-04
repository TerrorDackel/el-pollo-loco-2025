let canvas;
let world;
let keyboard = new Keyboard;
let restartTimeout;
let gamePaused = false;
let countdownActive = false;
let musicOn = false;
let musicPlay = new Audio("./audio/6_backgroundsounds/1.mp3");

document.addEventListener("DOMContentLoaded", () => {
  showStartScreen(); // Nur den Startbildschirm anzeigen
  addSoundIcon(); // Lautsprecher-Icon hinzufügen
});


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  // console.log("My character is", world.character);
  musicPlay.loop = true;
  // musicPlay.play(); //
}

/*lautsprechericon einfügen und fixieren*/
function addSoundIcon() {
  let soundIcon = document.createElement("img");
  soundIcon.id = "sound-toggle";
  soundIcon.src = "imgs/logos/musicOff.png";
  soundIcon.style.position = "fixed";
  soundIcon.style.right = "10px";
  soundIcon.style.width = "50px";
  soundIcon.style.cursor = "pointer";
  soundIcon.style.zIndex = "100"; /* über allem */

  document.body.appendChild(soundIcon);
  soundIcon.addEventListener("click", () => SoundManager.toggleSound());
}


function toggleMusic() {
  let soundIcon = document.getElementById("sound-toggle");

  if (!musicPlay.paused) {
    musicPlay.pause();
    soundIcon.src = "imgs/logos/musicOff.png";
  } else {
    musicPlay.currentTime = 0; // Setzt die Musik zurück
    musicPlay.play();
    soundIcon.src = "imgs/logos/musicOn.png";
  }
  musicOn = !musicOn;
}


window.addEventListener("keydown", (e) => {
  if (gamePaused && e.keyCode !== 80) return;
  // console.log(e.keyCode);
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
    world.checkThrowObjects(); 
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
   if (e.keyCode == 90) {
     if (!musicOn) toggleMusic();
   }
   if (e.keyCode == 84) {
     if (musicOn) toggleMusic();
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
      setTimeout(countDownStep, 2300);
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
  let x = canvas.width / 2 - 180;
  let y = canvas.height / 2 - 120;
  let width = 360;
  let height = 240;
  let borderRadius = 30;
  ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + width - borderRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
  ctx.lineTo(x + width, y + height - borderRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
  ctx.lineTo(x + borderRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
  ctx.lineTo(x, y + borderRadius);
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Das Game wurde pausiert.", canvas.width / 2, canvas.height / 2 - 30);
  ctx.fillText("Drücke bitte P erneut.", canvas.width / 2, canvas.height / 2 + 10);
}

function clearPauseScreen() {
  world.draw();
}

function enableMusic() {
    if (!musicOn) {
        musicOn = true;
        musicPlay.play();
    }
}
