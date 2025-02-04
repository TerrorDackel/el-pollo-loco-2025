  class Endboss extends MovableObject {
    height = 450;
    width = 400;
    y = 10;
    energy = 110;
    contactWithCharacter = false;

    IMAGES_WALK = [
      "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
      "./imgs/4_enemie_boss_chicken/1_walk/G4.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G13.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G14.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G15.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G16.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G17.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G18.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G19.png",
      "./imgs/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_HURTING = [
      "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
      "./imgs/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_ANGRY = [
      "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
      "./imgs/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_DEAD = [
      "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
      "./imgs/4_enemie_boss_chicken/5_dead/G26.png",
    ];
    walking_sound = new Audio("/audio/5_chickenBoss/chickenBossLev1.mp3");
    endboss_sound = new Audio(
      "./audio/5_chickenBoss/monster roring maybee sleep.mp3"
    );

    constructor() {
      super().loadImage(this.IMAGES_WALK[0]);
      this.loadImages(this.IMAGES_WALK);
      this.loadImages(this.IMAGES_HURTING);
      this.loadImages(this.IMAGES_ANGRY);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 3400;
      this.y = 10;
      this.animate();
      this.speed = -0.1;
    }

    letEndbossWalk() {
      this.contactWithCharacter = true;
    }

    endbossMoveLeft() {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 50);
    }

    endbossHurt() {
      this.energy -= 10;
      if (this.energy < 0) {
        this.energy = 0;
      }
      SoundManager.playSound("endbossHit");
      let intervalId = setInterval(() => {
        this.playAnimation(this.IMAGES_HURTING);
      }, 410);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 1000);
    }

    endbossDies() {
      let intervallId = setInterval(() => {
        this.playAnimation(this.IMAGES_DEAD);
      }, 100);

      setTimeout(() => {
        clearInterval(intervallId);
      }, 1000);
    }

    animate() {
      setInterval(() => {
        if (this.isHit == false) {
          this.playAnimation(this.IMAGES_ANGRY);
        }
        if (this.contactWithCharacter == true) {
          this.playAnimation(this.IMAGES_WALK);
          this.endbossMoveLeft();
        }
      }, 200);
    }
  }
