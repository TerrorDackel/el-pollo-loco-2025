/**
 * Represents a throwable bottle in the game world.
 * Extends MovableObject to inherit movement, collision and animation.
 */
class ThrowableObjects extends MovableObject {
    IMAGES_THROWBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    IMAGES_SMASHINGBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ];

    /**
     * Creates a new throwable bottle instance.
     * @param {number} x - Starting x position.
     * @param {number} y - Starting y position.
     * @param {object} world - The game world reference.
     */
    constructor(x, y, world) {
        super();
        this.loadImages(this.IMAGES_THROWBOTTLES);
        this.loadImages(this.IMAGES_SMASHINGBOTTLES);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.debugMode = true;
        this.world = world;
        this.hasHit = false;
        this.animate();
        this.throw();
    }

    /** Checks if the bottle is above ground. */
    isAboveGround() { return this.y < 330; }

    /** Starts the animation loop for bottle movement. */
    animate() {
        let timeoutSet = false;
        const interval = setInterval(() => {
            if (this.isAboveGround()) this.animateThrow();
            else this.animateSmash(interval, timeoutSet);
        }, 100);
    }

    /** Plays rotation animation and checks for collisions. */
    animateThrow() {
        this.playAnimation(this.IMAGES_THROWBOTTLES);
        this.checkBottleEnemyCollision();
    }

    /**
     * Plays smash animation once and schedules removal.
     * @param {number} interval - Interval ID to clear.
     * @param {boolean} timeoutSet - Whether timeout was already set.
     */
    animateSmash(interval, timeoutSet) {
        if (!timeoutSet) {
            timeoutSet = true;
            this.currentImage = 0;
            setTimeout(() => this.removeAfter(interval), 300);
        }
        this.playAnimation(this.IMAGES_SMASHINGBOTTLES);
        SoundManager.playSound("smashBottle");
    }

    /**
     * Removes bottle after animation interval ends.
     * @param {number} interval - Interval ID.
     */
    removeAfter(interval) {
        clearInterval(interval);
        const index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) this.world.throwableObjects.splice(index, 1);
    }

    /** Throws the bottle with gravity and horizontal speed. */
    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => { if (this.isAboveGround()) this.x += 10; }, 1000 / 50);
    }

    /** Checks collision between bottle and enemies or boss. */
    checkBottleEnemyCollision() {
        if (this.hasHit || !this.world) return;
        if (this.tryHitBoss()) return;
        this.tryHitEnemies();
    }

    /**
     * Tries to hit the boss with the bottle.
     * @returns {boolean} True if boss was hit.
     */
    tryHitBoss() {
        const boss = this.world.level?.boss;
        if (boss && this.isBottleColliding(boss)) {
            this.hasHit = true;
            boss.hitByBottle();
            this.removeBottle();
            return true;
        }
        return false;
    }

    /** Tries to hit regular enemies with the bottle. */
    tryHitEnemies() {
        this.world.enemies?.forEach((enemy, index) => {
            if (this.isBottleColliding(enemy)) {
                this.hasHit = true;
                if (enemy instanceof Endboss) enemy.hitByBottle();
                else {
                    enemy.die();
                    this.world.enemies.splice(index, 1);
                }
                this.removeBottle();
            }
        });
    }

    /** Removes the bottle from the world’s throwableObjects list. */
    removeBottle() {
        const index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) this.world.throwableObjects.splice(index, 1);
    }

    /**
     * Checks if the bottle collides with an enemy.
     * @param {MovableObject} enemy - The enemy to check.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isBottleColliding(enemy) {
        return (
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height
        );
    }
}
