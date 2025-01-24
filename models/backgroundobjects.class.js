class BackgroundObject extends MovableObject {


  constructor(imagePath, xBg, yBg, heightBg, widthBg) {
    super().loadImage(imagePath, xBg, yBg, heightBg, widthBg);
    this.x = xBg;
    this.y = yBg;
    this.height = heightBg;
    this.width = widthBg;
  }
}
