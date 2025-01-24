class Chicken extends MovableObject {
  height = 70;
  width = 70;

  IMAGES_WALKING = [
    /* stripe bilder vom chicken wie es läuft*/
    "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  walking_sound = new Audio("/audio/4_chicken/chickenBig.mp3");

  constructor() {
    super().loadImage("./imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 3500;
    this.y = 320 + Math.random() * 15;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.speed = 0.15 + Math.random() * 1;
  }

  animate() {
    
    this.moveLeft();


    setInterval(() => {
      let i = this.playAnimation(this.IMAGES_WALKING);

    }, 100);
  }
}
