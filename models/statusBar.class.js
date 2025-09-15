/**
 * Represents the status bar of the game, displaying health, coins, bottles and endboss state.
 * Extends DrawableObject to be drawable on canvas.
 */
class StatusBar extends DrawableObject {
    IMAGES_HEALTHBAR = [
        "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ];

    IMAGES_COINSBAR = [
        "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png"
    ];

    IMAGES_BOTTLESBAR = [
        "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
    ];

    IMAGES_ENDBOSSBAR = [
        "./imgs/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "./imgs/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "./imgs/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "./imgs/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "./imgs/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "./imgs/7_statusbars/2_statusbar_endboss/blue/blue100.png"
    ];

    persentageHealth = 5;
    amountCoins = 0;
    amountBottles = 0;
    endbossHealth = 5;

    imageCacheHealth = {};
    imageCacheCoins = {};
    imageCacheBottles = {};
    imageCacheEndboss = {};

    /**
     * Creates a new StatusBar instance and loads all bar images.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHBAR, "health");
        this.loadImages(this.IMAGES_COINSBAR, "coins");
        this.loadImages(this.IMAGES_BOTTLESBAR, "bottles");
        this.loadImages(this.IMAGES_ENDBOSSBAR, "endboss");

        this.x = 30;
        this.y = 0;
        this.height = 50;
        this.width = 155;

        this.setPersentageHealth(5);
        this.setPersentageCoins(0);
        this.setPersentageBottles(0);
        this.setPersentageEndboss(5);
    }

    /**
     * Loads images into the correct cache based on category.
     * @param {string[]} imageArray - Array of image paths.
     * @param {string} category - One of health, coins, bottles, endboss.
     */
    loadImages(imageArray, category) {
        imageArray.forEach((path) => {
            const img = new Image();
            img.src = path;
            if (category === "health") this.imageCacheHealth[path] = img;
            if (category === "coins") this.imageCacheCoins[path] = img;
            if (category === "bottles") this.imageCacheBottles[path] = img;
            if (category === "endboss") this.imageCacheEndboss[path] = img;
        });
    }

    /**
     * Draws all status bars on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    drawStatusBars(ctx) {
        this.drawBar(ctx, this.imgHealth, this.x, this.y);
        this.drawBar(ctx, this.imgCoins, this.x + 1.15 * this.width, this.y);
        this.drawBar(ctx, this.imgBottles, this.x + 2.25 * this.width, this.y);
        this.drawBar(ctx, this.imgEndboss, this.x + 3.35 * this.width, this.y);
    }

    /**
     * Draws a single bar on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     * @param {HTMLImageElement} img - The bar image.
     * @param {number} x - X position.
     * @param {number} y - Y position.
     */
    drawBar(ctx, img, x, y) { ctx.drawImage(img, x, y, this.width, this.height); }

    /**
     * Sets health percentage and updates image.
     * @param {number} persentageHealth - Current health (0–5).
     */
    setPersentageHealth(persentageHealth) {
        this.persentageHealth = persentageHealth;
        const index = this.resolveIndex(persentageHealth);
        this.imgHealth = this.imageCacheHealth[this.IMAGES_HEALTHBAR[index]];
    }

    /**
     * Sets coin amount and updates image.
     * @param {number} amountCoins - Current number of coins (0–5).
     */
    setPersentageCoins(amountCoins) {
        this.amountCoins = amountCoins;
        const index = this.resolveIndex(amountCoins);
        this.imgCoins = this.imageCacheCoins[this.IMAGES_COINSBAR[index]];
    }

    /**
     * Sets bottle amount and updates image.
     * @param {number} amountBottles - Current number of bottles (0–5).
     */
    setPersentageBottles(amountBottles) {
        this.amountBottles = amountBottles;
        const index = this.resolveIndex(amountBottles);
        this.imgBottles = this.imageCacheBottles[this.IMAGES_BOTTLESBAR[index]];
    }

    /**
     * Sets endboss health and updates image.
     * @param {number} hearts - Current boss health (0–5).
     */
    setPersentageEndboss(hearts) {
        this.endbossHealth = hearts;
        this.imgEndboss = this.imageCacheEndboss[this.IMAGES_ENDBOSSBAR[hearts]];
    }

    /**
     * Resolves value to correct image index.
     * @param {number} value - Input value.
     * @returns {number} Index for image arrays.
     */
    resolveIndex(value) {
        if (value >= 5) return 5;
        if (value >= 4) return 4;
        if (value >= 3) return 3;
        if (value >= 2) return 2;
        if (value >= 1) return 1;
        return 0;
    }
}
