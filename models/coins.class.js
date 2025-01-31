class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.images = [new Image(), new Image()];
    this.images[0].src = "imgs/8_coin/coin_1.png";
    this.images[1].src = "imgs/8_coin/coin_2.png";
    this.currentImage = 0;
    this.rotation = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      this.images[this.currentImage],
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  animate() {
    setInterval(() => {
      this.currentImage = this.currentImage === 0 ? 1 : 0;
    }, 100);
  }

  rotateAndDisappear(world) {
    let interval = setInterval(() => {
      this.rotation += 0.2;
      if (this.rotation >= Math.PI * 2) {
        clearInterval(interval);
        world.removeCoin(this);
      }
    }, 50);
  }
}
