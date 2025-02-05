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
  width = 25;
  height = 25;
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
    }, 200);
  }

  /* prüft ob die münze kollidiert */
  isColliding(collectableObject) {
    return (
      this.x + this.width > collectableObject.x &&
      this.x < collectableObject.x + collectableObject.width &&
      this.y + this.height > collectableObject.y &&
      this.y < collectableObject.y + collectableObject.height
    );
  }

  checkCollisionCoins() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        SoundManager.playSound("coin");
        this.coins.splice(index, 1);
        this.statusBar.setPersentageCoins(this.score++);
      }
    });
  }

  /* stellt sicher, dass keine fehler durch fehlende drawFrame-methode auftreten */
  drawFrame(ctx) {
    /* diese methode wird für andere objekte benötigt, aber für coins nicht verwendet */
  }
}
