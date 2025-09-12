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
        this.hasHit = false   // verhindert mehrfachen Schaden
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
        if (this.hasHit) return
        if (!this.world || !this.world.enemies) return

        this.world.enemies.forEach((enemy, index) => {
            if (this.isBottleColliding(enemy)) {
                this.hasHit = true
                if (enemy instanceof Endboss) {
                    enemy.hitByBottle()
                } else {
                    enemy.die()
                    this.world.enemies.splice(index, 1)
                }
                this.removeBottle()
            }
        })
    }

    removeBottle() {
        let bottleIndex = this.world.throwableObjects.indexOf(this)
        if (bottleIndex !== -1) {
            this.world.throwableObjects.splice(bottleIndex, 1)
        }
    }

    isBottleColliding(enemy) {
        return (
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height
        )
    }
}
