class SoundManager {
    static sounds = {
        music: new Audio("./audio/6_backgroundsounds/1.mp3"),
        bossMusic: new Audio("./audio/6_backgroundsounds/finalBoss.mp3"),
        walking: new Audio("./audio/1_walking/walking.mp3"),
        jumping: new Audio("./audio/2_jump/maleShortJump.mp3"),
        dead: new Audio("./audio/9_lost/man_dying.mp3"),
        hurt: new Audio("./audio/10_hit/hit.mp3"),
        collectingBottle: new Audio("./audio/7_bottle/bottleClicking.mp3"),
        whisleBottle: new Audio("./audio/7_bottle/whisle.mp3"),
        smashBottle: new Audio("./audio/7_bottle/bottleClicking.mp3"),
        coin: new Audio("./audio/11_coins/collectCoin.mp3"),
        endbossHit: new Audio("./audio/5_chickenBoss/hitEndboss_sound.mp3"),
        chickenSmall: new Audio("./audio/4_chicken/chickenSmall.mp3"),
        chickenBig: new Audio("./audio/4_chicken/chickenBig.mp3"),
        chicken: new Audio("./audio/4_chicken/chickenBig.mp3"),
        chickenSmallDead: new Audio("./audio/4_chicken/chicken_dead.mp3"),
        chickenBigDead: new Audio("./audio/4_chicken/chicken_dead.mp3"),
        chickenDead: new Audio("./audio/4_chicken/chicken_dead.mp3"),
        endboss: new Audio("./audio/5_chickenBoss/chickenBossLev1.mp3"),
        endbossDead: new Audio("./audio/5_chickenBoss/chickenBossLev1.mp3"),
    }

    static isMuted = true

    static volumeSettings = {
        music: 0.35, bossMusic: 0.4, walking: 0.15, jumping: 0.35, dead: 0.3,
        hurt: 0.3, collectingBottle: 0.25, whisleBottle: 0.15, smashBottle: 0.35,
        coin: 0.25, endbossHit: 0.35, chickenSmall: 0.25, chickenBig: 0.25,
        chicken: 0.25, chickenSmallDead: 0.25, chickenBigDead: 0.35,
        chickenDead: 0.35, endboss: 0.35, endbossDead: 0.35
    }

    static toggleSound() {
        this.isMuted = !this.isMuted
        if (this.isMuted) this.muteAll()
        else this.unmuteAll()
    }

    static muteAll() {
        Object.values(this.sounds).forEach(s => { s.pause(); s.muted = true })
        let icon = document.getElementById("sound-toggle")
        if (icon) icon.src = "imgs/logos/musicOff.png"
    }

    static unmuteAll() {
        const targets = {}; Object.entries(this.sounds).forEach(([n, s]) => {
            targets[n] = this.volumeSettings[n] || 0.2
            s.muted = false; s.volume = 0
            if (n !== "music" && n !== "bossMusic") s.play().catch(() => {})
        })
        this.fadeIn(targets); this.updateIcon(true); this.playBackground("music")
    }

    static fadeIn(targets) {
        const duration = 3000, steps = 30, stepTime = duration / steps
        let step = 0
        const fadeInterval = setInterval(() => {
            step++
            Object.entries(this.sounds).forEach(([n, s]) => {
                const t = targets[n]; if (t !== undefined) s.volume = Math.min(t, (step / steps) * t)
            })
            if (step >= steps) clearInterval(fadeInterval)
        }, stepTime)
    }

    static updateIcon(on) {
        let icon = document.getElementById("sound-toggle")
        if (icon) icon.src = on ? "imgs/logos/musicOn.png" : "imgs/logos/musicOff.png"
    }

    static playSound(name) {
        if (!this.isMuted && this.sounds[name]) {
            let s = this.sounds[name]; s.volume = this.volumeSettings[name] || 0.2
            s.currentTime = 0; s.play()
        }
    }

    static pauseSound(name) { if (this.sounds[name]) this.sounds[name].pause() }
    static pauseAllSounds() { Object.values(this.sounds).forEach(s => s.pause()) }

    static stopAllSounds() {
        Object.values(this.sounds).forEach(s => { s.pause(); s.currentTime = 0 })
    }

    static playBackground(type = "music") {
        if (this.isMuted) return
        this.stopBackground(); const s = this.sounds[type]
        if (s) { s.loop = true; s.volume = this.volumeSettings[type] || 0.3; s.play().catch(() => {}) }
    }

    static stopBackground() {
        ["music", "bossMusic"].forEach(n => { let s = this.sounds[n]; s.pause(); s.currentTime = 0 })
    }
}
