function showStartScreen() {
  let startScreen = document.createElement("div");
  startScreen.id = "startScreen";
  startScreen.innerHTML = `
        <div style="
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white; padding: 20px; font-size: 24px;
            text-align: center; border-radius: 15px;
            width: 400px;
        ">
            <h2 class="header-game-controll">Willkommen bei:</h2>
            <h1 class="header-game-elpolloloco"> El Pollo Loco</h1>
            <button class="menu-button" onclick="startGame()">▶️ Spiel starten</button>
            <button class="menu-button" onclick="showRules()">🕹️ Spielregeln</button>
            <button class="menu-button" onclick="showImpressum()">ℹ️ Impressum</button>
        </div>
    `;
  document.body.appendChild(startScreen);
}

function startGame() {
  let startScreen = document.getElementById("startScreen");

  if (startScreen) {
    startScreen.classList.add("fade-out"); // Sanft ausblenden
    setTimeout(() => {
      startScreen.remove(); // Danach endgültig löschen
      init(); // Spiel starten
    }, 1500); // 1500ms (1,5 Sekunde) für langsameres Fade-Out
  }
}


 
/* spielregeln erscheinen */
function showRules() {
      // console.log(" Spielregelnbutton wurde geklickt!");
  showOverlay(`
        <h2 class="header-game-controll">Spielregeln im Game:</h2>
        <p class="game-controll-txt">⬅️ Pfeil links: Pepe läuft nach links.</p>
        <p class="game-controll-txt">➡️ Pfeil rechts: Pepe läuft nach rechts.</p>
        <p class="game-controll-txt">⬆️ Pfeil oben: Pepe springt.</p>
        <p class="game-controll-txt">SPACE: Pepe wirft eine Flasche.</p>     
        <p class="game-controll-txt">🔇T= Musik aus,🔊 Z=Musik an.</p>     
       <p class="game-controll-txt">⏯️ P= Pause starten, P= Pause beenden.</p>
         <p  class="game-controll-back">Klicke irgendwo hin, um zurück zu kehren.</p>
    `);
}

/* zeigt impressum*/
function showImpressum() {
      //   console.log("ℹIImpressumbutton wurde geklickt!");
  showOverlay(`
        <h2 class="header-game-controll">Impressum</h2>
        <p  class="game-controll-txt">Kreiert von <b>TerrorDackel</b> - 2025</p>
        <p  class="game-controll-back">Klicke irgendwo hin, um zurück zu kehren.</p>
    `);
}

/* erstellt ein overlay für keyboardregeln und  impressum*/
function showOverlay(content) {
//   console.log("overlay wird erstellt");
  let overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.innerHTML = `<div class="overlay-content">${content}</div>`;
  document.body.appendChild(overlay);
  setTimeout(() => {
    document.addEventListener("click", closeOverlay);
  }, 200);

  function closeOverlay(event) {
    // console.log(" overlay schließt durch:", event.type, event.key);

    if (event.type === "click") {
        let overlay = document.getElementById("overlay");
        if (overlay) {
            // console.log("des overlay wird entfernt");
            overlay.remove();
        }
        // EventListener sicher entfernen, damit sie sich nicht stapeln
        document.removeEventListener("click", closeOverlay);
    }
  }

} 