class ThrowableObjects extends MovableObject {

      constructor(x, y) {
            super().loadImage('./imgs/7_statusbars/3_icons/icon_salsa_bottle.png');
            this.x = x;
            this.y = y;
            this.height = 90;
            this.width = 90;
            this.throw();
      }

      throw() {

            this.speedy = 30;
            this.applyGravity();
            setInterval (() => {
                  this.x += 10;
            }, 10);
      }




























      
}