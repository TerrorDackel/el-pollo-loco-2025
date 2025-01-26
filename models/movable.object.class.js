class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 200;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.25;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;

  applyGravity() {
    /* hier wird die gravitation eingebaut, damit alle movables nach unten fallen bzw beim springen wieder nach unten fallen*/
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    /* gibt uns feedback ob sich ein movable object auf dem boden befindet oder nicht*/
    return this.y < 100;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      /* instanceof heißt wenn man teil von ... ist. hier zb wenn man ein character oder ein chicken ist*/
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {                             /* wenn kollision movableObject*/
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path];
      this.currentImage = 0;
    });
  }

  /**
   *
   *  @param {Array} arr - ['img/image1.png', 'img/image2.png', ... ]
   */
  loadImages(arr) {
    /* arr ist array hier laden wir die bilder des characters pepe rein*/

    arr.forEach((path) => {
      /* arr ist abkürzung für array*/
      /* schleife damit alle bilder im arr von function loadImages angezeigt werden*/
      let img =
        new Image(); /* hier lege wir eine neue variable an mit einem bild*/
      img.src =
        path; /* hier laden wir das bild in das diese new Image hinein */
      this.imageCache[path] =
        img; /* image cache wird geupdatet hier sind die bilder reingeladen*/
    });
  }

  playAnimation(images) {
    let i =
      this.currentImage %
      this.IMAGES_WALKING.length; /*       let i = 0 % 6;     */
    let path = images[i]; /* das 0te bild wird geladen */
    this.img = this.imageCache[path];
    this.currentImage++; /* jetzt wird um eins erhöht  also zum 1ten bild usw */
  }

  moveRight() {
    this.x += this.speed; /* += dann bewegung nach rechts */
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
