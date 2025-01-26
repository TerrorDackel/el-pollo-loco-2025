class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 200;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.25;
  speedY = 0;
  acceleration = 2;

applyGravity( ){                                          /* hier wird die gravitation eingebaut, damit alle movables nach unten fallen bzw beim springen wieder nach unten fallen*/
  setIntervall(() => {
    if(this.y < 100 ) {                                   /* damit nicht aus dem canvas gefallen wird eine mindest höhe von y < 100 */
      this.y += this.speedY;
      this.speedY -= this.acceleration;
    }
  },  1000 / 23);
}

isAboveGround() {
  this.y < 100;
}
  
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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
    let i = this.currentImage % this.IMAGES_WALKING.length; /*       let i = 0 % 6;     */
    let path = images[i]; /* das 0te bild wird geladen */
    this.img = this.imageCache[path];
    this.currentImage++; /* jetzt wird um eins erhöht  also zum 1ten bild usw */
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
