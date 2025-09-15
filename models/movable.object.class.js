/**
 * Represents a movable object in the game world.
 * Extends DrawableObject to provide movement, gravity, collision and states.
 */
class MovableObject extends DrawableObject {
    speed = 0.25;
    otherDirection = false;
    speedY = 20;
    acceleration = 3;
    energy = 5;
    lastHit = 0;

    /**
     * Applies gravity to the object with continuous updates.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above ground.
     * @returns {boolean} True if above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObjects) return true;
        return this.y < 100;
    }

    /**
     * Checks collision between this object and another.
     * @param {MovableObject} mo - The other object.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offsetRight >= mo.x + mo.offsetLeft &&
            this.x - this.offsetLeft <= mo.x + mo.width - mo.offsetRight &&
            this.y + this.height - this.offsetBottom >= mo.y + mo.offsetTop &&
            this.y + this.offsetTop <= mo.y + mo.height - mo.offsetBottom
        );
    }

    /**
     * Checks if the object is idle (no movement for >3s).
     * @returns {boolean} True if idle, otherwise false.
     */
    isIdle() {
        if (Date.now() - this.world.keyboard.lastMove > 3000 && !this.idleTriggered) {
            this.startIdleMode();
            return true;
        }
        return false;
    }

    /** Starts idle mode and animation. */
    startIdleMode() {
        if (!this.idleTriggered) {
            this.idleTriggered = true;
            SoundManager.playSound("idle");
            this.playAnimation(this.IMAGES_IDLE);
            document.addEventListener("keydown", () => this.stopIdleMode(), { once: true });
        }
    }

    /** Stops idle mode and resets sound. */
    stopIdleMode() {
        SoundManager.pause("idle");
        this.idle_sound.currentTime = 0;
        this.idleTriggered = false;
    }

    /** Handles the object being hit and reduces energy. */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) this.energy = 0;
        else this.lastHit = Date.now();
    }

    /**
     * Checks if the object was recently hurt.
     * @returns {boolean} True if hurt within 3s.
     */
    isHurt() {
        const timepassed = (Date.now() - this.lastHit) / 3000;
        return timepassed < 1;
    }

    /**
     * Checks if the object has no energy left.
     * @returns {boolean} True if dead.
     */
    isDead() { return this.energy === 0; }

    /**
     * Loads multiple images and stores them in the cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Plays an animation by cycling through images.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Moves the object right. */
    moveRight() { this.x += this.speed; }

    /** Moves the object left. */
    moveLeft() { this.x -= this.speed; }

    /** Makes the object jump. */
    jump() { this.speedY = 35; }
}
