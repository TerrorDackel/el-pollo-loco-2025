class Chickensmall extends MovableObject {
  height = 50;
  width = 50;

  constructor() {
    super().loadImage("./imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 200 + Math.random() * 520;
    this.y = 340;
//     this.animate();
  }

//   animate() {
//     setInterval(() => {
//       this.x -= 0.15;
//     }, 1000 / 60);
//   }
}