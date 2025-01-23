class BackgroundObject extends MovableObject {
  height = 800;
  width = 720;

  constructor(imagePath) {
    super().loadImage(imagePath);
      this.x = 0;
      this.y = -300;
  }

}
