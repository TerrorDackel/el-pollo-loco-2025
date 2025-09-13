class Chickensmall extends MovableObject {
    height = 50;
    width = 50;
    isDead = false;

    IMAGES_WALKING = [
        "imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = ["./imgs/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 600 + Math.random() * 3500;
        this.y = 340;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 0.9 + Math.random() * 0.9;
        this.debugMode = true;

        this.world = null;
        this.offsetTop = -10;
        this.offsetBottom = -10;
        this.offsetLeft = -10;
        this.offsetRight = -10;
    }

    setWorld(world) { this.world = world; }

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
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 130);
    }
}
