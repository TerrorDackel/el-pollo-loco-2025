class Character extends MovableObject{
      height = 300;
      width = 150;
      x = 0;
      y = 110;

      constructor(){
           super().loadImage("./imgs/2_character_pepe/2_walk/W-21.png"); 
            this.loadImages([
                  'imgs/2_character_pepe/2_walk/W-21.png',
                  'imgs/2_character_pepe/2_walk/W-22.png',
                  'imgs/2_character_pepe/2_walk/W-23.png',
                  'imgs/2_character_pepe/2_walk/W-24.png',
                  'imgs/2_character_pepe/2_walk/W-25.png',
                  'mgs/2_character_pepe/2_walk/W-26.png'
            ]);

      }

      jump() {

      }


}