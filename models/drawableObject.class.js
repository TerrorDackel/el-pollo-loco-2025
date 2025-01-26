class DrawableObject {
      x = 120;
      y = 280;
      height = 200;
      width = 100;
      img;
      imageCache = {};
      currentImage = 0;
      
      loadImage(path) {
            this.img = new Image();
            this.img.src = path;
      }

      
      draw(ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }

      loadImages(arr) {
            arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path];
            this.currentImage = 0;
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


}
