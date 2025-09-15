/**
 * Represents a game level with all its entities and assets.
 */
class Level {
    /** @type {MovableObject[]} All enemies in the level */
    enemies;

    /** @type {Cloud[]} Clouds in the level background */
    clouds;

    /** @type {BackgroundObject[]} Static background objects */
    backgroundObjects;

    /** @type {number} End position of the level along the x-axis */
    level_end_x = 3600;

    /** @type {Coins[]} Collectible coins */
    coins;

    /** @type {Bottle[]} Collectible bottles */
    bottles;

    /** @type {Endboss} The level’s boss */
    boss;

    /** @type {World} Reference to the world */
    world;

    /**
     * Creates a new level instance with all assets.
     * @param {MovableObject[]} enemies - Enemies in the level.
     * @param {Cloud[]} clouds - Clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - Static background objects.
     * @param {Coins[]} coins - Collectible coins.
     * @param {Bottle[]} bottles - Collectible bottles.
     * @param {Endboss} boss - The endboss of the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, boss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.boss = boss;
    }
}
