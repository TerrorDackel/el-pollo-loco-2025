class ChickenBig extends MovableObject {
    height = 150;
    width = 150;
    isDead = false;

    IMAGES_WALKING = [
        "/imgs/4_enemie_boss_chicken/1_walk/G1.png",
        "/imgs/4_enemie_boss_chicken/1_walk/G2.png",
        "/imgs/4_enemie_boss_chicken/1_walk/G3.png",
        "/imgs/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_DEAD = ["imgs/4_enemie_boss_chicken/5_dead/G26.png"];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3500;
        this.y = 255;
        this.speed = 1;
        this.animate();
        this.moveLeft();
        this.debugMode = true;
        this.offsetTop = -10;
        this.offsetBottom = -10;
        this.offsetLeft = -10;
        this.offsetRight = -10;
    }

    die() {
        this.isDead = true;
        this.playAnimation(this.IMAGES_DEAD);
        SoundManager.playSound("chickenDead");
        setTimeout(() => this.removeFromGame(), 500);
    }

    removeFromGame() {
        let index = this.world?.level?.enemies.indexOf(this);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }

    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}
