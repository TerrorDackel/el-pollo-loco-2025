class World {
  /* speichert alle wichtigen objekte für die spielwelt */
  character = new Character(); /* erstellt den charakter */
  level = level1; /* lädt das level */
  canvas;
  ctx;
  keyboard;
  camera_x = 0; /* speichert die kamera position */
  statusBar = new StatusBar(); /* erstellt die statusbar */
  throwableObjects = []; /* speichert die geworfenen flaschen */
  throw_sound = new Audio("./audio/7_bottle/bottleClicking.mp3");
  coin_sound = new Audio("./audio/11_coins/collectCoin.mp3");
  hitEndboss_sound = new Audio("./audio/5_chickenBoss/hitEndboss_sound.mp3");
  running = true; /* gibt an ob das spiel läuft */
  coins = []; /* speichert die münzen auf der karte */
  score = 0; /* anzahl der gesammelten münzen */
  bottles = []; /* speichert die aufgesammelten flaschen */

  /* erstellt eine neue spielwelt */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.statusBar = new StatusBar();
    this.setWorld(); /* verbindet den charakter mit der welt */
    this.spawnCoins(); /* erstellt zufällig platzierte münzen */
    this.spawnBottles(); /* erstellt zufällig platzierte flaschen */
    this.run(); /* startet die spielmechaniken */
    this.draw(); /* beginnt das rendern */
  }

  /* verbindet den charakter mit der spielwelt */
  setWorld() {
    this.character.world = this;
  }

  /* startet das hauptspiel-intervall */
  run() {
    this.interval = setInterval(() => {
      if (!this.running) return;
      this.checkCollisionWithEnemies();
      this.checkCollisionCoins();
      this.checkCollisionBottles();
      this.checkThrowObjects();
    }, 300);
  }

  /* überprüft kollisionen mit feinden und unterscheidet zwischen seitlicher kollision und sprung auf den feind */
  checkCollisionWithEnemies() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (this.isAboveEnemy(enemy)) {
          console.log("Gegner besiegt!");
          this.defeatEnemy(enemy, index);
          this.character.speedY = -15; // Charakter springt zurück hoch
        } else {
          console.log("Charakter nimmt Schaden!");
          this.character.hit();
          this.statusBar.setPersentageHealth(this.character.energy);
        }
      }
    });
  }

  /* prüft, ob der charakter wirklich von oben auf den feind springt */
  isAboveEnemy(enemy) {
    let characterFeet = this.character.y + this.character.height;
    let enemyTop = enemy.y + enemy.height / 3; // Feindhöhe für genauere Erkennung angepasst

    return characterFeet > enemyTop && this.character.speedY >= 0;
  }

  /* besiegt den feind, spielt eine animation ab und entfernt ihn aus dem spiel */
  defeatEnemy(enemy, index) {
    if (!(enemy instanceof Endboss)) {
      /* stellt sicher, dass der endboss nicht besiegt werden kann */
      enemy.isDead = true; /* setzt flag, damit feind nicht mehrfach entfernt wird */
      enemy.die(); /* spielt die animationssequenz des feindes ab */
      setTimeout(() => {
        this.level.enemies.splice(
          index,
          1
        ); /* entfernt den feind nach der animation aus dem array */
      }, 500);
    }
  }

  /* pausiert das spiel */
  pauseGame() {
    // console.log("spiel pausiert");
    this.running = false;
    this.character.pauseAnimation();
  }

  /* setzt das spiel fort */
  resumeGame() {
    // console.log("spiel wird fortgesetzt");
    this.running = true;
    this.character.resumeAnimation();
    this.draw();
  }

  restartGame() {
    Object.assign(this, new World(this.canvas, this.keyboard));
  }

  createEnemies() {
    return [new Chicken(), new ChickenBig(), new Chickensmall()];
  }

  /* überprüft ob der spieler eine flasche wirft */
  checkThrowObjects() {
    if (this.keyboard.SPACE && this.character.collectedBottles > 0) {
      let bottle = new ThrowableObjects(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      SoundManager.playSound("throwBottle");
      this.character.collectedBottles--;
      this.statusBar.setPersentageBottles(this.character.collectedBottles);
    }
  }

  /* überprüft ob der charakter eine flasche aufsammelt */
  checkCollisionBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        // console.log(" flasche aufgesammelt");
        this.bottles.splice(index, 1);
        this.character.collectedBottles++;
        this.statusBar.setPersentageBottles(this.character.collectedBottles);
      }
    });
  }

  /* überprüft ob der charakter eine münze einsammelt */
  checkCollisionCoins() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        SoundManager.playSound("coin");
        // console.log("münze aufgesammelt");
       SoundManager.playSound("coin");
        this.score++;
        this.statusBar.setPersentageCoins(this.score);
        this.coins.splice(index, 1);
      }
    });
  }

  /* erstellt zufällig platzierte münzen */
  spawnCoins() {
    for (let i = 0; i < 20; i++) {
      let x = 100 + Math.random() * 3000;
      let y = 100 + Math.random() * 150;
      let coin = new Coins();
      coin.x = x;
      coin.y = y;
      this.coins.push(coin);
    }
  }

  /* erstellt zufällig platzierte flaschen */
  spawnBottles() {
    for (let i = 0; i < 10; i++) {
      let x = 1000 + Math.random() * 2000;
      let y = 300;
      let bottle = new Bottle();
      bottle.x = x;
      bottle.y = y;
      this.bottles.push(bottle);
    }
  }

  /* zeichnet alle objekte auf das canvas */
  draw() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    // console.log("Background Objects: ", this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.statusBar.drawStatusBars(this.ctx);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  /* fügt mehrere objekte zur zeichnungsliste hinzu */
  addObjectsToMap(objects) {
    if (!objects || objects.length === 0) return;
    objects.forEach((o) => this.addToMap(o));
  }

  /* zeichnet ein objekt auf das canvas */
  addToMap(obj) {
    if (obj.otherDirection) this.flipImage(obj);
    obj.draw(this.ctx);
    if (obj.drawFrame) obj.drawFrame(this.ctx);
    if (obj.otherDirection) this.flipImageBack(obj);
  }

  /* spiegelt ein objekt horizontal */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  /* setzt das objekt zurück */
  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }
}
