class ThrowableObjects extends MovableObject {
  /* speichert die bilder für die flaschendrehung während des wurfs */
  IMAGES_THROWBOTTLES = [
    "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SMASHINGBOTTLES = [
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /* konstruktor initialisiert das objekt und lädt die bilder */
  constructor(x, y) {
    super().loadImages(this.IMAGES_THROWBOTTLES);
    this.loadImages(this.IMAGES_SMASHINGBOTTLES);
    this.IMAGES_THROWBOTTLES[0]; /* lädt das erste bild der animation */
    this.x = x; /* setzt die horizontale position der flasche */
    this.y = y; /* setzt die vertikale position der flasche */
    this.height = 60; /* definiert die höhe der flasche */
    this.width = 60; /* definiert die breite der flasche */
    this.debugMode = true; /* aktiviert den roten rahmen für debug zwecke */
    this.animate();
    this.throw();
  }

  isAboveGround() {
    return this.y < 330;
  }

  /* startet die animation der flasche */
  animate() {
    let timeoutSet = false;
    let interval = setInterval(() => {
      if (this.isAboveGround()) {

        this.playAnimation(this.IMAGES_THROWBOTTLES); // Flasche dreht sich beim Werfen
    
      } else {
        if (!timeoutSet) {
          timeoutSet = true;
          this.currentImage = 0;

          setTimeout(() => {
            clearInterval(interval);
            let index = world.throwableObjects.indexOf(this);
            if (index !== -1) {
              world.throwableObjects.splice(index, 1);
            }
          }, 300); // Dauer der Zersplitterungsanimation
        }
        
        this.playAnimation(this.IMAGES_SMASHINGBOTTLES); // Flasche zerbricht am Boden
   
      }
    }, 100); // Aktualisiert Animation alle 100ms
  }

  /* bewegt die flasche nach vorne und lässt sie fallen */
  throw() {
    this.x += 0; /* bewegt die flasche nach rechts */
    this.speedy = 10; /* setzt die anfangsgeschwindigkeit */
    this.applyGravity(); /* aktiviert die gravitation, damit die flasche nach unten fällt */
    setInterval(() => {
      if (this.isAboveGround()) {
        this.x += 10;
      }
    }, 1000 / 50);
  }

  /* integriert die kollisionsprüfung in den update-zyklus */
  update() {
    this.applyGravity(); /* wendet schwerkraft auf die flasche an */
    this.checkBottleEnemyCollision(); /* prüft in jeder frame, ob eine kollision stattgefunden hat */
    this.throw();
  }



  /* Optimierte Kollisionsprüfung für die Flasche */
  isBottleColliding(enemy) {
    let colliding =
      this.x + this.width > enemy.x &&
      this.x < enemy.x + enemy.width &&
      this.y + this.height > enemy.y &&
      this.y < enemy.y + enemy.height;

    console.log(
      `Prüfe Kollision: Flasche (${this.x}, ${this.y}) - Feind (${enemy.x}, ${enemy.y}) →`,
      colliding
    );
    return colliding;
  }
}
