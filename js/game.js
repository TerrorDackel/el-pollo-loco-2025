let canvas;
let world;
let keyboard = new Keyboard;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My character is", world.character);
}

window.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  if(e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
   keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }

  if (e.keyCode == 70) {
    keyboard.F = true;
  }
  
  // if (e.keyCode == 18, 13) {
  //   keyboard.ENTER = true;
  // }

  // if (e.keyCode == 69) {
  //  keyboard.E = true;
  // }

  // if (e.keyCode == 27) {
  //  keyboard.ESC = true;
  // }

  if (e.keyCode == 74) {
    keyboard.J = true;
  }
  
  if (e.keyCode == 78) {
    keyboard.N = true;
  }

  // if (e.keyCode == ) {
  //   keyboard. = true;
  // }

  // if (e.keyCode == ) {
  //  keyboard. = true;
  // }

  // if (e.keyCode == ) {
  //  keyboard. = true;
  // }

  // if (e.keyCode == ) {
  //   keyboard. = true;
  // }
  
  // if (e.keyCode == 73) {
  //   keyboard.I = true;
  // }  

  
  // if (e.keyCode == 19) {
  //   keyboard.PAUSE = true;
  // }

  // console.log(e);
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

 if (e.keyCode == 40) {
     keyboard.DOWN = false;
   }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

    if (e.keyCode == 68) {
    keyboard.D = false;
  }

  //     if (e.keyCode == 70) {
  //   keyboard.F = false;
  // }

  //     if (e.keyCode == 18, 13) {
  //   keyboard.ENTER = false;
  // }

  //     if (e.keyCode == 69) {
  //   keyboard.E = false;
  // }

  //     if (e.keyCode == 27) {
  //   keyboard.ESC = false;
  // }

      if (e.keyCode == 74) {
    keyboard.J = false;
  }

  if (e.keyCode == 78) {
    keyboard.N = false;
  }

  // if (e.keyCode == ) {
  //   keyboard. = false;
  // }

  //     if (e.keyCode == ) {
  //   keyboard. = false;
  // }

  //     if (e.keyCode == ) {
  //   keyboard. = false;
  // }  

  // console.log(e);
});
