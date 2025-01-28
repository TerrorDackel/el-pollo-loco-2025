class Character extends MovableObject {
  height = 300;
  width = 150;
  x = 0;
  y = 110;
  speed = 12;

  // offset = {
  //   top: 120,
  //   left: 40,
  //   right: 30,
  //   bottom: 30,
  // };

  IMAGES_LONG_IDLE = [
    "imgs/2_character_pepe/1_idle/long_idle/I-11.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-12.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-13.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-14.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-15.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-16.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-17.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-18.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-19.png",
    "imgs/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    /* stripe bilder vom character pepe wie er walked*/
    "./imgs/2_character_pepe/2_walk/W-21.png" /* das 0te bild*/,
    "./imgs/2_character_pepe/2_walk/W-22.png",
    "./imgs/2_character_pepe/2_walk/W-23.png",
    "./imgs/2_character_pepe/2_walk/W-24.png",
    "./imgs/2_character_pepe/2_walk/W-25.png",
    "./imgs/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    /* stripe bilder vom character pepe wie er jumped */
    "./imgs/2_character_pepe/3_jump/J-31.png",
    "./imgs/2_character_pepe/3_jump/J-32.png",
    "./imgs/2_character_pepe/3_jump/J-33.png",
    "./imgs/2_character_pepe/3_jump/J-34.png",
    "./imgs/2_character_pepe/3_jump/J-35.png",
    "./imgs/2_character_pepe/3_jump/J-36.png",
    "./imgs/2_character_pepe/3_jump/J-37.png",
    "./imgs/2_character_pepe/3_jump/J-38.png",
    "./imgs/2_character_pepe/3_jump/J-39.png",
    "./imgs/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_HURT = [
    "./imgs/2_character_pepe/4_hurt/H-41.png",
    "./imgs/2_character_pepe/4_hurt/H-42.png",
    "./imgs/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./imgs/2_character_pepe/5_dead/D-51.png",
    "./imgs/2_character_pepe/5_dead/D-52.png",
    "./imgs/2_character_pepe/5_dead/D-53.png",
    "./imgs/2_character_pepe/5_dead/D-54.png",
    "./imgs/2_character_pepe/5_dead/D-55.png",
    "./imgs/2_character_pepe/5_dead/D-56.png",
    "./imgs/2_character_pepe/5_dead/D-57.png",
  ];
  world;

  walking_sound = new Audio("./audio/1_walking/walking.mp3");
  jumping_sound = new Audio("/audio/2_jump/maleShortJump.mp3");
  dead_sound = new Audio("/audio/9_lost/man dying.mp3");
  throw_sound = new Audio("/audio/7_bottle/bottleClicking.mp3", "/audio/7_bottle/smashed.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false; /* wenn rechtstaste dann wird img character nicht gespiegelt, false*/
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
        this.jumping_sound.play();
      }

      this.world.camera_x = -this.x + 100;

      /*--------------------------sound wenn nahe endboss----------------------------------------------------------------------------------------------------------------------------------------*/

      // if (this.world.endboss) {
      //       let distanceRightOfCharacter = Math.abs((this.x  + this.width) - this.world.endboss.x)
      //      let distanceLeftOfCharacter = (this.x - (this.world.endboss.x + this.world.endboss.width)); // Berechne die horizontale Distanz

      //       // Wenn der Character nahe beim Endboss ist, spiele den Sound ab
      //       if (distanceRightOfCharacter || distanceLeftOfCharacter >= 1 && distance <= 500) {
      //         if (this.world.endboss.endbosssound.paused) {
      //           this.world.endboss.endbosssound.play(); // Spiele den Sound des Endboss
      //         }
      //       } else {
      //         this.world.endboss.endbosssound.pause(); // Stoppe den Sound, wenn die Distanz nicht passt
      //         this.world.endboss.endbosssound.currentTime = 0; // Setze den Sound zurück
      //       }
      //     }

      /*--------------------------soundende wenn nicht nahe endboss----------------------------------------------------------------------------------------------------------------------------------------*/
    }, 1000 / 60);

    setInterval(() => {
      /* wenn er tot ist*/
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); /* wenn energy 0 dann tot*/
      } else if (this.isHurt()) {
        /* wenn er verletzt ist*/
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        /* wenn sich der character über dem boden befindet (isAboveGround())  dann*/
        this.playAnimation(
          this.IMAGES_JUMPING
        ); /*dann wird diese animation jumping abgespielt*/
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          /* wenn rechts oder links gedrückt wird dann wird die animation walking abgespielt*/
          this.playAnimation(this.IMAGES_WALKING); /*walk animation*/
        }
      }
    }, 50);
  }

  jump() {
    this.speedY = 28;
  }
}
