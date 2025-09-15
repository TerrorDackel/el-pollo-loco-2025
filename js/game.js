let canvas
let world
let keyboard = new Keyboard()
let restartTimeout
let gamePaused = false
let countdownActive = false
let musicOn = false
let intervalIds = []
let i = 1

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time)
    intervalIds.push(id)
}

document.addEventListener("DOMContentLoaded", () => {
    showStartScreen()
    addSoundIcon()
})

function init() {
    clearAllIntervals()
    canvas = document.getElementById("canvas")
    world = new World(canvas, keyboard)
}

function resetGame() {
    clearAllIntervals(); stopAnimations(); removeEventListeners()
    world = null; world = new World(canvas, keyboard)
}

function clearAllIntervals() {
    const highestId = setTimeout(() => {}, 0)
    for (let id = 0; id <= highestId; id++) { clearTimeout(id); clearInterval(id) }
}

function stopAnimations() {
    if (world && world.character.animationInterval)
        clearInterval(world.character.animationInterval)
}

function removeEventListeners() {
    window.removeEventListener("keydown", handleKeyDown)
    window.removeEventListener("keyup", handleKeyUp)
}

function showRestartPrompt() {
    if (document.getElementById("restartPrompt")) return
    let prompt = createRestartPrompt()
    document.body.appendChild(prompt)
    document.removeEventListener("keydown", this.handleRestartEvent)
    this.handleRestartEvent = (e) => handleRestartKeys(e, this)
    document.addEventListener("keydown", this.handleRestartEvent)
}

function createRestartPrompt() {
    return Object.assign(document.createElement("div"), {
        id: "restartPrompt",
        innerHTML: "Spiel Neustarten: J=Ja, N=Nein",
        style: `position:absolute;top:50%;left:50%;
                transform:translate(-50%,-50%);
                background:rgba(0,0,0,0.8);color:white;
                padding:50px;font-size:20px;border-radius:10px;`
    })
}

function handleRestartKeys(event, ctx) {
    if (event.key.toLowerCase() === "n") window.location.reload()
    else if (event.key.toLowerCase() === "j") ctx.closeRestartPrompt()
}

function closeRestartPrompt() {
    let restartPrompt = document.getElementById("restartPrompt")
    if (restartPrompt) {
        restartPrompt.remove()
        document.removeEventListener("keydown", this.handleRestartEvent)
        init()
    }
}

function addSoundIcon() {
    let soundIcon = document.createElement("img")
    soundIcon.id = "sound-toggle"; soundIcon.src = "imgs/logos/musicOff.png"
    Object.assign(soundIcon.style, {
        position: "fixed", right: "10px", width: "30px",
        cursor: "pointer", zIndex: "100"
    })
    document.body.appendChild(soundIcon)
    soundIcon.addEventListener("click", () => SoundManager.toggleSound())
}

function toggleMusic() {
    let soundIcon = document.getElementById("sound-toggle")
    if (!musicPlay.paused) disableMusic(soundIcon)
    else enableMusicPlay(soundIcon)
    musicOn = !musicOn
}

function disableMusic(icon) {
    musicPlay.pause(); icon.src = "imgs/logos/musicOff.png"
}

function enableMusicPlay(icon) {
    musicPlay.currentTime = 0; musicPlay.play()
    icon.src = "imgs/logos/musicOn.png"
}

/* ---------------- KEY EVENTS ---------------- */
window.addEventListener("keydown", (e) => {
    if (gamePaused && e.keyCode !== 80) return
    handleKeyDownEvents(e)
})

function handleKeyDownEvents(e) {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = true; break
        case 37: keyboard.LEFT = true; break
        case 38: keyboard.UP = true; break
        case 40: keyboard.DOWN = true; break
        case 32: handleSpaceKey(); break
        case 68: keyboard.D = true; break
        case 70: keyboard.F = true; break
        case 74: keyboard.J = true; break
        case 78: keyboard.N = true; break
        case 45: keyboard.ZERO = true; break
        case 77: keyboard.M = true; break
        case 80: togglePause(); break
        case 90: if (!musicOn) toggleMusic(); break
        case 84: if (musicOn) toggleMusic(); break
    }
}

function handleSpaceKey() {
    if (!keyboard.SPACE) {
        keyboard.SPACE = true
        if (world) world.tryThrowObject()
    }
}

window.addEventListener("keyup", (e) => handleKeyUpEvents(e))

function handleKeyUpEvents(e) {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = false; break
        case 37: keyboard.LEFT = false; break
        case 38: keyboard.UP = false; break
        case 40: keyboard.DOWN = false; break
        case 32: keyboard.SPACE = false; break
        case 68: keyboard.D = false; break
        case 77: keyboard.M = false; break
        case 74: keyboard.J = false; break
        case 78: keyboard.N = false; break
        case 45: keyboard.ZERO = false; break
        case 80: keyboard.PAUSE = false; break
    }
}
/* -------------------------------------------- */

function togglePause() {
    if (!gamePaused) pauseGame()
    else if (!countdownActive) { clearPauseScreen(); startCountdown() }
}

function pauseGame() {
    gamePaused = true; world.pauseGame(); drawPauseScreen()
}

function startCountdown() {
    countdownActive = true; let count = 5
    const countDownStep = () => {
        if (count > 0) { console.log(count); speak(count); count--; setTimeout(countDownStep, 2300) }
        else resumeAfterCountdown()
    }
    countDownStep()
}

function resumeAfterCountdown() {
    console.log("GO!"); speak("GO!"); world.resumeGame()
    gamePaused = false; countdownActive = false
}

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text)
    speech.lang = "de-DE"; window.speechSynthesis.speak(speech)
}

function drawPauseScreen() {
    let ctx = world.ctx
    ctx.fillStyle = "rgba(0,0,0,0.9)"
    ctx.fillRect(canvas.width/2-180, canvas.height/2-120, 360, 240)
    ctx.fillStyle = "white"; ctx.font = "20px Helvetica"; ctx.textAlign = "center"
    ctx.fillText("Das Game wurde pausiert.", canvas.width/2, canvas.height/2-30)
    ctx.fillText("Drücke bitte P erneut.", canvas.width/2, canvas.height/2+10)
}

function clearPauseScreen() { world.draw() }

function enableMusic() {
    if (!musicOn) { musicOn = true; musicPlay.play() }
}
