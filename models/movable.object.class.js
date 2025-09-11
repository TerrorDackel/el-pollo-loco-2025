class MovableObject extends DrawableObject {
    speed = 0.25; /* grundgeschwindigkeit des objekts */
    otherDirection = false; /* gibt an, ob das objekt in die andere richtung schaut */
    speedY = 20; /* vertikale geschwindigkeit für sprünge oder fallbewegungen */
    acceleration = 3; /* beschleunigung durch schwerkraft */
    energy = 5; /* lebensenergie des objekts */
    lastHit = 0; /* speichert den zeitpunkt des letzten treffers */

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
        return (this.x + this.width - this.offsetRight) >= (mo.x + mo.offsetLeft) && (this.x - this.offsetLeft) <= (mo.x + mo.width - mo.offsetRight) &&
            (this.y + this.height - this.offsetBottom) >= (mo.y + mo.offsetTop) &&
            (this.y + this.offsetTop) <= (mo.y + mo.height - mo.offsetBottom);
    }

    isIdle() {
        if (new Date().getTime() - this.world.keyboard.lastMove > 3000 && !this.idleTriggered) {
        this.startIdleMode();
        return true;
        }
        return false;
    }

    startIdleMode() {
        if (!this.idleTriggered) {
        this.idleTriggered = true;
        SoundManager.playSound("idle");
        this.playAnimation(this.IMAGES_IDLE);
        document.addEventListener("keydown", () => this.stopIdleMode(), {
            once: true,
        });
        }
    }

    stopIdleMode() {
        SoundManager.pause("idle");
        this.idle_sound.currentTime = 0;
        this.idleTriggered = false;
    }

    /* wenn das objekt getroffen wird, verringert sich die lebensenergie */
    hit() {
        this.energy -= 1; // energie wird um 1 reduziert
        if (this.energy < 0) {
        this.energy = 0; // verhindert, dass energie negativ wird
        } else {
        this.lastHit = new Date().getTime(); // speichert den zeitpunkt des treffers
        }
    }

    /* prüft, ob das objekt kürzlich getroffen wurde */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // zeit seit dem letzten treffer berechnen
        timepassed = timepassed / 3000; // umrechnung in sekunden
        return timepassed < 3; // objekt gilt als verletzt, wenn der treffer weniger als 1 sekunde her ist
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
