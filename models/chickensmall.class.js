class Chickensmall extends MovableObject {
  height = 50;
  width = 50;
  isDead = false;

  IMAGES_WALKING = [
    /* stripe bilder vom chicken wie es läuft*/
    "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png"
  ];

  walking_sound = new Audio("/audio/4_chicken/chickenSmall.mp3");
  deadChicken_sound = new Audio("./audio/4_chicken/chicken_dead.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.x = 300 + Math.random() * 3500;
    this.y = 340;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.speed = 0.9 + Math.random() * 0.5;
  }

  animate() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  playDeathAnimation() {
    if (!this.isDead) {
      this.isDead = true;
      this.clearInterval(this.walkingInterval); // Stoppt Bewegung
      this.loadImage(this.IMAGES_DEAD[0]); // Ändert das Bild zu "tot"
      setTimeout(() => this.removeFromGame(), 500); // Entfernt nach 500ms
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
