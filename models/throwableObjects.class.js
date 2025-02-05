class ThrowableObjects extends MovableObject {
  /* speichert die bilder für die flaschendrehung während des wurfs */
  IMAGES_THROWBOTTLES = [
    "imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /* konstruktor initialisiert das objekt und lädt die bilder */
  constructor(x, y) {
    super(); /* ruft den konstruktor der elternklasse MovableObject auf */
    this.x = x; /* setzt die horizontale position der flasche */
    this.y = y; /* setzt die vertikale position der flasche */
    this.height = 90; /* definiert die höhe der flasche */
    this.width = 90; /* definiert die breite der flasche */
    this.debugMode = true; /* aktiviert den roten rahmen für debug zwecke */

    /* erstellt ein standardbild für die flasche */
    this.img = new Image(); /* erstellt ein neues bildobjekt */
    this.img.src =
      this.IMAGES_THROWBOTTLES[0]; /* lädt das erste bild der animation */

    /* lädt die bilder für die wurfanimation */
    this.loadImagePromises = Promise.all(
      this.IMAGES_THROWBOTTLES.map((path) => {
        return new Promise((resolve) => {
          let img = new Image(); /* erstellt ein bildobjekt */
          img.src = path; /* lädt das bild */
          img.onload = () =>
            resolve(img); /* bestätigt das bild wurde geladen */
          img.onerror = () =>
            console.error(
              `fehler beim laden des bildes: ${path}`
            ); /* zeigt einen fehler, wenn das bild nicht geladen werden kann */
        });
      })
    );

    /* wenn alle bilder geladen wurden, speichert sie das objekt und startet den wurf */
    this.loadImagePromises.then((images) => {
      this.images = images; /* speichert alle geladenen bilder */
      this.currentImage = 0; /* startet mit dem ersten bild */
      this.loaded = true; /* markiert, dass die bilder erfolgreich geladen wurden */
      this.img = images[0]; /* setzt das erste bild als standard */
      this.throw(); /* startet den wurf der flasche */
    });
  }

  /* startet die animation der flasche */
  animate() {
    setInterval(() => {
      if (this.loaded && this.images.length > 0) {
        this.currentImage =
          (this.currentImage + 1) %
          this.images.length; /* wechselt das bild zur nächsten animation */
      }
    }, 200); /* ändert das bild alle 200 millisekunden */
  }

  /* bewegt die flasche nach vorne und lässt sie fallen */
  throw() {
    this.speedy = 50; /* setzt die anfangsgeschwindigkeit für die gravitation */
    this.applyGravity(); /* aktiviert die gravitation, damit die flasche nach unten fällt */

    setInterval(() => {
      this.x += 40; /* bewegt die flasche nach rechts */
    }, 60); /* verändert die position alle 60 millisekunden */
  }

  /* überprüft, ob die flasche mit einem feind kollidiert */
  checkBottleCollision() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.isCollidingEnemy(enemy)) {
        /* prüft, ob die flasche den gegner trifft */
        if (enemy instanceof Endboss) {
          enemy.hitByBottle(); /* falls es ein endboss ist, braucht er mehrere treffer */
        } else {
          enemy.die(); /* falls es ein normaler gegner ist, stirbt er sofort */
        }
        this.removeBottle(); /* entfernt die flasche nach kollision */
      }
    });
  }

  /* integriert die kollisionsprüfung in den update-zyklus */
  update() {
    this.applyGravity(); /* wendet schwerkraft auf die flasche an */
    this.checkBottleCollision(); /* prüft in jeder frame, ob eine kollision stattgefunden hat */
  }

  /* überprüft, ob die flasche mit einem feind kollidiert */
  isCollidingEnemy(otherEnemy) {
    return (
      this.x <
        otherEnemy.x +
          otherEnemy.width /* prüft, ob die linke seite der flasche die rechte des gegners überschneidet */ &&
      this.x + this.width >
        otherEnemy.x /* prüft, ob die rechte seite der flasche die linke des gegners überschneidet */ &&
      this.y <
        otherEnemy.y +
          otherEnemy.height /* prüft, ob die obere seite der flasche die untere des gegners überschneidet */ &&
      this.y + this.height >
        otherEnemy.y /* prüft, ob die untere seite der flasche die obere des gegners überschneidet */
    );
  }
}
