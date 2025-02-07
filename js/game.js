/**
 * Speichert das Canvas-Element, auf dem das Spiel gezeichnet wird
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Speichert die Spiellogik und das Spielfeld
 * @type {World}
 */
let world;

/**
 * Erstellt eine neue Instanz der Tastatursteuerung
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Speichert das Timeout für das Neustarten des Spiels
 * @type {number}
 */
let restartTimeout;

/**
 * Gibt an, ob das Spiel pausiert ist
 * @type {boolean}
 */
let gamePaused = false;

/**
 * Gibt an, ob der Countdown für das Fortsetzen des Spiels aktiv ist
 * @type {boolean}
 */
let countdownActive = false;

/**
 * Gibt an, ob die Hintergrundmusik an ist
 * @type {boolean}
 */
let musicOn = false;

/**
 * Speichert IDs der laufenden Intervalle
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Zähler für spezielle Funktionen
 * @type {number}
 */
let i = 1;

/**
 * Erstellt ein Intervall, das gestoppt werden kann, indem es in `intervalIds` gespeichert wird.
 * @param {Function} fn - Die Funktion, die in dem Intervall aufgerufen werden soll.
 * @param {number} time - Die Zeit in Millisekunden zwischen den Funktionsaufrufen.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

setStoppableInterval();

/**
 * Wartet, bis das Dokument vollständig geladen ist, und führt dann Initialisierungen durch.
 */
document.addEventListener("DOMContentLoaded", () => {
  showStartScreen(); // Zeigt den Startbildschirm an.
  addSoundIcon(); // Fügt das Lautsprecher-Icon zum Steuerungsmenü hinzu.
});

/**
 * Initialisiert das Spiel, indem es das Canvas-Element speichert,
 * die Spiellogik mit der Welt und der Steuerung erstellt und ggf. die Musik startet.
 */
function init() {
  clearAllIntervals();
  canvas = document.getElementById("canvas"); // Speichert das Canvas-Element.
  
  // initlevel(); // Kann genutzt werden, um Level spezifisch zu initialisieren.
  
  world = new World(canvas, keyboard); // Erstellt eine neue Spiellogik mit der Welt und der Steuerung.
  
}


/**
 * Setzt das Spiel zurück, indem es laufende Prozesse stoppt und eine neue Spielwelt erstellt.
 */
function resetGame() {
  clearAllIntervals();
  stopAnimations();
  removeEventListeners();
  world = null; // Entfernt die alte World-Instanz.
  world = new World(canvas, keyboard); // Erstellt eine neue World-Instanz.
  world.level.enemies.push(new Endboss()); // Setzt den Endboss zurück.
}

/**
 * Beendet alle laufenden Intervalle.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Stoppt laufende Animationen der Spielfigur.
 */
function stopAnimations() {
  if (world && world.character.animationInterval) {
    clearInterval(world.character.animationInterval);
  }
}

/**
 * Entfernt Event Listener, um doppelte Registrierungen zu vermeiden.
 */
function removeEventListeners() {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
}

/**
 * Zeigt den Game-Over-Dialog zum Neustart des Spiels an.
 */
function showRestartPrompt() {
  if (document.getElementById("restartPrompt")) return;

  let prompt = Object.assign(document.createElement("div"), {
    id: "restartPrompt",
    innerHTML: "Spiel Neustarten: J=Ja, N=Nein",
    style: `
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8); color: white;
      padding: 50px; font-size: 20px; border-radius: 10px;
    `,
  });

  document.body.appendChild(prompt);

  // Falls ein EventListener existiert, erst entfernen
  document.removeEventListener("keydown", this.handleRestartEvent);

  let self = this;
  this.handleRestartEvent = function (event) {
    if (event.key.toLowerCase() === "n") {
      window.location.reload(); // Zurück zum Startscreen.
    } else if (event.key.toLowerCase() === "j") {
      self.closeRestartPrompt(); // Fenster schließen und Spiel neu starten.
    }
  };

  document.addEventListener("keydown", this.handleRestartEvent);
}

/**
 * Entfernt das Neustart-Fenster und startet das Spiel neu.
 */
function closeRestartPrompt() {
  let restartPrompt = document.getElementById("restartPrompt");
  if (restartPrompt) {
    restartPrompt.remove(); // Entfernt das Fenster.
    document.removeEventListener("keydown", this.handleRestartEvent); // Event-Listener entfernen.
    init(); // Startet das Spiel neu.
  }
}

/**
 * Erstellt ein Lautsprecher-Symbol und fügt es zur Steuerung hinzu.
 */
function addSoundIcon() {
  let soundIcon = document.createElement("img"); // Erstellt ein neues Bild-Element.
  soundIcon.id = "sound-toggle"; // Vergibt eine eindeutige ID.
  soundIcon.src = "imgs/logos/musicOff.png"; // Standardbild für "Musik aus".
  soundIcon.style.position = "fixed"; // Positioniert das Icon immer sichtbar.
  soundIcon.style.right = "10px"; // Platziert das Icon 10 Pixel vom rechten Rand.
  soundIcon.style.width = "30px"; // Setzt die Breite des Icons auf 30 Pixel.
  soundIcon.style.cursor = "pointer"; // Ändert den Mauszeiger zu einer Hand.
  soundIcon.style.zIndex = "100"; // Stellt sicher, dass das Icon über anderen Elementen angezeigt wird.

  document.body.appendChild(soundIcon); // Fügt das Icon zum Dokument hinzu.
  soundIcon.addEventListener("click", () => SoundManager.toggleSound()); // Ermöglicht das Umschalten des Sounds.
}

