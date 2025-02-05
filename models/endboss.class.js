class Endboss extends MovableObject {
  /* der endboss startet mit 3 leben */
  height = 450; /* setzt die höhe des endbosses auf 450 pixel */
  width = 400; /* setzt die breite des endbosses auf 400 pixel */
  y = 10; /* setzt die vertikale position des endbosses auf 10 pixel */
  energy = 3; /* anzahl der leben des endbosses */
  isAngry = false; /* speichert, ob der endboss wütend ist */
  isHurt = false; /* speichert, ob der endboss verletzt ist */
  contactWithCharacter = false; /* speichert, ob der endboss den spieler berührt */

  /* speichert die animationsbilder für die bewegung des endbosses */
  IMAGES_WALK = [
    "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
    "./imgs/4_enemie_boss_chicken/1_walk/G4.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G13.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G14.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G15.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G16.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G17.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G18.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G19.png",
    "./imgs/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /* speichert die animationsbilder, wenn der endboss verletzt wird */
  IMAGES_HURTING = [
    "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
    "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
    "./imgs/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /* speichert die animationsbilder, wenn der endboss wütend wird */
  IMAGES_ANGRY = [
    "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
    "./imgs/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /* speichert die animationsbilder, wenn der endboss stirbt */
  IMAGES_DEAD = [
    "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
    "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
    "./imgs/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /* konstruktor initialisiert den endboss */
  constructor() {
    super().loadImage(
      this.IMAGES_WALK[0]
    ); /* lädt das erste bild der geh-animation */
    this.loadImages(this.IMAGES_WALK); /* lädt alle bilder der geh-animation */
    this.loadImages(
      this.IMAGES_HURTING
    ); /* lädt alle bilder der hurt-animation */
    this.loadImages(this.IMAGES_ANGRY); /* lädt alle bilder der wut-animation */
    this.loadImages(
      this.IMAGES_DEAD
    ); /* lädt alle bilder der todes-animation */
    this.x = 3400; /* setzt die startposition des endbosses */
    this.y = 10; /* setzt die vertikale position */
    this.animate(); /* startet die animationssteuerung */
    this.speed = -0.1; /* setzt die geschwindigkeit des endbosses */
    this.debugMode = true; /* aktiviert den roten rahmen für den endboss */
  }

  /* setzt den status, dass der endboss den spieler berührt */
  letEndbossTouch() {
    this.contactWithCharacter = true; /* speichert, dass der spieler den endboss berührt */
  }

  /* bewegt den endboss nach links */
  endbossMoveLeft() {
    setInterval(() => {
      this.moveLeft(); /* bewegt den endboss kontinuierlich nach links */
    }, 1000 / 50); /* wiederholt die bewegung alle 20 millisekunden */
  }

  /* reduziert die energie des endbosses bei einer kollision mit einer flasche */
  hitByBottle() {
    if (this.energy > 1) {
      this.energy--; /* reduziert energie um 1 */
      this.isHurt = true; /* setzt den status auf verletzt */
      this.playHurtAnimation(); /* spielt die hurt-animation */
    } else {
      this.die(); /* falls energie 0 ist, stirbt der endboss */
    }
  }

  /* spielt die verletzungsanimation */
  playHurtAnimation() {
    let self = this;
    let intervalId = setInterval(() => {
      self.playAnimation(self.IMAGES_HURTING); /* spielt die hurt-animation */
    }, 250); /* wechselt das bild alle 250 millisekunden */

    setTimeout(() => {
      clearInterval(intervalId); /* stoppt die verletzungsanimation */
      self.isHurt = false; /* setzt den status "verletzt" auf false */
      self.isAngry = true; /* setzt den status "wütend" auf true */
      self.playAngryAnimation(); /* startet die wut-animation */
    }, self.IMAGES_HURTING.length * 250); /* animation läuft so lange wie die anzahl der bilder */
  }

  /* spielt die wut-animation */
  playAngryAnimation() {
    setInterval(() => {
      if (!this.isHurt && this.energy > 0) {
        /* prüft, ob der endboss nicht verletzt ist */
        this.playAnimation(this.IMAGES_ANGRY); /* spielt die wut-animation */
      }
    }, 200); /* wechselt das bild alle 200 millisekunden */
  }

  /* endboss stirbt nach 3 treffern */
  die() {
    this.isDead = true; /* setzt den status auf "tot" */
    let self = this;

    let intervalId = setInterval(() => {
      self.playAnimation(self.IMAGES_DEAD); /* spielt die todes-animation */
    }, 250); /* wechselt das bild alle 250 millisekunden */

    setTimeout(() => {
      clearInterval(intervalId); /* stoppt die todes-animation */
      window.location.reload(); /* spiel startet neu */
    }, self.IMAGES_DEAD.length * 250); /* animation läuft so lange wie die anzahl der bilder */
  }

  /* steuert die animationen des endbosses */
  animate() {
    setInterval(() => {
      if (this.isHurt == false) {
        /* falls der endboss nicht verletzt ist */
        this.playAnimation(this.IMAGES_ANGRY); /* spielt die wut-animation */
      }
      if (this.contactWithCharacter == true) {
        /* falls der spieler den endboss berührt */
        this.playAnimation(this.IMAGES_WALK); /* spielt die geh-animation */
        this.endbossMoveLeft(); /* bewegt den endboss nach links */
      }
    }, 200); /* wechselt das bild alle 200 millisekunden */
  }
}
