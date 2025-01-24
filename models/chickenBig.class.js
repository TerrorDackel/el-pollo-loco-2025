class ChickenBig extends MovableObject {
  height = 150;
  width = 150;

  IMAGES_WALKING = [
    /* stripe bilder vom Boss chicken wie es läuft*/
    "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
    "/imgs/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  walking_sound = new Audio("/audio/4_chicken/chickenBig.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 3500;
    this.y = 255;

    this.animate();
    this.speed = 1.5;
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      let i = this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
