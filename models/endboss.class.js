class Endboss extends MovableObject {
    height = 350;
    width = 350;
    y = 0;
    energy = 5;
    isAngry = false;
    isHurt = false;
    contactWithCharacter = false;
    isDead = false;
    offsetTop = 50;
    offsetBottom = 0;
    offsetLeft = 50;
    offsetRight = 50;
    _moveIntervalStarted = false;

    IMAGES_WALK = [
        "./imgs/4_enemie_boss_chicken/1_walk/G1.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G2.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G3.png",
        "./imgs/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    IMAGES_HURTING = [
        "./imgs/4_enemie_boss_chicken/4_hurt/G21.png",
        "./imgs/4_enemie_boss_chicken/4_hurt/G22.png",
        "./imgs/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    IMAGES_ANGRY = [
        "./imgs/4_enemie_boss_chicken/2_alert/G5.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G6.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G7.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G8.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G9.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G10.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G11.png",
        "./imgs/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    IMAGES_DEAD = [
        "./imgs/4_enemie_boss_chicken/5_dead/G24.png",
        "./imgs/4_enemie_boss_chicken/5_dead/G25.png",
        "./imgs/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3400;
        this.y = 10;
        this.speed = 0.1;
        this.debugMode = true;
        this.animate();
    }

    setWorld(world) { this.world = world; }

    letEndbossTouch() {
        this.contactWithCharacter = true;
        SoundManager.stopBackground();
        SoundManager.playBackground("bossMusic");
    }

    endbossMoveLeft() {
        if (this._moveIntervalStarted) return;
        this._moveIntervalStarted = true;
        this._moveIntervalId = setInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 50);
    }

    hitByBottle() {
        if (this.energy > 1) {
            this.energy--;
            this.isHurt = true;
            if (this.world && this.world.statusBar) {
                this.world.statusBar.setPersentageEndboss(this.energy);
            }
            this.playHurtAnimation();
            SoundManager.playSound("endbossHit");
        } else {
            this.die();
        }
    }

    playHurtAnimation() {
        let intervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_HURTING);
        }, 250);

        setTimeout(() => {
            clearInterval(intervalId);
            this.isHurt = false;
            this.isAngry = true;
            this.playAngryAnimation();
        }, this.IMAGES_HURTING.length * 250);
    }

    playAngryAnimation() {
        if (this._angryAnimStarted) return;
        this._angryAnimStarted = true;
        this._angryAnimId = setInterval(() => {
            if (!this.isHurt && this.energy > 0 && !this.isDead) {
                this.playAnimation(this.IMAGES_ANGRY);
                SoundManager.playSound("endboss");
            }
        }, 200);
    }

    die() {
        this.isDead = true;
        if (this.world && this.world.statusBar) {
            this.world.statusBar.setPersentageEndboss(0);
        }
        SoundManager.playSound("endbossDead");
        SoundManager.stopBackground();

        let intervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 250);

        setTimeout(() => {
            clearInterval(intervalId);
            window.location.reload();
        }, this.IMAGES_DEAD.length * 250);
    }

    animate() {
        this._walkAnimId = setInterval(() => {
            if (this.isDead) return;
            if (!this.isHurt) this.playAnimation(this.IMAGES_WALK);
            if (this.contactWithCharacter) {
                this.playAnimation(this.IMAGES_ANGRY);
                this.endbossMoveLeft();
            }
            if (this.world && this.world.character) {
                let distance = Math.abs(this.x - this.world.character.x);
                if (distance < 150 && !this.isHurt) {
                    this.isAngry = true;
                    this.playAngryAnimation();
                }
            }
        }, 200);
    }
}
