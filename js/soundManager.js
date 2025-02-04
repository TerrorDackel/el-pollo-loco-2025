class SoundManager {
  static sounds = {
    music: new Audio("./audio/6_backgroundsounds/1.mp3"),
    walking: new Audio("./audio/1_walking/walking.mp3"),
    jumping: new Audio("./audio/2_jump/maleShortJump.mp3"),
    dead: new Audio("./audio/9_lost/man dying.mp3"),
    hurt: new Audio("./audio/10_hit/hit.mp3"),
    idle: new Audio("./audio/1_walking/snores.mp3"),
    throwBottle: new Audio("./audio/7_bottle/bottleClicking.mp3"),
    coin: new Audio("./audio/11_coins/collectCoin.mp3"),
    endbossHit: new Audio("./audio/5_chickenBoss/hitEndboss_sound.mp3"),
    chickenSmall: new Audio("/audio/4_chicken/chickenSmall.mp3"),
    chickenBig: new Audio("/audio/4_chicken/chickenBig.mp3"),
    chickenDead: new Audio("./audio/4_chicken/chicken_dead.mp3"),
    endboss: new Audio("/audio/5_chickenBoss/chickenBossLev1.mp3"),
  };

  static isMuted = true;

  static toggleSound() {
    this.isMuted = !this.isMuted;
    Object.values(this.sounds).forEach((sound) => {
      sound.muted = this.isMuted;
      if (sound.loop && !this.isMuted) {
        sound.play(); // Nur Sounds, die geloopt werden, sofort abspielen
      } else {
        sound.pause();
      }
    });

    let soundIcon = document.getElementById("sound-toggle");
    soundIcon.src = this.isMuted
      ? "imgs/logos/musicOff.png"
      : "imgs/logos/musicOn.png";
  }

  static playSound(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0; // Reset, falls schon abgespielt wurde
      this.sounds[soundName].play();
    }
  }
}
