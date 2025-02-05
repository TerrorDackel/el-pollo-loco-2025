class Chicken extends MovableObject {
  height = 70;
  width = 70;
  isDead = false;

  IMAGES_WALKING = [
    /* stripe bilder vom chicken wie es läuft*/
    "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.x = 500 + Math.random() * 3500;
    this.y = 320 + Math.random() * 15;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.speed = 0.55 + Math.random() * 1;
  }

  animate() {
   setInterval(() => {
     if (!this.isDead()) {
       this.moveLeft();
     }
   }, 1000 / 60);
   setInterval(() => {
     if (this.isDead()) {
       this.playAnimation(this.IMAGES_DEAD);
     } else {
       this.playAnimation(this.IMAGES_WALKING);
     }
   }, 100);
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
      clearInterval(this.walkingInterval); // Stoppt Bewegung
      this.loadImage(this.IMAGES_DEAD[0]); // Ändert das Bild zu "tot"
      SoundManager.playSound("chickenDead");
      setTimeout(() => this.removeFromGame(), 500); // Entfernt nach 500ms
    }
  }

  removeFromGame() {
    let index = this.world.level.enemies.indexOf(this);
    if (index > -1) {
      this.world.level.enemies.splice(index, 1);
    }
  }
}
