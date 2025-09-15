/**
 * Represents a collectible coin in the game world.
 * Extends DrawableObject to be drawn and animated.
 */
class Coins extends DrawableObject {
    IMAGES_COINS = [
        "./imgs/8_coin/Gold_1.png",
        "./imgs/8_coin/Gold_2.png",
        "./imgs/8_coin/Gold_3.png",
        "./imgs/8_coin/Gold_4.png",
        "./imgs/8_coin/Gold_5.png",
        "./imgs/8_coin/Gold_6.png",
        "./imgs/8_coin/Gold_7.png",
        "./imgs/8_coin/Gold_8.png",
        "./imgs/8_coin/Gold_9.png",
        "./imgs/8_coin/Gold_10.png"
    ];

    x = 150;
    y = 150;
    width = 25;
    height = 25;
    rotation = 0;
    currentImage = 0;
    images = [];
    speedY = 20;
    acceleration = 3;
    loaded = false;
    loadImagePromises = [];

    /**
     * Creates a new Coins instance and loads its images.
     */
    constructor() {
        super();
        this.loadAllImages();
        this.initAnimation();
    }

    /** Prepares image promises for all coin frames. */
    loadAllImages() {
        this.loadImagePromises = this.IMAGES_COINS.map((path) =>
            new Promise((resolve) => {
                const img = new Image();
                img.src = path;
                img.onload = () => resolve(img);
                img.onerror = () => console.error(`Error loading image: ${path}`);
            })
        );
    }

    /** Resolves all images and starts animation when loaded. */
    initAnimation() {
        Promise.all(this.loadImagePromises).then((images) => {
            this.images = images;
            this.currentImage = 0;
            this.loaded = true;
            this.animate();
        });
    }

    /**
     * Draws the coin on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    draw(ctx) {
        if (!this.loaded || this.images.length === 0) return;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.drawImage(
            this.images[this.currentImage],
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
        this.drawGreenFrame(ctx);
    }

    /** Animates the coin by cycling through its images. */
    animate() {
        setInterval(() => {
            if (this.loaded && this.images.length > 0) {
                this.currentImage = (this.currentImage + 1) % this.images.length;
            }
        }, 200);
    }

    /**
     * Checks if this coin collides with another object.
     * @param {DrawableObject} collectableObject - The object to check collision against.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(collectableObject) {
        return (
            this.x + this.width > collectableObject.x &&
            this.x < collectableObject.x + collectableObject.width &&
            this.y + this.height > collectableObject.y &&
            this.y < collectableObject.y + collectableObject.height
        );
    }

    /** Checks and handles collisions between the character and coins. */
    checkCollisionCoins() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(index);
            }
        });
    }

    /**
     * Handles the collection of a coin.
     * @param {number} index - The index of the coin to remove.
     */
    collectCoin(index) {
        SoundManager.playSound("coin");
        this.coins.splice(index, 1);
        this.statusBar.setPersentageCoins(this.score++);
    }

    /** Empty method to avoid missing drawFrame errors. */
    drawFrame(ctx) { /* not used for coins */ }
}
