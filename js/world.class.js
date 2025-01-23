class World {
  character = new Character();
  enemies = [
    new Chickensmall(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
  ];
  clouds = [
    // new Cloud(),
    new Cloud(),
  ];

  backgroundObjects = [
    new BackgroundObjects("./imgs/5_background/layers/air.png", 0),
    new BackgroundObjects("./imgs/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("./imgs/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("./imgs/5_background/layers/1_first_layer/1.png", 0),
  ];
  ctx;
  canvas;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    /* die reihenfolge hier ist die layerreihenfolge!!! in dieserreihenfolge lest du die folien immer oben drauf*/
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.clouds);

    let self =
      this; /* draw wird immer wieder aufgerufen was die grafikkarte her gibt -  requestAnimationFrame*/
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
    /* mo heisst bzw ist dei abkürzung zu movableObjects*/
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
