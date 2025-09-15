/**
 * Defines level 1 with enemies, clouds, background objects and the endboss.
 * Uses the Level class to group all assets together.
 */
let level1 = new Level(
    /* Enemies */
    [
        new Chicken(),
        new Chicken(),
        new Chickensmall(),
        new Chicken(),
        new Chicken(),
        new Chickensmall(),
        new Chicken(),
        new ChickenBig(),
        new Chicken(),
        new Chicken()
    ],

    /* Clouds */
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],

    /* Background objects */
    [
        new BackgroundObject("./imgs/5_background/layers/air.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", -100, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", -100, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 619, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 619, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 619, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", 619 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", 619 + 720, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", 619 + 720, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 619 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 619 + 720 * 2, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 619 + 720 * 2, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/1.png", 619 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/1.png", 619 + 720 * 3, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/1.png", 619 + 720 * 3, -300, 800, 720),

        new BackgroundObject("./imgs/5_background/layers/air.png", 619 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/3_third_layer/2.png", 619 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/2_second_layer/2.png", 619 + 720 * 4, -300, 800, 720),
        new BackgroundObject("./imgs/5_background/layers/1_first_layer/2.png", 619 + 720 * 4, -300, 800, 720)
    ],

    /* Coins (empty at start) */
    [],

    /* Bottles (empty at start) */
    [],

    /* Endboss */
    new Endboss()
);
