/**
 * Represents a chicken enemy in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class Chicken extends MovableObject {
    height = 70;
    width = 70;
    isDead = false;

    IMAGES_WALKING = [
        "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    /**
     * Creates a new Chicken instance.
     */
    constructor() {
        super();
        this.initImages();
        this.setInitialPosition();
        this.animate();
        this.moveLeft();
        this.setRandomSpeed();
        this.setOffsets();
    }

    /** Loads chicken images for walking and dead states. */
    initImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    }

    /** Sets the initial spawn position of the chicken. */
    setInitialPosition() {
        this.x = 500 + Math.random() * 3000;
        this.y = 310;
    }

    /** Assigns a random speed for the chicken. */
    setRandomSpeed() { this.speed = 0.3 + Math.random() * 0.5; }

    /** Configures hitbox offsets. */
    setOffsets() {
        this.offsetTop = -10;
        this.offsetBottom = -10;
        this.offsetLeft = -10;
        this.offsetRight = -10;
    }

    /** Starts the walking animation loop. */
    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 60);
    }

    /** Kills the chicken and starts death animation. */
    die() {
        this.isDead = true;
        this.playAnimation(this.IMAGES_DEAD);
        SoundManager.playSound("chickenDead");
        setTimeout(() => this.removeFromGame(), 500);
    }

    /** Removes the chicken from the game world. */
    removeFromGame() {
        const index = this.world?.level?.enemies.indexOf(this);
        if (index > -1) this.world.level.enemies.splice(index, 1);
    }
}
