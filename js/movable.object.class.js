class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 200;
  width = 100;
  imageCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
    let img = new Image();
    img.src = path;
    this.imageCache[path];
  });
}

  /**
   *
   *  @param {Array} arr - ['img/image1.png', 'img/image2.png', ... ]
   */
  loadImages(arr) {
    /* arr ist abkürzung für array*/
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
     this.imageCache[path] = path;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    console.log("Moving left");
  }
}
