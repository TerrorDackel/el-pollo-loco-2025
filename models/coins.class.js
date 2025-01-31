class Coins extends DrawableObject {
  height = 40;
  width = 30;

  IMAGES_COINS = [
      "./imgs/8_coin/coin_1.png",
       "./imgs/8_coin/coin_2.png"];

  coinHitting_sound = new Audio("audio/11_coins/collectCoin.mp3");

  constructor(x, y, height, width) {
    super();
    this.loadImage("./imgs/8_coin/coin_1.png"); // Pfad zum Coin-Bild
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.height = 40; // Höhe des Coins
    this.width = 40; // Breite des Coins
  }
}

