class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];
  throw_sound = new Audio("/audio/7_bottle/bottleClicking.mp3");
  running = true;

  constructor(canvas, keyboard) {
    this.character = new Character();
    this.level = level1;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.statusBar = new StatusBar();
    this.throwableObjects = [];
    this.coins = [];
    this.throw_sound = new Audio("/audio/7_bottle/bottleClicking.mp3");
    this.coin_sound = new Audio("audio/11_coins/collectCoin.mp3");
    this.running = true;
    this.score = 0;
    this.spawnCoins();
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.interval = setInterval(() => {
      if (!this.running) return;
      this.checkCollision();
      this.checkThrowOjects();
    }, 300);
  }

  pauseGame() {
    console.log("Spiel pausiert");
    this.running = false;
  }

  resumeGame() {
    console.log("Spiel wird fortgesetzt");
    this.running = true;
    this.draw();
  }

  checkThrowOjects() {
    if (this.keyboard.SPACE) {
      let bottle = new ThrowableObjects(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.throw_sound.play();
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPersentageHealth(this.character.energy);
        console.log(
          "character kollidiert, energie beträgt noch",
          this.character.energy
        );
      }
    });
  }

  spawnCoins() {
    for (let i = 0; i < 20; i++) {
      let x = Math.random() * (2600 - 300) + 300;
      let y = Math.random() * (300 - 150) + 150;
      let coin = new Coin(x, y);
      coin.animate();
      this.coins.push(coin);
    }
  }

  removeCoin(coin) {
    this.coins = this.coins.filter((c) => c !== coin);
  }

  checkCollision() {
    this.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.coin_sound.play();
        this.score += 5;
        this.statusBar.updateCoins(this.score);
        coin.rotateAndDisappear(this);
      }
    });
  }

  draw() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.statusBar.drawStatusBars(this.ctx);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}


