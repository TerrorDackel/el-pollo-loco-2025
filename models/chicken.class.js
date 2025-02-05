class Chicken extends MovableObject {
  /* speichert die größe des chickens */
  height = 70; /* höhe des chickens */
  width = 70; /* breite des chickens */
  isDead = false; /* speichert, ob das chicken tot ist */

  IMAGES_WALKING = [
    /* stripe bilder vom chicken wie es läuft*/
    "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  /* speichert das bild für das tote chicken */
  IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /* konstruktor initialisiert das chicken */
  constructor() {
    super().loadImage(
      this.IMAGES_WALKING[0]
    ); /* lädt das erste bild der lauf-animation */
    this.x =
      500 +
      Math.random() *
        3500; /* setzt die zufällige startposition auf der x-achse */
    this.y =
      320 +
      Math.random() *
        15; /* setzt die zufällige startposition auf der y-achse */
    this.loadImages(this.IMAGES_WALKING); /* lädt alle lauf-animationen */
    this.loadImages(this.IMAGES_DEAD); /* lädt das todesbild */
    this.animate(); /* startet die animation */
    this.speed =
      0.55 +
      Math.random() *
        1; /* setzt eine zufällige geschwindigkeit für das chicken */
    this.debugMode = true; /* aktiviert den roten rahmen für debug-zwecke */
    /* setzt die offsets für die hitbox, damit der blaue rahmen genauer passt */
    this.offsetTop = -10; /* reduziert die hitbox nach oben */
    this.offsetBottom = -10; /* reduziert die hitbox nach unten */
    this.offsetLeft = -10; /* macht die hitbox schmaler (links) */
    this.offsetRight = -10; /* macht die hitbox schmaler (rechts) */
  }

  /* methode zur steuerung der bewegung des chickens */
  animate() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft(); /* bewegt das chicken nach links */
        this.playAnimation(this.IMAGES_WALKING); /* spielt die lauf-animation */
      }
    }, 100); /* aktualisiert die bewegung und animation alle 100 millisekunden */
  }

  /* methode, die das chicken sterben lässt */
  die() {
    this.isDead = true; /* setzt den status des chickens auf "tot" */
    this.playAnimation(this.IMAGES_DEAD); /* spielt die todesanimation */
    SoundManager.playSound("chickenDead"); /* spielt den todes-sound */
    setTimeout(
      () => this.removeFromGame(),
      500
    ); /* entfernt das chicken nach 500 millisekunden */
  }

  /* entfernt das chicken aus dem spiel */
  removeFromGame() {
    let index =
      this.world?.level?.enemies.indexOf(
        this
      ); /* prüft, ob das chicken noch in der liste der gegner existiert */
    if (index > -1) {
      this.world.level.enemies.splice(
        index,
        1
      ); /* entfernt das chicken aus der liste der gegner */
    }
  }
}