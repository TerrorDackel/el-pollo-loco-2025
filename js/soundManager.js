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
    };

    static isMuted = true;

    static volumeSettings = {
        music: 0.35,
        bossMusic: 0.4,
        walking: 0.15,
        jumping: 0.35,
        dead: 0.3,
        hurt: 0.3,
        collectingBottle: 0.25,
        whisleBottle: 0.15,
        smashBottle: 0.35,
        coin: 0.25,
        endbossHit: 0.35,
        chickenSmall: 0.25,
        chickenBig: 0.25,
        chicken: 0.25,
        chickenSmallDead: 0.25,
        chickenBigDead: 0.35,
        chickenDead: 0.35,
        endboss: 0.35,
        endbossDead: 0.35
    };

    static toggleSound() {
        this.isMuted = !this.isMuted;

        if (!this.isMuted) {
            // Zielwerte merken und alle Volumes auf 0
            const targetVolumes = {};
            Object.entries(this.sounds).forEach(([name, sound]) => {
                targetVolumes[name] = this.volumeSettings[name] || 0.2;
                sound.muted = false;
                sound.volume = 0;
                if (name !== "music" && name !== "bossMusic") {
                    sound.play().catch(() => {});
                }
            });

            // Fade-In starten (3 Sekunden, 30 Schritte)
            const duration = 3000;
            const steps = 30;
            const stepTime = duration / steps;
            let currentStep = 0;

            const fadeInterval = setInterval(() => {
                currentStep++;
                Object.entries(this.sounds).forEach(([name, sound]) => {
                    const target = targetVolumes[name];
                    if (target !== undefined) {
                        sound.volume = Math.min(target, (currentStep / steps) * target);
                    }
                });
                if (currentStep >= steps) {
                    clearInterval(fadeInterval);
                }
            }, stepTime);

            // Icon und Hintergrundmusik
            let soundIcon = document.getElementById("sound-toggle");
            if (soundIcon) {
                soundIcon.src = "imgs/logos/musicOn.png";
            }
            this.playBackground("music");
        } else {
            // ausschalten
            Object.values(this.sounds).forEach(sound => {
                sound.pause();
                sound.muted = true;
            });
            let soundIcon = document.getElementById("sound-toggle");
            if (soundIcon) {
                soundIcon.src = "imgs/logos/musicOff.png";
            }
        }
    }

    static playSound(soundName) {
        if (!this.isMuted && this.sounds[soundName]) {
            this.sounds[soundName].volume = this.volumeSettings[soundName] || 0.2;
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }

    static pauseSound(soundName) {
        if (this.sounds[soundName]) this.sounds[soundName].pause();
    }

    static pauseAllSounds() {
        Object.values(this.sounds).forEach(sound => sound.pause());
    }

    static stopAllSounds() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    static playBackground(type = "music") {
        if (this.isMuted) return;
        this.stopBackground();
        const sound = this.sounds[type];
        if (sound) {
            sound.loop = true;
            sound.volume = this.volumeSettings[type] || 0.3;
            sound.play().catch(() => {});
        }
    }

    static stopBackground() {
        ["music", "bossMusic"].forEach(name => {
            let snd = this.sounds[name];
            snd.pause();
            snd.currentTime = 0;
        });
    }
}
