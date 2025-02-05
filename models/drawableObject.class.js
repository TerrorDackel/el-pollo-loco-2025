class DrawableObject {
  x = 120;
  y = 280;
  height = 200;
  width = 100;
  img;
  offsetTop = 40;
  offsetBottom = -20;
  offsetRight = 40;
  offsetLeft = 15;

  imageCacheHealth = {};
  imageCacheCoins = {};
  imageCacheBottles = {};
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    if (!this.img) {
      // console.error(" drawImage() Fehler: Kein Bild geladen für", this);
      return; // Verhindert das Zeichnen eines ungültigen Bildes
    }
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

  loadImagesHealth(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCacheHealth[path] = img;
    });
  }

  loadImagesCoins(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCacheCoins[path] = img;
    });
  }

  loadImagesBottles(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCacheBottles[path] = img;
    });
  }
}