/**
 * Schaltet die Hintergrundmusik an oder aus.
 */
function toggleMusic() {
  let soundIcon = document.getElementById("sound-toggle"); // Speichert das Icon.

  if (!musicPlay.paused) { // Prüft, ob die Musik bereits läuft.
    musicPlay.pause(); // Pausiert die Musik.
    soundIcon.src = "imgs/logos/musicOff.png"; // Wechselt das Icon auf "Musik aus".
  } else {
    musicPlay.currentTime = 0; // Setzt die Musik zurück an den Anfang.
    musicPlay.play(); // Startet die Musik.
    soundIcon.src = "imgs/logos/musicOn.png"; // Wechselt das Icon auf "Musik an".
  }
  musicOn = !musicOn; // Wechselt den Zustand der Musik.
}

/**
 * Überwacht, ob eine Taste gedrückt wird, und setzt die zugehörigen Steuerungswerte.
 */
window.addEventListener("keydown", (e) => {
  if (gamePaused && e.keyCode !== 80) return; // Wenn das Spiel pausiert ist, sollen nur bestimmte Tasten funktionieren.

  switch (e.keyCode) {
    case 39: keyboard.RIGHT = true; break; // Pfeiltaste rechts.
    case 37: keyboard.LEFT = true; break; // Pfeiltaste links.
    case 38: keyboard.UP = true; break; // Pfeiltaste hoch.
    case 40: keyboard.DOWN = true; break; // Pfeiltaste runter.
    case 32: // Leertaste (Wurf).
      keyboard.SPACE = true;
      world.checkThrowObjects(); // Prüft, ob ein Objekt geworfen wird.
      break;
    case 68: keyboard.D = true; break; // Taste D.
    case 70: keyboard.F = true; break; // Taste F.
    case 74: keyboard.J = true; break; // Taste J (Ja).
    case 78: keyboard.N = true; break; // Taste N (Nein).
    case 45: keyboard.ZERO = true; break; // Taste 0.
    case 77: keyboard.M = true; break; // Taste M.
    case 80: togglePause(); break; // Taste P (Pause).
    case 90: // Taste Z (Musik an).
      if (!musicOn) toggleMusic();
      break;
    case 84: // Taste T (Musik aus).
      if (musicOn) toggleMusic();
      break;
  }
});

/**
 * Überwacht, ob eine Taste losgelassen wird, und setzt die zugehörigen Steuerungswerte zurück.
 */
window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 39: keyboard.RIGHT = false; break;
    case 37: keyboard.LEFT = false; break;
    case 38: keyboard.UP = false; break;
    case 40: keyboard.DOWN = false; break;
    case 32: keyboard.SPACE = false; break;
    case 68: keyboard.D = false; break;
    case 77: keyboard.M = false; break;
    case 74: keyboard.J = false; break;
    case 78: keyboard.N = false; break;
    case 45: keyboard.ZERO = false; break;
    case 80: keyboard.PAUSE = false; break;
  }
});
/**
 * Pausiert oder setzt das Spiel fort.
 */
// Fix: Pause-Funktion verbessert in game.js
function togglePause() {
    if (!gamePaused) {
        gamePaused = true;
        world.pauseGame();
        clearAllIntervals(); 
        drawPauseScreen();
    } else if (!countdownActive) {
        clearPauseScreen();
        startCountdown();
    }
}

function clearAllIntervals() {
    let highestId = setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
        clearInterval(i);
    }
}

/**
 * Startet den Countdown zum Fortsetzen des Spiels.
 */
function startCountdown() {
  countdownActive = true; // Setzt den Countdown-Status.
  let count = 5; // Countdown beginnt bei 5.

  /**
   * Zählt den Countdown in 2,3-Sekunden-Schritten herunter.
   */
  function countDownStep() {
    if (count > 0) {
      console.log(count); // Gibt den Countdown-Wert in der Konsole aus.
      speak(count); // Gibt den Countdown sprachlich aus.
      count--;
      setTimeout(countDownStep, 2300); // Wiederholt den Countdown alle 2,3 Sekunden.
    } else {
      console.log("GO!");
      speak("GO!");
      world.resumeGame(); // Setzt das Spiel fort.
      gamePaused = false;
      countdownActive = false;
    }
  }
  countDownStep();
}

/**
 * Gibt den übergebenen Text als Sprachausgabe aus.
 * @param {string} text - Der Text, der gesprochen werden soll.
 */
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "de-DE"; // Setzt die Sprache auf Deutsch.
  window.speechSynthesis.speak(speech);
}

/**
 * Zeichnet den Pause-Bildschirm mit einer Meldung.
 */
function drawPauseScreen() {
  let ctx = world.ctx;
  ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
  ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 - 120, 360, 240);
  ctx.fillStyle = "white";
  ctx.font = "20px Helvetica";
  ctx.textAlign = "center";
  ctx.fillText("Das Game wurde pausiert.", canvas.width / 2, canvas.height / 2 - 30);
  ctx.fillText("Drücke bitte P erneut.", canvas.width / 2, canvas.height / 2 + 10);
}

/**
 * Löscht den Pause-Bildschirm und zeichnet das Spiel neu.
 */
function clearPauseScreen() {
  world.draw();
}

/**
 * Aktiviert die Musik, falls sie ausgeschaltet ist.
 */
function enableMusic() {
  if (!musicOn) {
    musicOn = true;
    musicPlay.play();
  }
}

