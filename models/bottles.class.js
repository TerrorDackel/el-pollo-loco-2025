/**
 * Represents a bottle object that can be collected in the game.
 * Extends DrawableObject to inherit drawable behaviour.
 */
class Bottle extends DrawableObject {

    /**
     * Creates a new Bottle instance.
     */
    constructor() {
        super();
        this.loadImage("./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.width = 60;
        this.height = 80;
    }

    /**
     * Determines if this bottle collides with another collectable object.
     * @param {DrawableObject} collectableObject - The object to check collision against.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isColliding(collectableObject) {
        return (
            this.x + this.width > collectableObject.x &&
            this.x < collectableObject.x + collectableObject.width &&
            this.y + this.height > collectableObject.y &&
            this.y < collectableObject.y + collectableObject.height
        );
    }

    /**
     * Checks if the character collides with bottles and handles collection.
     */
    checkCollisionBottles() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(index);
            }
        });
    }

    /**
     * Handles the collection of a bottle by the character.
     * @param {number} index - The index of the collected bottle in the array.
     */
    collectBottle(index) {
        SoundManager.playSound("collectingBottle");
        this.bottles.splice(index, 1);
        this.character.collectedBottles++;
        this.statusBar.setPersentageBottles(this.character.collectedBottles);
    }
}
