class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];
  
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    
    setInterval(() => {
      this.checkCollision();
      this.checkThrowOjects();
   }, 300);
  }

  checkThrowOjects() {
    if (this.keyboard.SPACE) {
      let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
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

  draw() {
    /* die reihenfolge hier ist die layerreihenfolge!!! in dieserreihenfolge lest du die folien immer oben drauf*/
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    // Zeichne alle Statusleisten
    this.statusBar.drawStatusBars(this.ctx);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self =
      this; /* draw wird immer wieder aufgerufen was die grafikkarte her gibt -  requestAnimationFrame*/
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(o => {
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

