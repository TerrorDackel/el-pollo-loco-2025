class Chickensmall extends MovableObject {
  height = 50;
  width = 50;

  IMAGES_WALKING = [
    /* stripe bilder vom chicken wie es läuft*/
    "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.x = 300 + Math.random() * 3500;
    this.y = 340;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.speed = 0.7 + Math.random() * 1.5;
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      let i = this.playAnimation(this.IMAGES_WALKING);
    }, 50);
  }
}
