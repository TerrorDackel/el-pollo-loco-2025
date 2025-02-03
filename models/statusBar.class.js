class StatusBar extends DrawableObject {
  /* speichert die pfade zu den bildern für die statusleiste von leben, münzen und flaschen */
  IMAGES_HEALTHBAR = [
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  IMAGES_COINSBAR = [
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  IMAGES_BOTTLESBAR = [
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /* speichert die aktuellen werte für leben, münzen und flaschen */
  persentageHealth = 100;
  persentageBottles = 0;
  MAX_BOTTLES = 10;
  amountCoins = 0;

  constructor() {
    super();
    this.loadImagesHealth(this.IMAGES_HEALTHBAR);
    this.loadImagesCoins(this.IMAGES_COINSBAR);
    this.setAmountCoins(0);
    this.loadImagesBottles(this.IMAGES_BOTTLESBAR);

    this.x = 30;
    this.y = 0;
    this.height = 60;
    this.width = 200;

    this.setPersentageHealth(100);
    this.setPersentageCoins(0);
    this.setPersentageBottles(0);
  }

  /* zeichnet die statusleisten für leben, münzen und flaschen */
  drawStatusBars(ctx) {
    this.drawBar(ctx, this.imgHealth, this.x, this.y);
    this.drawBar(ctx, this.imgCoins, this.x + 1.15 * this.width, this.y);
    this.drawBar(ctx, this.imgBottles, this.x + 2.25 * this.width, this.y);
  }

  /* zeichnet eine einzelne statusleiste */
  drawBar(ctx, img, x, y) {
    ctx.drawImage(img, x, y, this.width, this.height);
  }

  /* aktualisiert die statusleiste für leben */
  setPersentageHealth(persentageHealth) {
    this.persentageHealth = persentageHealth;
    let pathHealth = this.IMAGES_HEALTHBAR[this.resolveImageHealthIndex()];
    this.imgHealth = this.imageCacheHealth[pathHealth];
  }

  /* aktualisiert die statusleiste für flaschen */
  setPersentageBottles(persentageBottles) {
    this.persentageBottles = persentageBottles;
    let pathBottles = this.IMAGES_BOTTLESBAR[this.resolveImageBottlesIndex()];
    this.imgBottles = this.imageCacheBottles[pathBottles];
  }

  resolveImageHealthIndex() {
    if (this.persentageHealth == 100) {
      return 5;
    } else if (this.persentageHealth >= 80) {
      return 4;
    } else if (this.persentageHealth >= 60) {
      return 3;
    } else if (this.persentageHealth >= 40) {
      return 2;
    } else if (this.persentageHealth >= 20) {
      return 1;
    } else if (this.persentageHealth >= 0) {
      return 0;
    }
  }

  resolveImageBottlesIndex() {
    if (this.persentageBottles == 100) {
      return 5;
    } else if (this.persentageBottles >= 80) {
      return 4;
    } else if (this.persentageBottles >= 60) {
      return 3;
    } else if (this.persentageBottles >= 40) {
      return 2;
    } else if (this.persentageBottles >= 20) {
      return 1;
    } else if (this.persentageBottles >= 0) {
      return 0;
    }
  }

  setPersentageCoins(amountCoins) {
    this.amountCoins = amountCoins;
    let pathCoins = this.IMAGES_COINSBAR[this.resolveImageCoinsbarIndex()];
    this.imgCoins = this.imageCacheCoins[pathCoins]; // Bild für die Münzleiste setzen
  }

  setAmountCoins(amountCoins) {
    this.amountCoins = amountCoins;
    this.setPersentageCoins(amountCoins); // Aktualisiert die Anzeige der Münzen
  }

  resolveImageCoinsbarIndex() {
    if (this.amountCoins >= 20) return 5;
    if (this.amountCoins >= 16) return 4;
    if (this.amountCoins >= 12) return 3;
    if (this.amountCoins >= 8) return 2;
    if (this.amountCoins >= 4) return 1;
    return 0;
  }
}
