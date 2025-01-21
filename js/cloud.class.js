class Cloud extends MovableObject {
  height = 300;
  width = 700;

  constructor() {
    super().loadImage("./imgs/5_background/layers/4_clouds/1.png");
    this.x = -100 + Math.random() * 820;
    this.y = -50 + Math.random() * 150;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.3;
    }, 1000 / 60);
  }
}
