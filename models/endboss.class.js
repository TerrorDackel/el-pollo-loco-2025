class Endboss extends MovableObject {
  height = 300;
  width = 300;

  IMAGES_WALKING = [
    /* stripe bilder vom Boss chicken wie es läuft*/
    "/imgs74_enemie_boss_chicken/2_alert/G5.png",
    "/imgs74_enemie_boss_chicken/2_alert/G6.png",
    "/imgs74_enemie_boss_chicken/2_alert/G7.png",
    "/imgs74_enemie_boss_chicken/2_alert/G8.png",
    "/imgs74_enemie_boss_chicken/2_alert/G9.png",
    "/imgs74_enemie_boss_chicken/2_alert/G10.png",
    "/imgs74_enemie_boss_chicken/2_alert/G11.png",
    "/imgs74_enemie_boss_chicken/2_alert/G12.png",
  ];
  walking_sound = new Audio("/audio/5_chickenBoss/chickenBossLev1.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 3400;
    this.y = 100;
    this.animate();
        this.speed = 0.5;
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
