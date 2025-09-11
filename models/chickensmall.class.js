class Chickensmall extends MovableObject {
    /* legt die größe des chickensmall fest */
    height = 50; /* setzt die höhe des chickensmall auf 50 pixel */
    width = 50; /* setzt die breite des chickensmall auf 50 pixel */
    isDead = false; /* speichert, ob das chickensmall tot ist */

    /* speichert die animationsbilder für das laufen des chickensmall */
    IMAGES_WALKING = [
        "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png" /* erstes bild der lauf-animation */,
        "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png" /* zweites bild der lauf-animation */,
        "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png" /* drittes bild der lauf-animation */,
    ];

    /* speichert das bild für das tote chickensmall */
    IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    /* konstruktor initialisiert das chickensmall */
    constructor() {
        super().loadImage(
        this.IMAGES_WALKING[0]
        ); /* lädt das erste bild der lauf-animation */
        this.x =
        600 +
        Math.random() *
            3500; /* setzt die zufällige startposition auf der x-achse */
        this.y = 340; /* setzt die y-position des chickensmall auf 340 pixel */
        this.loadImages(this.IMAGES_WALKING); /* lädt alle lauf-animationen */
        this.loadImages(this.IMAGES_DEAD); /* lädt das todesbild */
        this.animate(); /* startet die animation */
        this.speed =
        0.9 +
        Math.random() *
            0.9; /* setzt eine zufällige geschwindigkeit für das chickensmall */
        this.debugMode = true; /* aktiviert den roten rahmen für debug-zwecke */

        this.world =
        null; /* initialisiert die welt-variable für das objekt, wird später gesetzt */
        this.offsetTop = -10; /* reduziert die hitbox nach oben */
        this.offsetBottom = -10; /* reduziert die hitbox nach unten */
        this.offsetLeft = -10; /* macht die hitbox schmaler (links) */
        this.offsetRight = -10; /* macht die hitbox schmaler (rechts) */
    }

    /* methode zum setzen der spielwelt für das chickensmall */
    setWorld(world) {
        this.world = world; /* speichert eine referenz zur spielwelt */
    }

    /* methode, die das chickensmall sterben lässt */
    die() {
        this.isDead = true; /* setzt den status des chickensmall auf "tot" */
        this.playAnimation(this.IMAGES_DEAD); /* spielt die todesanimation */
        SoundManager.playSound("chickenDead"); /* spielt den todes-sound */
        setTimeout(
        () => this.removeFromGame(),
        500
        ); /* entfernt das chickensmall nach 500 millisekunden */
    }

    /* entfernt das chickensmall aus dem spiel */
    removeFromGame() {
        let index = this.world?.level?.enemies.indexOf(this); // Welt-Check hinzugefügt
        if (index > -1) {
        this.world.level.enemies.splice(index, 1);
        }
    }

    /* methode zur steuerung der bewegung des chickensmall */
    animate() {
        this.walkingInterval = setInterval(() => {
        if (!this.isDead) {
            this.moveLeft(); /* bewegt das chickensmall nach links */
            this.playAnimation(this.IMAGES_WALKING); /* spielt die lauf-animation */
        }
        }, 100); /* aktualisiert die bewegung und animation alle 100 millisekunden */

        setInterval(() => {
        if (this.isDead) {
            this.playAnimation(this.IMAGES_DEAD); /* spielt die todes-animation */
        } else {
            this.playAnimation(this.IMAGES_WALKING); /* spielt die lauf-animation */
        }
        }, 130); /* wechselt die animation alle 130 millisekunden */
    }
}
