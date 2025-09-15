/**
 * Represents a small chicken enemy in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class Chickensmall extends MovableObject {
    height = 50;
    width = 50;
    isDead = false;

    IMAGES_WALKING = [
        "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    /**
     * Creates a new Chickensmall instance.
     */
    constructor() {
        super();
        this.initImages();
        this.setInitialPosition();
        this.setRandomSpeed();
        this.setOffsets();
        this.world = null;
        this.animate();
    }

    /** Loads images for walking and dead states. */
    initImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    }

    /** Sets the initial spawn position of the small chicken. */
    setInitialPosition() {
        this.x = 600 + Math.random() * 3500;
        this.y = 340;
    }

    /** Assigns a random movement speed. */
    setRandomSpeed() { this.speed = 0.9 + Math.random() * 0.9; }

    /** Configures hitbox offsets. */
    setOffsets() {
        this.offsetTop = -10;
        this.offsetBottom = -10;
        this.offsetLeft = -10;
        this.offsetRight = -10;
    }

    /**
     * Assigns the game world reference.
     * @param {object} world - The current game world instance.
     */
    setWorld(world) { this.world = world; }

    /** Kills the small chicken and triggers death animation. */
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

    /** Starts both walking and animation loops. */
    animate() {
        this.startWalkingLoop();
        this.startAnimationLoop();
    }

    /** Handles continuous walking movement and animation. */
    startWalkingLoop() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /** Handles switching between walking and dead animations. */
    startAnimationLoop() {
        this.animationInterval = setInterval(() => {
            if (this.isDead) this.playAnimation(this.IMAGES_DEAD);
            else this.playAnimation(this.IMAGES_WALKING);
        }, 130);
    }
}
