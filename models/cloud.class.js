class Cloud extends MovableObject {
  height = 200;
  width = 700;


  constructor() {
    super().loadImage("./imgs/5_background/layers/4_clouds/1.png");
    this.x = -100 + Math.random() * 3400;
    this.y = -50 + Math.random() * 150;
    this.animate();
   
  }

  animate() {
     this.moveLeft();
      this.speed = 0.15 + Math.random() * 0.15;
  }


}
