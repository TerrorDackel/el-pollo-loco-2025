/**
 * Represents any drawable object in the game.
 * Provides basic image loading, drawing and debugging utilities.
 */
class DrawableObject {
    x = 120;
    y = 280;
    height = 200;
    width = 100;
    img;

    offsetTop = 40;
    offsetBottom = -20;
    offsetRight = 40;
    offsetLeft = 15;

    imageCacheHealth = {};
    imageCacheCoins = {};
    imageCacheBottles = {};
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image for the object.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images for animations and stores them in cache.
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
     * Draws a red rectangle around throwable objects for debugging.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    rectangleThrowableObject(ctx) {
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
        ctx.restore();
    }

    /**
     * Draws a green frame for coins and bottles.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    drawGreenFrame(ctx) {
        ctx.save();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
        ctx.restore();
    }

    /**
     * Draws the object and optional debug frames.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    draw(ctx) {
        if (!this.img) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this.debugMode) this.rectangleThrowableObject(ctx);

        if (this instanceof Coins || this instanceof Bottle) this.drawGreenFrame(ctx);
    }

    /**
     * Draws a blue frame for characters and chickens.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offsetLeft,
                this.y + this.offsetTop,
                this.width - this.offsetRight - this.offsetLeft,
                this.height - this.offsetBottom - this.offsetTop
            );
            ctx.stroke();
        }
    }

    /**
     * Loads images into the health cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImagesHealth(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCacheHealth[path] = img;
        });
    }

    /**
     * Loads images into the coins cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImagesCoins(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCacheCoins[path] = img;
        });
    }

    /**
     * Loads images into the bottles cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImagesBottles(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCacheBottles[path] = img;
        });
    }
}
