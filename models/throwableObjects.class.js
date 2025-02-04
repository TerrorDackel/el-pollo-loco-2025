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
    super();

    /* setzt die position und größe der flasche */
    this.x = x;
    this.y = y;
    this.height = 90;
    this.width = 90;

    /* erstellt ein standardbild für die flasche */
    this.img = new Image();
    this.img.src = this.IMAGES_THROWBOTTLES[0];

    /* lädt die bilder für die wurfanimation */
    this.loadImagePromises = Promise.all(
      this.IMAGES_THROWBOTTLES.map((path) => {
        return new Promise((resolve) => {
          let img = new Image();
          img.src = path;
          img.onload = () => resolve(img);
          img.onerror = () =>
            console.error(`fehler beim laden des bildes: ${path}`);
        });
      })
    );

    /* wenn alle bilder geladen wurden, speichert sie das objekt und startet den wurf */
    this.loadImagePromises.then((images) => {
      this.images = images;
      this.currentImage = 0;
      this.loaded = true;
      this.img = images[0]; /* setzt das erste bild als standard */
      this.throw(); /* startet den wurf */
    });
  }

  /* startet die animation der flasche */
  animate() {
    setInterval(() => {
      /* wechselt das bild, wenn die flasche vollständig geladen wurde */
      if (this.loaded && this.images.length > 0) {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }
    }, 200); /* ändert das bild alle 200 millisekunden */
  }

  /* bewegt die flasche nach vorne und lässt sie fallen */
  throw() {
    this.speedy = 50; /* setzt die anfangsgeschwindigkeit für die gravitation */
    this.applyGravity(); /* aktiviert die gravitation */

    setInterval(() => {
      this.x += 40; /* bewegt die flasche nach rechts */
    }, 60); /* ändert die position alle 60 millisekunden */
  }

  /* überprüft, ob die flasche mit einem feind kollidiert */
  isCollidingEnemy(otherEnemy) {
    return (
      this.x < otherEnemy.x + otherEnemy.width &&
      this.x + this.width > otherEnemy.x &&
      this.y < otherEnemy.y + otherEnemy.height &&
      this.y + this.height > otherEnemy.y
    );
  }
}
