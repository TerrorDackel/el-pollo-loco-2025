class MovableObject extends DrawableObject {
  /* grundgeschwindigkeit des objekts */
  speed = 0.25;

  /* gibt an, ob das objekt in die andere richtung schaut */
  otherDirection = false;

  /* vertikale geschwindigkeit für sprünge oder fallbewegungen */
  speedY = 20;

  /* beschleunigung durch schwerkraft */
  acceleration = 3;

  /* lebensenergie des objekts */
  energy = 100;

  /* speichert den zeitpunkt des letzten treffers */
  lastHit = 0;

  /* aktiviert die schwerkraft für das objekt */
  applyGravity() {
    setInterval(() => {
      /* solange das objekt über dem boden ist oder sich nach oben bewegt, wird es beeinflusst */
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY; // objekt bewegt sich nach oben oder fällt nach unten
        this.speedY -= this.acceleration; // geschwindigkeit nimmt durch gravitation ab
      }
    }, 1000 / 25); // aktualisierung 25 mal pro sekunde
  }

  /* prüft, ob das objekt über dem boden ist */
  isAboveGround() {
    if (this instanceof ThrowableObjects) {
      return true; // wurfobjekte bleiben nicht auf dem boden liegen
    } else {
      return this.y < 100; // wenn y kleiner als 100 ist, ist das objekt über dem boden
    }
  }

  /* prüft, ob zwei objekte kollidieren */
  isColliding(mo) {
    return (
      this.x < mo.x + mo.width && // linke seite des objekts ist vor der rechten seite des anderen objekts
      this.x + this.width > mo.x && // rechte seite des objekts ist nach der linken seite des anderen objekts
      this.y < mo.y + mo.height && // obere seite des objekts ist über der unteren seite des anderen objekts
      this.y + this.height > mo.y // untere seite des objekts ist unter der oberen seite des anderen objekts
    );
  }

  /* wenn das objekt getroffen wird, verringert sich die lebensenergie */
  hit() {
    this.energy -= 20; // energie wird um 20 reduziert
    if (this.energy < 0) {
      this.energy = 0; // verhindert, dass energie negativ wird
    } else {
      this.lastHit = new Date().getTime(); // speichert den zeitpunkt des treffers
    }
  }

  /* prüft, ob das objekt kürzlich getroffen wurde */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // zeit seit dem letzten treffer berechnen
    timepassed = timepassed / 1000; // umrechnung in sekunden
    return timepassed < 1; // objekt gilt als verletzt, wenn der treffer weniger als 1 sekunde her ist
  }

  /* prüft, ob das objekt keine energie mehr hat */
  isDead() {
    return this.energy == 0; // objekt ist tot, wenn energie auf 0 gesunken ist
  }

  /* lädt mehrere bilder in den speicher (cache) */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img; // speichert das bild im cache
    });
  }

  /* spielt eine animation ab, indem bilder aus einem array durchlaufen werden */
  playAnimation(images) {
    let i = this.currentImage % images.length; // bestimmt das aktuelle bild
    let path = images[i]; // pfad des aktuellen bildes
    this.img = this.imageCache[path]; // setzt das bild als aktuelles bild des objekts
    this.currentImage++; // erhöht den index für die nächste bildanzeige
  }

  /* bewegt das objekt nach rechts */
  moveRight() {
    this.x += this.speed;
  }

  /* bewegt das objekt nach links */
  moveLeft() {
    this.x -= this.speed;
  }

  /* lässt das objekt springen */
  jump() {
    this.speedY = 35; // setzt die sprungkraft des objekts
  }
}
