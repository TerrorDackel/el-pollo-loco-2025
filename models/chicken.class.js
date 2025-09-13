class Chicken extends MovableObject {
    height = 70;
    width = 70;
    isDead = false;

    IMAGES_WALKING = [
        "imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 500 + Math.random() * 3000;
        this.y = 310;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.moveLeft();
        this.speed = 0.3 + Math.random() * 0.5;
        this.debugMode = true;
        this.offsetTop = -10;
        this.offsetBottom = -10;
        this.offsetLeft = -10;
        this.offsetRight = -10;
    }

    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 60);
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
}
