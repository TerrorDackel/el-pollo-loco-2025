/**
 * Represents a big chicken enemy (mini-boss) in the game world.
 * Extends MovableObject to inherit movement and collision behaviour.
 */
class ChickenBig extends MovableObject {
    height = 150;
    width = 150;
    isDead = false;

    IMAGES_WALKING = [
        "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
        "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
        "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
        "/imgs/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    IMAGES_DEAD = ["imgs/4_enemie_boss_chicken/5_dead/G26.png"];

    /**
     * Creates a new ChickenBig instance.
     */
    constructor() {
        super();
        this.initImages();
        this.setInitialPosition();
        this.speed = 1;
        this.animate();
        this.moveLeft();
        this.setOffsets();
    }

    /** Loads images for walking and dead states. */
    initImages() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    }

    /** Sets the initial spawn position of the big chicken. */
    setInitialPosition() {
        this.x = 3500;
        this.y = 255;
    }

    /** Configures hitbox offsets. */
    setOffsets() {
        this.offsetTop = -10;
        this.offsetBottom = -10;
        this.offsetLeft = -10;
        this.offsetRight = -10;
    }

    /** Kills the big chicken and triggers death animation. */
    die() {
        this.isDead = true;
        this.playAnimation(this.IMAGES_DEAD);
        SoundManager.playSound("chickenDead");
        setTimeout(() => this.removeFromGame(), 500);
    }

    /** Removes the big chicken from the game world. */
    removeFromGame() {
        const index = this.world?.level?.enemies.indexOf(this);
        if (index > -1) this.world.level.enemies.splice(index, 1);
    }

    /** Starts the movement and animation loops. */
    animate() {
        this.startWalkingLoop();
        this.startAnimationLoop();
    }

    /** Handles the walking loop. */
    startWalkingLoop() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 60);
    }

    /** Handles switching between walking and dead animations. */
    startAnimationLoop() {
        this.animationInterval = setInterval(() => {
            if (this.isDead) this.playAnimation(this.IMAGES_DEAD);
            else this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}
