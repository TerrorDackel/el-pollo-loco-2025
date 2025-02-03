class World {
  /* initialisierung der wichtigen objekte */
  character = new Character(); /* erstelle den charakter */
  level = level1; /* lade das level */
  canvas;
  ctx;
  keyboard;
  camera_x = 0; /* kamera-position */
  statusBar = new StatusBar(); /* erstelle die statusbar */
  throwableObjects = []; /* array für die wurfobjekte */
  throw_sound = new Audio(
    "/audio/7_bottle/bottleClicking.mp3"
  ); /* lade sound für das werfen */
  running = true; /* gibt an, ob das spiel läuft */
  coins = []; /* array für die münzen */
  MAX_COINS = 20; /* maximale anzahl an münzen */
  score = 0; /* anzahl der gesammelten münzen */

  constructor(canvas, keyboard) {
    /* speichert das canvas und die tastatureingaben */
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.statusBar = new StatusBar();
    this.statusBar.setPersentageCoins(this.score, this.MAX_COINS);
    this.throwableObjects = [];
    this.throw_sound = new Audio("/audio/7_bottle/bottleClicking.mp3");
    this.coin_sound = new Audio("audio/11_coins/collectCoin.mp3");
    this.running = true;
    this.score = 0; /* initialisiert den punktestand */
    this.spawnCoins(); /* ruft die funktion auf, um münzen zu erstellen */
    this.draw(); /* startet das rendern */
    this.setWorld(); /* verbindet den charakter mit der welt */
    this.run(); /* startet die spielmechaniken */
  }

  /* verbindet den charakter mit der welt */
  setWorld() {
    this.character.world = this;
  }

  /* startet das hauptspiel-intervall */
  run() {
    this.interval = setInterval(() => {
      if (!this.running) return;
      this.checkCollision();
      this.checkCollisionCoins();
      this.checkThrowOjects(); /* prüft, ob ein wurfobjekt geworfen wurde */
    }, 300);
  }

  /* pausiert das spiel */
  pauseGame() {
    console.log("Spiel pausiert");
    this.running = false;
    this.character.pauseAnimation(); // Charakter-Animation pausieren
  }

  /* setzt das spiel fort */
  resumeGame() {
    console.log("Spiel wird fortgesetzt");
    this.running = true;
    this.character.resumeAnimation(); // Charakter-Animation wieder starten
    this.draw();
  }

  /* überprüft, ob der spieler eine flasche wirft */
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

  /* überprüft kollisionen mit feinden und münzen */
  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(); /* reduziert die lebensenergie des charakters */
        this.statusBar.setPersentageHealth(this.character.energy);
        console.log(
          "character kollidiert, energie beträgt noch",
          this.character.energy
        );
      }
    });
  }

  checkCollisionCoins() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coin_sound.play();
        this.score += 1; // Münzenanzahl erhöhen
        this.statusBar.setPersentageCoins(this.score); // Statusbar aktualisieren
        this.coins.splice(index, 1); // Coin aus der Liste entfernen
      }
    });
  }

  /* erstellt zufällig positionierte münzen */
  spawnCoins() {
    this.MAX_COINS = 25; // Setze die maximale Anzahl an Coins
    for (let i = 0; i < 20; i++) {
      let x = 100 + Math.random() * 3000; /* zufällige x-position */
      let y = 100 + Math.random() * 150; /* zufällige y-position */
      let coin = new Coins(); /* erstellt eine neue münze */
      coin.x = x; /* setzt die x-position */
      coin.y = y; /* setzt die y-position */
      this.coins.push(coin); /* fügt die münze dem array hinzu */
    }
  }

  /* zeichnet das gesamte spielobjekte auf das canvas */
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
    this.addObjectsToMap(this.coins); /* fügt die münzen hinzu */
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /* fügt mehrere objekte zur zeichnungsliste hinzu */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /* zeichnet ein einzelnes objekt auf das canvas */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.drawFrame) {
      mo.drawFrame(
        this.ctx
      ); /* stellt sicher, dass keine fehler durch fehlende drawFrame-methode auftreten */
    }
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /* spiegelt ein objekt horizontal */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /* setzt das objekt nach dem spiegeln zurück */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
