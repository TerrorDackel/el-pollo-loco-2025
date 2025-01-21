class Chicken extends MovableObject {
  height = 70;
  width = 70;

  constructor() {
    super().loadImage("./imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 520;
    this.y = 320 + Math.random() * 20;
    //     this.animate();
  }

  //   animate() {
  //     setInterval(() => {
  //       this.x -= 0.6;
  //     }, 1000 / 60);
  //   }
}
