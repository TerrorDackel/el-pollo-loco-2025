class BackgroundObject extends MovableObject {
  height = 800;
  width = 720;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
      this.x = 0;
      this.y = -300;


  }

}
