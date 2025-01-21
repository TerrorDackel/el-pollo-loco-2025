class Cloud extends MovableObject {
    constructor(){
            super().loadImage("./imgs/5_background/layers/4_clouds/1.png"); 
                  this.x = -100 + Math.random() * 820;
                  this.y = -10;
                  this.height = 300;
                  this.width = 720;
      }

      moveLeft() {

      }


}