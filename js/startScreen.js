/**
 * Shows the game start screen with menu options.
 */
function showStartScreen() {
    const startScreen = document.createElement("div");
    startScreen.id = "startScreen";
    startScreen.innerHTML = `
        <div style="
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white; padding: 20px; font-size: 24px;
            text-align: center; border-radius: 15px;
            width: 400px;">
            <h2 class="header-game-controll">Willkommen bei:</h2>
            <h1 class="header-game-elpolloloco">El Pollo Loco</h1>
            <button class="menu-button" onclick="startGame()">▶️ Spiel starten</button>
            <button class="menu-button" onclick="showRules()">🕹️ Spielregeln</button>
            <button class="menu-button" onclick="showImpressum()">ℹ️ Impressum</button>
        </div>`;
    document.body.appendChild(startScreen);
}

/** Starts the game and removes the start screen. */
function startGame() {
    const startScreen = document.getElementById("startScreen");
    if (startScreen) {
        startScreen.classList.add("fade-out");
        setTimeout(() => { startScreen.remove(); init(); }, 1500);
    }
}

/** Shows the rules overlay. */
function showRules() {
    showOverlay(`
        <h2 class="header-game-controll">Spielregeln im Game:</h2>
        <p class="game-controll-txt">⬅️ Pfeil links: Pepe läuft nach links.</p>
        <p class="game-controll-txt">➡️ Pfeil rechts: Pepe läuft nach rechts.</p>
        <p class="game-controll-txt">⬆️ Pfeil oben: Pepe springt.</p>
        <p class="game-controll-txt">SPACE: Pepe wirft eine Flasche.</p>     
        <p class="game-controll-txt">🔇 T = Musik aus, 🔊 Z = Musik an.</p>     
        <p class="game-controll-txt">⏯️ P = Pause starten/beenden.</p>
        <p class="game-controll-back">Klicke irgendwo hin, um zurückzukehren.</p>
    `);
}

/** Shows the impressum overlay. */
function showImpressum() {
    showOverlay(`
        <h2 class="header-game-controll">Impressum</h2>
        <p class="game-controll-txt">Kreiert von <b>TerrorDackel</b> - 2025</p>
        <p class="game-controll-back">Klicke irgendwo hin, um zurückzukehren.</p>
    `);
}

/**
 * Shows an overlay with given content.
 * @param {string} content - HTML content to display.
 */
function showOverlay(content) {
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.innerHTML = `<div class="overlay-content">${content}</div>`;
    document.body.appendChild(overlay);
    setTimeout(() => document.addEventListener("click", closeOverlay), 200);
}

/**
 * Closes the overlay when user clicks.
 * @param {MouseEvent} event - The click event.
 */
function closeOverlay(event) {
    if (event.type !== "click") return;
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.remove();
    document.removeEventListener("click", closeOverlay);
}
