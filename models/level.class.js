class Level {
      enemies;
      clouds;
      backgroundObjects;
      level_end_x = 3600;
      coins;
      bottles;
      endboss;
      world;

      constructor (enemies, clouds, backgroundObjects, coins, bottles, endboss) {
            this.enemies = enemies;
            this.clouds = clouds;
            this.backgroundObjects = backgroundObjects;
            this.coins = coins;
            this.bottles = bottles;
            this.endboss = endboss;
      }

}