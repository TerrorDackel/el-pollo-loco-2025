class ThrowableObjects extends MovableObject {
    IMAGES_THROWBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ]

    IMAGES_SMASHINGBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ]

    constructor(x, y, world) {
        super().loadImages(this.IMAGES_THROWBOTTLES)
        this.loadImages(this.IMAGES_SMASHINGBOTTLES)
        this.x = x
        this.y = y
        this.height = 60
        this.width = 60
        this.debugMode = true
        this.world = world
        this.animate()
        this.throw()
    }

    isAboveGround() {
        return this.y < 330
    }

    animate() {
        let timeoutSet = false
        let interval = setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_THROWBOTTLES)
                this.checkBottleEnemyCollision()
            } else {
                if (!timeoutSet) {
                    timeoutSet = true
                    this.currentImage = 0
                    setTimeout(() => {
                        clearInterval(interval)
                        let index = this.world.throwableObjects.indexOf(this)
                        if (index !== -1) {
                            this.world.throwableObjects.splice(index, 1)
                        }
                    }, 300)
                }
                this.playAnimation(this.IMAGES_SMASHINGBOTTLES)
                SoundManager.playSound("smashBottle")
            }
        }, 100)
    }

    throw() {
        this.speedY = 10
        this.applyGravity()
        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += 10
            }
        }, 1000 / 50)
    }

    checkBottleEnemyCollision() {
        if (!this.world) return

        if (this.world.enemies && this.world.enemies.length) {
            for (let i = 0; i < this.world.enemies.length; i++) {
                const enemy = this.world.enemies[i]
                if (this.isBottleColliding(enemy)) {
                    if (typeof enemy.hitByBottle === "function") enemy.hitByBottle()
                    else if (typeof enemy.die === "function") enemy.die()
                    this.world.enemies.splice(i, 1)
                    const bi = this.world.throwableObjects.indexOf(this)
                    if (bi !== -1) this.world.throwableObjects.splice(bi, 1)
                    return
                }
            }
        }

        const boss = this.world.level?.boss
        if (boss && !boss.isDead && this.isBottleColliding(boss)) {
            boss.hitByBottle()
            const bi = this.world.throwableObjects.indexOf(this)
            if (bi !== -1) this.world.throwableObjects.splice(bi, 1)
        }
    }

    isBottleColliding(enemy) {
        const oL = enemy.offsetLeft || 0
        const oR = enemy.offsetRight || 0
        const oT = enemy.offsetTop || 0
        const oB = enemy.offsetBottom || 0

        const collides =
            (this.x + this.width) >= (enemy.x + oL) &&
            (this.x) <= (enemy.x + enemy.width - oR) &&
            (this.y + this.height) >= (enemy.y + oT) &&
            (this.y) <= (enemy.y + enemy.height - oB)

        return collides
    }
}
