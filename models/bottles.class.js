class Bottle extends DrawableObject {
    constructor() {
        super().loadImage("./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.width = 60;
        this.height = 80;
    }

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

    /* überprüft ob der charakter eine flasche aufsammelt */
    checkCollisionBottles() {
        this.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
            SoundManager.playSound(" collectingBottle");
            // console.log(" flasche aufgesammelt");
            this.bottles.splice(index, 1);
            this.character.collectedBottles++;
            this.statusBar.setPersentageBottles(this.character.collectedBottles);
        }
        });
    }
}
