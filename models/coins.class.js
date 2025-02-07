class Coins extends DrawableObject {
  /* bildquellen für die animation der münze */
  IMAGES_COINS = [
    "./imgs/8_coin/Gold_1.png" /* pfad zum ersten bild der münzen-animation */,
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
  x = 150; /* legt die standard-x-position der münze fest */
  y = 150; /* legt die standard-y-position der münze fest */
  width = 25; /* setzt die breite der münze */
  height = 25; /* setzt die höhe der münze */
  rotation = 0; /* winkel der drehung der münze */
  currentImage = 0; /* speichert den index des aktuell angezeigten animationsbildes */
  images = []; /* speichert die geladenen bilder der animation */
  speedY = 20; /* geschwindigkeit der münze entlang der y-achse */
  acceleration = 3; /* beschleunigung der münze durch schwerkraft */
  loaded = false; /* status, ob die bilder der münze vollständig geladen sind */
  loadImagePromises = []; /* speichert die promises für das laden der bilder */

  /* konstruktor lädt die bilder und startet die animation */
  constructor() {
    super(); /* ruft den konstruktor der elternklasse DrawableObject auf */

    /* lädt die bilder und speichert die promises */
    this.loadImagePromises = this.IMAGES_COINS.map((path) => {
      return new Promise((resolve) => {
        let img = new Image(); /* erstellt ein neues bildobjekt */
        img.src = path; /* setzt den pfad des bildes */
        img.onload = () =>
          resolve(img); /* bestätigt, dass das bild erfolgreich geladen wurde */
        img.onerror = () =>
          console.error(
            `fehler beim laden des bildes: ${path}`
          ); /* gibt eine fehlermeldung aus, falls das bild nicht geladen werden kann */
      });
    });

    /* wenn alle bilder geladen wurden, speichert sie das objekt und startet die animation */
    Promise.all(this.loadImagePromises).then((images) => {
      this.images = images; /* speichert die geladenen bilder */
      this.currentImage = 0; /* setzt das erste bild als standard */
      this.loaded = true; /* markiert die münze als geladen */
      this.animate(); /* startet die animation der münze */
    });
  }

  /* zeichnet die münze auf dem canvas */
  draw(ctx) {
    if (this.loaded && this.images.length > 0) {
      /* überprüft, ob die bilder geladen wurden */
      ctx.save(); /* speichert den aktuellen zustand des canvas */
      ctx.translate(
        this.x + this.width / 2,
        this.y + this.height / 2
      ); /* verschiebt die münze, damit die drehung um die mitte erfolgt */

      ctx.drawImage(
        this.images[this.currentImage] /* aktuelles bild der animation */,
        -this.width / 2 /* zentriert das bild horizontal */,
        -this.height / 2 /* zentriert das bild vertikal */,
        this.width /* breite des bildes */,
        this.height /* höhe des bildes */
      ); /* zeichnet die münze auf dem canvas */
      ctx.restore(); /* stellt den vorherigen canvas-zustand wieder her */
      this.drawGreenFrame(ctx); /* zeichnet einen grünen rahmen um die münze */
      // console.log(
      //   "drawGreenFrame für Coin aufgerufen",
      //   this
      // ); /* debug ausgabe */
    }
  }

  /* animiert die münze durch wechseln der bilder */
  animate() {
    setInterval(() => {
      if (this.loaded && this.images.length > 0) {
        /* prüft, ob die animation bereit ist */
        this.currentImage =
          (this.currentImage + 1) %
          this.images.length; /* wechselt das bild zur nächsten animation */
      }
    }, 200); /* wechselt das bild alle 200 millisekunden */
  }

  /* prüft, ob die münze mit einem anderen objekt kollidiert */
  isColliding(collectableObject) {
    return (
      this.x + this.width >
        collectableObject.x /* prüft, ob die linke seite der münze die rechte des objekts überschneidet */ &&
      this.x <
        collectableObject.x +
          collectableObject.width /* prüft, ob die rechte seite der münze die linke des objekts überschneidet */ &&
      this.y + this.height >
        collectableObject.y /* prüft, ob die obere seite der münze die untere des objekts überschneidet */ &&
      this.y <
        collectableObject.y +
          collectableObject.height /* prüft, ob die untere seite der münze die obere des objekts überschneidet */
    );
  }

  /* überprüft kollisionen zwischen character und münzen */
  checkCollisionCoins() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        /* falls eine kollision erkannt wird */
        SoundManager.playSound("coin"); /* spielt den sammel-sound ab */
        this.coins.splice(index, 1); /* entfernt die münze aus dem array */
        this.statusBar.setPersentageCoins(
          this.score++
        ); /* aktualisiert die anzeige der gesammelten münzen */
      }
    });
  }

  /* stellt sicher, dass keine fehler durch fehlende drawFrame-methode auftreten */
  drawFrame(ctx) {
    /* diese methode wird für andere objekte benötigt, aber für coins nicht verwendet */
  }
}
