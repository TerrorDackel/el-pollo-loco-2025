class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  IMAGES_COINS = [
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  IMAGES_BOTTLES = [
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  persentageHealth = 100;
  persentageCoins = 0;
  persentageBottles = 0;


  constructor() {
    super();
    this.loadImagesHealth(this.IMAGES_HEALTH);
    this.loadImagesCoins(this.IMAGES_COINS);
    this.loadImagesBottles(this.IMAGES_BOTTLES);

    this.x = 30;
    this.y = 0;
    this.height = 60;
    this.width = 200;

    this.setPersentageHealth(100);
    this.setPersentageCoins(0);
    this.setPersentageBottles(0);
  }


  drawStatusBars(ctx) {
 
    this.drawBar(ctx, this.imgHealth, this.x, this.y);
    this.drawBar(ctx, this.imgCoins, this.x, this.y + 1 * this.height);   
    this.drawBar(ctx, this.imgBottles, this.x, this.y + 2 * this.height); 
   }

  drawBar(ctx, img, x, y) {
    ctx.drawImage(img, x, y, this.width, this.height);
  }



  setPersentageHealth(persentageHealth) {
    this.persentageHealth = persentageHealth;
    let pathHealth = this.IMAGES_HEALTH[this.resolveImageHealthIndex()];
    this.imgHealth = this.imageCacheHealth[pathHealth];
  }

  setPersentageCoins(persentageCoins) {
    this.persentageCoins = persentageCoins;
    let pathCoins = this.IMAGES_COINS[this.resolveImageCoinsIndex()];
    this.imgCoins = this.imageCacheCoins[pathCoins];
  }

  setPersentageBottles(persentageBottles) {
    this.persentageBottles = persentageBottles;
    let pathBottles = this.IMAGES_BOTTLES[this.resolveImageBottlesIndex()];
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

  resolveImageCoinsIndex() {
    if (this.persentageCoins == 100) {
      return 5;
    } else if (this.persentageCoins >= 80) {
      return 4;
    } else if (this.persentageCoins >= 60) {
      return 3;
    } else if (this.persentageCoins >= 40) {
      return 2;
    } else if (this.persentageCoins >= 20) {
      return 1;
    } else if (this.persentageCoins >= 0) {
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
}