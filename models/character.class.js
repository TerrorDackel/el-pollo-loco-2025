class Character extends MovableObject {
  height = 300;
  width = 150;
  x = 0;
  y = 110;
  speed = 12;
  IMAGES_WALKING = [
    /* stripe bilder vom character pepe wie er läuft*/
    "imgs/2_character_pepe/2_walk/W-21.png" /* das 0te bild*/,
    "imgs/2_character_pepe/2_walk/W-22.png",
    "imgs/2_character_pepe/2_walk/W-23.png",
    "imgs/2_character_pepe/2_walk/W-24.png",
    "imgs/2_character_pepe/2_walk/W-25.png",
    "imgs/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  walking_sound = new Audio("./audio/1_walking/walking.mp3");
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed; /* += dann bewegung nach rechts */
        this.otherDirection = false; /* wenn rechtstaste dann wird img character nicht gespiegelt, false*/
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed; /* -= dann bewegung nach links */
        this.otherDirection = true; /* wenn linkstaste dann wird img character gespiegelt, true*/
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        /*walk animation*/
      this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

  jump() {}
}
