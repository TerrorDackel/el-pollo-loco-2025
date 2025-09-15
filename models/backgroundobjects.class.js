/**
 * Represents a background object in the game world.
 * Extends MovableObject to inherit drawable and movable behaviour.
 */
class BackgroundObject extends MovableObject {

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - Path to the image file.
     * @param {number} xBg - The x-coordinate of the background object.
     * @param {number} yBg - The y-coordinate of the background object.
     * @param {number} heightBg - The height of the background object.
     * @param {number} widthBg - The width of the background object.
     */
    constructor(imagePath, xBg, yBg, heightBg, widthBg) {
        super();
        this.loadAndSetImage(imagePath, xBg, yBg, heightBg, widthBg);
    }

    /**
     * Loads the image and sets the object’s dimensions and position.
     * @param {string} imagePath - Path to the image file.
     * @param {number} xBg - The x-coordinate of the background object.
     * @param {number} yBg - The y-coordinate of the background object.
     * @param {number} heightBg - The height of the background object.
     * @param {number} widthBg - The width of the background object.
     */
    loadAndSetImage(imagePath, xBg, yBg, heightBg, widthBg) {
        this.loadImage(imagePath, xBg, yBg, heightBg, widthBg);
        this.x = xBg;
        this.y = yBg;
        this.height = heightBg;
        this.width = widthBg;
    }
}
