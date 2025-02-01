class Character extends MovableObject {
  /* setzt die standardgröße des charakters */
  height = 300;
  width = 150;

  /* startposition des charakters */
  x = 0;
  y = 110;

  /* laufgeschwindigkeit des charakters */
  speed = 12;

  /* bildquellen für verschiedene animationen des charakters */
  IMAGES_LONG_IDLE = [
    "imgs/2_character_pepe/1_idle/long_idle/I-11.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-12.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-13.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-14.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-15.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-16.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-17.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-18.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-19.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    /* stripe bilder vom character pepe wie er walked*/
    "./imgs/2_character_pepe/2_walk/W-21.png",
    "./imgs/2_character_pepe/2_walk/W-22.png",
    "./imgs/2_character_pepe/2_walk/W-23.png",
    "./imgs/2_character_pepe/2_walk/W-24.png",
    "./imgs/2_character_pepe/2_walk/W-25.png",
    "./imgs/2_character_pepe/2_walk/W-26.png",
  ];

  /* speichert eine referenz zur aktuellen spielwelt */
  world;

  /* soundeffekte für verschiedene aktionen */
  walking_sound = new Audio("./audio/1_walking/walking.mp3");
  jumping_sound = new Audio("/audio/2_jump/maleShortJump.mp3");
  dead_sound = new Audio("/audio/9_lost/man dying.mp3");
  hurt_sound = new Audio("./audio/10_hit/hit.mp3");

  constructor() {
    super().loadImage(
      this.IMAGES_WALKING[0]
    ); /* lädt das erste bild des laufanimationsarrays */
    this.loadImages(
      this.IMAGES_WALKING
    ); /* lädt alle bilder für die laufanimation */
    this.applyGravity(); /* aktiviert die schwerkraft für den charakter */
    this.animate(); /* startet die animationssteuerung */
  }

  /* überprüft die kollision mit münzen */
  checkForCoinCollision() {
    this.world?.coins?.forEach((coin) => {
      if (this.isColliding(coin)) {
        this.collectCoin(coin);
      }
    });
  }

  /* entfernt die münze aus dem spiel und erhöht die punktzahl */
  collectCoin(coin) {
    this.world.coins.splice(
      this.world.coins.indexOf(coin),
      1
    ); /* entfernt die münze aus dem array */
    this.world.score += 10; /* erhöht die punktzahl */
    console.log("münze gesammelt! neue punktzahl: " + this.world.score);
  }

  /* überprüft die kollision mit feinden */
  checkForEnemyCollisions() {
    if (!this.world || !this.world.enemies)
      return; /* falls world oder enemies nicht definiert sind, wird die funktion beendet */

    this.world.enemies.forEach((enemy) => {
      if (this.isColliding(enemy)) {
        this.hit(); /* der charakter wird verletzt */
      }
    });
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
        this.jumping_sound.play();
      }

      this.world.camera_x = -this.x + 100;
      this.checkForCoinCollision(); /* überprüft, ob der charakter münzen sammelt */
      this.checkForEnemyCollisions(); /* überprüft, ob der charakter mit feinden kollidiert */
    }, 1000 / 60);
  }

  jump() {
    this.speedY = 28; /* setzt die sprungkraft des charakters */
  }
}
