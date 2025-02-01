class Coins {
  /* bildquellen für die animation der münze */
  IMAGES_COINS = [
    "./imgs/8_coin/Gold_1.png",
    "./imgs/8_coin/Gold_2.png",
    "./imgs/8_coin/Gold_3.png",
    "./imgs/8_coin/Gold_4.png",
    "./imgs/8_coin/Gold_5.png",
    "./imgs/8_coin/Gold_6.png",
    "./imgs/8_coin/Gold_7.png",
    "./imgs/8_coin/Gold_8.png",
    "./imgs/8_coin/Gold_9.png",
    "./imgs/8_coin/Gold_10.png",
  ];

  /* eigenschaften der münze */
  x = 150;
  y = 150;
  width = 30;
  height = 30;
  rotation = 0;
  currentImage = 0;
  images = [];
  speedY = 20; /* geschwindigkeit der münze entlang der y-achse */
  acceleration = 3; /* beschleunigung der münze durch schwerkraft */
  loaded = false; /* status, ob bilder geladen sind */

  /* speichert versprechen für das laden der bilder */
  loadImagePromises = [];

  constructor() {
    /* lade die bilder und speichere die promises */
    this.loadImagePromises = this.IMAGES_COINS.map((path) => {
      return new Promise((resolve) => {
        let img = new Image();
        img.src = path;
        img.onload = () => resolve(img);
        img.onerror = () =>
          console.error(`fehler beim laden des bildes: ${path}`);
      });
    });

    /* nach dem laden alle bilder bereitstellen */
    Promise.all(this.loadImagePromises).then((images) => {
      this.images = images; /* speichert die geladenen bilder */
      this.currentImage = 0; /* setzt das erste bild als standard */
      this.loaded = true; /* setzt den lade-status auf true */
      this.animate(); /* startet die animation */
    });
  }

  /* zeichnet die münze auf dem canvas */
  draw(ctx) {
    if (this.loaded && this.images.length > 0) {
      ctx.save();
      ctx.translate(
        this.x + this.width / 2,
        this.y + this.height / 2
      ); /* zentriert das bild */
      ctx.rotate(this.rotation); /* dreht das bild */
      ctx.drawImage(
        this.images[this.currentImage],
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      ); /* zeichnet das bild auf dem canvas */
      ctx.restore();
    }
  }

  /* animiert die münze durch wechseln der bilder */
  animate() {
    setInterval(() => {
      if (this.loaded && this.images.length > 0) {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }
    }, 100);
  }

  /* rotiert die münze und entfernt sie nach einer kompletten umdrehung */
  rotateAndDisappear(world) {
    let interval = setInterval(() => {
      this.rotation += 0.2; /* erhöht die rotation */
      if (this.rotation >= Math.PI * 2) {
        clearInterval(
          interval
        ); /* stoppt die rotation nach einer kompletten umdrehung */
        world.removeCoin(this); /* entfernt die münze aus der welt */
      }
    }, 50);
  }

  /* bewegt die münze nach rechts */
  moveRight() {
    this.x += this.speed;
  }

  /* bewegt die münze nach links */
  moveLeft() {
    this.x -= this.speed;
  }

  /* schwerkraft für die münze */
  applyGravity() {
    setInterval(() => {
      if (this.y < 100 || this.speedY > 0) {
        this.y -= this.speedY; /* bewegt die münze nach unten */
        this.speedY -=
          this.acceleration; /* verringert die geschwindigkeit nach unten */
      }
    }, 1000 / 25); /* simuliert die schwerkraft */
  }

  /* prüft, ob die münze mit einem anderen objekt kollidiert */
  isColliding(otherObject) {
    return (
      this.x < otherObject.x + otherObject.width &&
      this.x + this.width > otherObject.x &&
      this.y < otherObject.y + otherObject.height &&
      this.y + this.height > otherObject.y
    );
  }

  /* stellt sicher, dass keine fehler durch fehlende drawFrame-methode auftreten */
  drawFrame(ctx) {
    /* diese methode wird für andere objekte benötigt, aber für coins nicht verwendet */
  }
}
