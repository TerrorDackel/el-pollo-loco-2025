/**
 * Die Spielwelt, die alle Objekte verwaltet.
 */
class World {
  character = new Character(); /* erstellt den charakter */
  level = level1; /* lädt das level */
  canvas;
  ctx;
  keyboard;
  camera_x = 0; /* speichert die kamera position */
  statusBar = new StatusBar(); /* erstellt die statusbar */
  throwableObjects = []; /* speichert die geworfenen flaschen */
  running = true; /* gibt an ob das spiel läuft */
  coins = []; /* speichert die münzen auf der karte */
  score = 0; /* anzahl der gesammelten münzen */
  bottles = []; /* speichert die aufgesammelten flaschen */

  /**
   * @param {HTMLCanvasElement} canvas - Das Spielfeld
   * @param {Keyboard} keyboard - Die Tastatureingabe
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.statusBar = new StatusBar();
    this.level = level1;
    this.setWorld(); /* verbindet den charakter mit der welt */
    this.spawnCoins(); /* erstellt zufällig platzierte münzen */
    this.spawnBottles(); /* erstellt zufällig platzierte flaschen */
    this.run(); /* startet die spielmechaniken */
    this.draw(); /* beginnt das rendern */
  }

  /**
   * Setzt die Referenz zur Welt für den Charakter.
   */
  setWorld() {
    this.character.world = this;
    this.enemies = this.level.enemies; // Stellt sicher, dass `this.world.enemies` existiert
  }

  /**
   * Startet die Kollisionserkennung und Spiellogik in einem Intervall.
   */
  run() {
    this.interval = setInterval(() => {
      if (!this.running) return;
      this.checkCollisionCoins();
      this.checkCollisionBottles();
      this.checkThrowObjects();
     if (this.character && typeof this.character.checkCollisionWithEnemies === "function") {
            this.character.checkCollisionWithEnemies();
        }
    }, 50);
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offsetRight >= mo.x + mo.offsetLeft &&
      this.x - this.offsetLeft <= mo.x + mo.width - mo.offsetRight &&
      this.y + this.height - this.offsetBottom >= mo.y + mo.offsetTop &&
      this.y + this.offsetTop <= mo.y + mo.height - mo.offsetBottom
    );
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
      SoundManager.playSound("whisleBottle");
      this.character.collectedBottles--;
      this.statusBar.setPersentageBottles(this.character.collectedBottles);
    }
  }

  /* überprüft ob der charakter eine flasche aufsammelt */
  checkCollisionBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        SoundManager.playSound(" collectingBottle");
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
