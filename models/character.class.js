class Character extends MovableObject {
    height = 300;
    width = 150;
    x = 0;
    y = 110;
    speed = 12;

    IMAGES_IDLE = [
        "./imgs/2_character_pepe/1_idle/idle/I-1.png",
        "./imgs/2_character_pepe/1_idle/idle/I-2.png",
        "./imgs/2_character_pepe/1_idle/idle/I-3.png",
        "./imgs/2_character_pepe/1_idle/idle/I-4.png",
        "./imgs/2_character_pepe/1_idle/idle/I-5.png",
        "./imgs/2_character_pepe/1_idle/idle/I-6.png",
        "./imgs/2_character_pepe/1_idle/idle/I-7.png",
        "./imgs/2_character_pepe/1_idle/idle/I-8.png",
        "./imgs/2_character_pepe/1_idle/idle/I-9.png",
        "./imgs/2_character_pepe/1_idle/idle/I-10.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-11.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-12.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-13.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-14.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-15.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-16.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-17.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-18.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-19.png",
        "./imgs/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_WALKING = [
        "./imgs/2_character_pepe/2_walk/W-21.png",
        "./imgs/2_character_pepe/2_walk/W-22.png",
        "./imgs/2_character_pepe/2_walk/W-23.png",
        "./imgs/2_character_pepe/2_walk/W-24.png",
        "./imgs/2_character_pepe/2_walk/W-25.png",
        "./imgs/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
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

    animationInterval;
    collectedBottles = 0;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();

        this.offsetTop = 100;
        this.offsetBottom = 10;
        this.offsetLeft = 10;
        this.offsetRight = 10;

        this.energy = 5;
    }

    setWorld(world) { this.world = world; }

    animate() {
        this.animationInterval = setInterval(() => {
            SoundManager.pauseSound("walking");
            this.handleMovement();
            this.updateCamera();
            this.updateAnimation();
            this.checkCollisionWithEnemies();
        }, 1000 / 30);
    }

    pauseAnimation() { clearInterval(this.animationInterval); }
    resumeAnimation() { this.animate(); }

    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight(); this.otherDirection = false;
            SoundManager.playSound("walking");
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft(); this.otherDirection = true;
            SoundManager.playSound("walking");
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump(); SoundManager.playSound("jumping");
        }
    }

    updateCamera() { this.world.camera_x = -this.x + 100; }

    updateAnimation() {
        if (this.isDead()) this.handleDeath();
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
        else this.handleWalkingAnimation();
    }

    handleWalkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
            this.playAnimation(this.IMAGES_WALKING);
    }

    handleDeath() {
        if (!this.deadAnimationPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            SoundManager.playSound("dead");
            setTimeout(() => {
                this.deadAnimationPlayed = true;
                this.showRestartPrompt();
            }, 1000);
        }
    }

    jump() { 
        this.speedY = 33; 
    }

    checkCollisionWithEnemies() {
        this.world.enemies.forEach((enemy, i) => {
            if (this.isColliding(enemy)) {
                if (this.isStomping(enemy)) this.handleStomp(enemy, i);
                else if (!this.isHurt()) this.takeDamage();
            }
        });
        let boss = this.world.level.boss;
        if (boss && this.isColliding(boss)) {
            if (this.isStomping(boss)) this.handleBossStomp(boss);
            else if (!this.isHurt()) this.takeDamage();
        }
    }

    isStomping(enemy) {
        return this.speedY < 0 &&
            this.y + this.height <= enemy.y + 20 &&
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width;
    }

    handleStomp(enemy, index) {
        enemy.die();
        this.world.enemies.splice(index, 1);
        this.speedY = 20;
    }

    handleBossStomp(boss) {
        boss.hitByBottle();
        this.speedY = 20;
    }

    takeDamage() {
        this.hit();
        this.world.statusBar.setPersentageHealth(this.energy);
    }
}
