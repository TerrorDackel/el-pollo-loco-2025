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
  IMAGES_IDLE = [
    "./imgs/2_character_pepe/1_idle/idle/I-1.png",
    "./imgs/2_character_pepe/1_idle/idle/I-2.png",
    "./imgs/2_character_pepe/1_idle/idle/I-3.png",
    "./imgs/2_character_pepe/1_idle/idle/I-4.png",
    "./imgs/2_character_pepe/1_idle/idle/I-5.png",
    "./imgs/2_character_pepe/1_idle/idle/I-6.png",
    "./imgs/2_character_pepe/1_idle/idle/I-7.png",
    "./imgs/2_character_pepe/1_idle/idle/I-8.png",
    "./imgs/2_character_pepe/1_idle/idle/I-9.png",
    "./imgs/2_character_pepe/1_idle/idle/I-10.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-11.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-12.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-13.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-14.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-15.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-16.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-17.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-18.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-19.png",
    "./imgs/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_WALKING = [
    /* laufanimation */
    "./imgs/2_character_pepe/2_walk/W-21.png",
    "./imgs/2_character_pepe/2_walk/W-22.png",
    "./imgs/2_character_pepe/2_walk/W-23.png",
    "./imgs/2_character_pepe/2_walk/W-24.png",
    "./imgs/2_character_pepe/2_walk/W-25.png",
    "./imgs/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    /* sprunganimation */
    "./imgs/2_character_pepe/3_jump/J-31.png",
    "./imgs/2_character_pepe/3_jump/J-32.png",
    "./imgs/2_character_pepe/3_jump/J-33.png",
    "./imgs/2_character_pepe/3_jump/J-34.png",
    "./imgs/2_character_pepe/3_jump/J-35.png",
    "./imgs/2_character_pepe/3_jump/J-36.png",
    "./imgs/2_character_pepe/3_jump/J-37.png",
    "./imgs/2_character_pepe/3_jump/J-38.png",
    "./imgs/2_character_pepe/3_jump/J-39.png",
    "./imgs/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_HURT = [
    /* animation für verletzungen */
    "./imgs/2_character_pepe/4_hurt/H-41.png",
    "./imgs/2_character_pepe/4_hurt/H-42.png",
    "./imgs/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    /* animationsbilder für todesanimation */
    "./imgs/2_character_pepe/5_dead/D-51.png",
    "./imgs/2_character_pepe/5_dead/D-52.png",
    "./imgs/2_character_pepe/5_dead/D-53.png",
    "./imgs/2_character_pepe/5_dead/D-54.png",
    "./imgs/2_character_pepe/5_dead/D-55.png",
    "./imgs/2_character_pepe/5_dead/D-56.png",
    "./imgs/2_character_pepe/5_dead/D-57.png",
  ];
  /* speichert eine referenz zur aktuellen spielwelt */
  setWorld(world) {
    this.world = world;
  }
  animationInterval;
  collectedBottles = 0;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]); // lädt das erste bild der laufanimation
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
    this.checkCollisionWithEnemies();
  }

  /* startet die animation des charakters */
  animate() {
    this.animationInterval = setInterval(() => {
      // SoundManager.pauseSound(walking);
      this.handleMovement();
      this.updateCamera();
      this.updateAnimation();
    }, 1000 / 30);
  }

  /* pausiert die animation */
  pauseAnimation() {
    clearInterval(this.animationInterval);
  }

  /* setzt die animation fort */
  resumeAnimation() {
    this.animate();
  }

  /* überprüft bewegungseingaben */
  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      SoundManager.playSound("walking");
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      SoundManager.playSound("walking");
    }
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jump();
      SoundManager.playSound("jumping");
    }
  }

  /* überprüft kollisionen mit münzen */
  checkForCoinCollision() {
    if (!this.world) return;
    this.world.coins.forEach((coin, index) => {
      if (this.isColliding(coin)) {
        this.world.coins.splice(index, 1);
        this.world.score += 1;
        this.world.statusBar.setPersentageCoins(this.world.score);
      }
    });
  }

  checkForBottleCollision() {
    if (!this.world || !this.world.bottles) return; // Falls `world` oder `bottles` nicht existieren, abbrechen
    this.world.bottles.forEach((bottle, index) => {
      if (this.isColliding(bottle)) {
        // console.log("Flasche aufgesammelt!");
        this.world.bottles.splice(index, 1); // Flasche aus Array entfernen
        this.collectedBottles = (this.collectedBottles || 0) + 1; // Sicherstellen, dass es eine Zahl ist
        this.world.statusBar.setPersentageBottles(this.collectedBottles); // StatusBar aktualisieren
      }
    });
  }

  /* überprüft kollisionen mit gegnern */
  checkCollisionWithEnemies() {
    if (!this.world || !this.world.level.enemies) return;
    this.world.level.enemies.forEach((enemy, index) => {
      if (this.isCollidingWith(enemy)) {
        if (this.isAboveEnemy(enemy)) {
          console.log("Feind getötet!");
          this.defeatEnemy(enemy, index);
        } else {
          console.log("Schaden genommen!");
          this.hit();
          this.world.statusBar.setPersentageHealth(this.energy);
        }
      }
    });
  }

  isAboveEnemy(enemy) {
    let charFeetY = this.y + this.height; // Y-Koordinate der Füße
    let enemyTopY = enemy.y; // Oberseite des Gegners
    console.log("Prüfe, ob Charakter über dem Feind ist:");
    console.log(`Charakter-Füße: y=${charFeetY}`);
    console.log(`Gegner-Oberseite: y=${enemyTopY}`);
    return (
      charFeetY >= enemyTopY && // Die Füße sind auf oder leicht unter dem Feind
      this.speedY > 0 // Charakter bewegt sich nach unten
    );
  }

  defeatEnemy(enemy, index) {
    if (!(enemy instanceof Endboss)) {
      enemy.isDead = true;
      enemy.playDeathAnimation();
      SoundManager.playSound("chickenDead");
      setTimeout(() => {
        this.world.level.enemies.splice(index, 1);
      }, 500);
    }
  }

  isColliding(collectableObject) {
    return (
      this.x + this.width > collectableObject.x &&
      this.x < collectableObject.x + collectableObject.width &&
      this.y + this.height > collectableObject.y &&
      this.y < collectableObject.y + collectableObject.height
    );
  }

  /* überprüft alle kollisionen */
  handleCollisions() {
    this.checkForCoinCollision();
    this.checkCollisionWithEnemies();
    this.checkForBottleCollision();
  }

  /* zeigt gameover endscreen an */
  showRestartPrompt() {
    let prompt = Object.assign(document.createElement("div"), {
      id: "restartPrompt",
      innerHTML: "Spiel Neustarten: J=Ja, N=Nein",
      style: `position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8); color: white;
            padding: 50px; font-size: 20px; border-radius: 10px;`,
    });
    document.body.appendChild(prompt);
    /* falls ein eventListener existiert erst entfernen*/
    document.removeEventListener("keydown", this.handleRestartEvent);
    // neuer eventListener registrieren
    let self = this;
    this.handleRestartEvent = function (event) {
      if (event.key.toLowerCase() === "n") self.restartGame();
      else if (event.key.toLowerCase() === "j") self.world.restartGame();
    };
    document.addEventListener("keydown", this.handleRestartEvent);
  }

  restartGame() {
    let restartPrompt = document.getElementById("restartPrompt");
    if (restartPrompt) {
      restartPrompt.remove(); // Entferne das Element nur, wenn es existiert
      document.removeEventListener("keydown", this.handleRestartEvent); // Event-Listener entfernen
    }

    SoundManager.stopAllSounds(); // Alle laufenden Sounds stoppen

    // Charakter auf Neustart-Werte setzen
    this.x = 100;
    this.y = 110;
    this.energy = 100;
    this.isDead = false;
    this.setWorld(this.world);
    this.world.camera_x = 0; // Kamera zurücksetzen
    this.world.running = true; // Spiel wieder aktivieren
    this.world.draw(); // Spielfeld neu rendern
  }

  quitGame() {
    // console.log("x Spiel beendet.");
    window.close();
  }

  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  handleWalkingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  handleDeath() {
    if (!this.deadAnimationPlayed) {
      this.playAnimation(this.IMAGES_DEAD);
      SoundManager.playSound("dead");
      setTimeout(() => {
        this.deadAnimationPlayed = true;
        this.showRestartPrompt();
      }, 1000);
    }
  }

  updateAnimation() {
    if (this.isDead()) this.handleDeath();
    else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else this.handleWalkingAnimation();
  }

  /* setzt den sprung des charakters */
  jump() {
    this.speedY = 30;
  }
}
