class StatusBar extends DrawableObject {
  /* speichert die bildpfade für die statusleisten von leben, münzen und flaschen */
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
  amountCoins = 0;
  amountBottles = 0;

  /* initialisiert die statusbar mit allen bildern und setzt standardwerte */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTHBAR, "health");
    this.loadImages(this.IMAGES_COINSBAR, "coins");
    this.loadImages(this.IMAGES_BOTTLESBAR, "bottles");

    /* setzt position und größe der statusbar */
    this.x = 30;
    this.y = 0;
    this.height = 60;
    this.width = 200;

    /* initialisiert die standardwerte */
    this.setPersentageHealth(100);
    this.setPersentageCoins(0);
    this.setPersentageBottles(0);
  }

  /* lädt die bilder für eine bestimmte kategorie (leben, münzen, flaschen) */
  loadImages(imageArray, category) {
    imageArray.forEach((path) => {
      let img = new Image();
      img.src = path;

      if (category === "health") this.imageCacheHealth[path] = img;
      if (category === "coins") this.imageCacheCoins[path] = img;
      if (category === "bottles") this.imageCacheBottles[path] = img;
    });
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
    let index = this.resolveIndex(persentageHealth);
    this.imgHealth = this.imageCacheHealth[this.IMAGES_HEALTHBAR[index]];
  }

  /* aktualisiert die statusleiste für münzen */
  setPersentageCoins(amountCoins) {
    this.amountCoins = amountCoins;
    let index = this.resolveIndex(amountCoins);
    this.imgCoins = this.imageCacheCoins[this.IMAGES_COINSBAR[index]];
  }

  /* setzt die anzahl der münzen in der statusbar */
  setAmountCoins(amountCoins) {
    this.setPersentageCoins(amountCoins);
  }

  /* aktualisiert die statusleiste für flaschen */
  setPersentageBottles(amountBottles) {
    if (isNaN(amountBottles) || amountBottles === undefined) {
      console.error("fehler amountBottles ist ungültig", amountBottles);
      return;
    }
    this.amountBottles = amountBottles;
    let index = this.resolveIndex(amountBottles);
    this.imgBottles = this.imageCacheBottles[this.IMAGES_BOTTLESBAR[index]];
    console.log("flaschen in statusbar", this.amountBottles);
  }

  /* berechnet den index für das passende bild in der statusleiste */
  resolveIndex(value) {
    if (value >= 100 || value >= 10) return 5;
    if (value >= 80 || value >= 8) return 4;
    if (value >= 60 || value >= 6) return 3;
    if (value >= 40 || value >= 4) return 2;
    if (value >= 20 || value >= 2) return 1;
    return 0;
  }
}
