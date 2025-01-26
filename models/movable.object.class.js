class MovableObject extends DrawableObject {

  speed = 0.25;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100; /* höhe der grundenergy bzw Tp leben der mo hat*/
  lastHit = 0;
 
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

  isColliding(mo) {
    /* wenn kollision movableObject*/
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    }
    else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;         /* differenz in milisekunden*/
    timepassed = timepassed / 1000;                                     /* umgerechnet das die differenz in sekunden angezeigt wird*/
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
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
      images.length; /*       let i = 0 % 6;     */
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

  jump(){
    this. speedY = 30;
  }
}
