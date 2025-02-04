class ChickenBig extends MovableObject {
  height = 150;
  width = 150;
  isDead = false;

  IMAGES_WALKING = [
    /* stripe bilder vom Boss chicken wie es läuft*/
    "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_DEAD = ["imgs/4_enemie_boss_chicken/5_dead/G26.png"];

  // walking_sound = new Audio("/audio/4_chicken/chickenBig.mp3");
  // deadChicken_sound = new Audio("./audio/4_chicken/chicken_dead.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3500;
    this.y = 255;

    this.animate();
    this.speed = 1.5;
  }

  animate() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.walking_sound.play();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  playDeathAnimation() {
    if (!this.isDead) {
      this.isDead = true;
      clearInterval(this.walkingInterval);
      this.loadImage(this.IMAGES_DEAD[0]);
      SoundManager.playSound("chickenDead");
      setTimeout(() => this.removeFromGame(), 500);
    }
  }

  removeFromGame() {
    let index = this.world.level.enemies.indexOf(this);
    if (index > -1) {
      this.world.level.enemies.splice(index, 1);
    }
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      let i = this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
