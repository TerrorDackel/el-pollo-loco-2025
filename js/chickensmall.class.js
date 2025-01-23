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
    super().loadImage("./imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 200 + Math.random() * 520;
    this.y = 340;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.speed = 0.3 + Math.random() * 0.5;
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      let i =
        this.currentImage %
        this.IMAGES_WALKING.length; /*       let i = 0 % 6;     */
      let path = this.IMAGES_WALKING[i]; /* das 0te bild wird geladen */
      this.img = this.imageCache[path];
      this
        .currentImage++; /* jetzt wird um eins erhöht  also zum 1ten bild usw */
    }, 50);
  }
}
