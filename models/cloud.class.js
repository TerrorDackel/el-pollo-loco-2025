/**
 * Represents a cloud in the background of the game world.
 * Extends MovableObject to allow slow horizontal movement.
 */
class Cloud extends MovableObject {
    height = 200;
    width = 700;

    /**
     * Creates a new Cloud instance at a random position.
     */
    constructor() {
        super();
        this.loadImage("./imgs/5_background/layers/4_clouds/1.png");
        this.setRandomPosition();
        this.animate();
    }

    /** Sets a random position for the cloud. */
    setRandomPosition() {
        this.x = -100 + Math.random() * 3400;
        this.y = -50 + Math.random() * 150;
    }

    /** Starts the cloud movement animation. */
    animate() {
        this.moveLeft();
        this.speed = 0.15 + Math.random() * 0.15;
    }
}
