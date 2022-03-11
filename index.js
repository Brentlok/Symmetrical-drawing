const canvas = document.querySelector('.main');
const mainCtx = canvas.getContext('2d');

const mirrorCanvas = document.querySelectorAll('.mirror');
const ctx = [];

const typeCanvas = document.querySelector('.type');
const typeCtx = typeCanvas.getContext('2d');

let WIDTH = 0;

if(window.innerWidth > 600) {
  WIDTH = window.innerHeight - 100;
} else {
  if(window.innerWidth > window.innerHeight) {
    WIDTH = window.innerHeight * 0.9;
  } else {
    WIDTH = window.innerWidth * 0.9;
  }
}

const HEIGHT = WIDTH;

canvas.width = WIDTH;
canvas.height = HEIGHT;

typeCanvas.width = WIDTH;
typeCanvas.height = HEIGHT;

mirrorCanvas.forEach((canv) => {
  ctx.push(canv.getContext('2d'));
  canv.width = WIDTH;
  canv.height = HEIGHT;
});

const background = document.querySelector('.background');
background.style.width = WIDTH + 'px';
background.style.height = HEIGHT + 'px';

//MOUSE
let mouse = {
    x: 0,
    y: 0,
}

let saves = []; //Array of saves
let positionOfSave = -1; //there is no saves for now

const getMousePos = (mouseEvent) => {
  let obj = document.querySelector('canvas');
  let obj_left = 0;
  let obj_top = 0;
  while (obj.offsetParent)
  {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  if (mouseEvent)
  {
    //FireFox
    mouse.x = mouseEvent.pageX;
    mouse.y = mouseEvent.pageY;
  }
  else
  {
    //IE
    mouse.x = window.event.x + document.body.scrollLeft - 2;
    mouse.y = window.event.y + document.body.scrollTop - 2;
  }
  mouse.x -= obj_left;
  mouse.y -= obj_top;
}

//MOUSE END

//DRAW
let color = 'hsl(0, 0%, 0%)'; //color var
let painting = false;
let mouseIn = true;
let typeOfDrawing = 'normal';

const startPosition = (touch) => {
    if(!mouseIn) return; //If mouse is out of canvas you cant draw
    if(touchE && touch !== 'yes') return;
    //starts drawing
    painting = true;
    draw(touch);
}

const finishedPosition = () => {
    //ends drawing
    painting = false;
    ctx.forEach((c) => {
      c.beginPath();
    })
}

const draw = (touch) => {
    if(!painting || !mouseIn) return; //if painting is false or if mouse is out of canvas drawing stops

    if(touch === 'yes') {
      mouse.y -= window.innerHeight * 0.1 - 30;
      mouse.x -= document.querySelector('.menu__left').offsetWidth;
    }

    ctx.forEach((c) => {
      c.lineWidth = 5;
      c.lineCap = 'round';
      c.strokeStyle = color;
      c.fillStyle = color;
    });

    switch(typeOfDrawing) { //swtich which choose drawing
      case 'normal':
        normalDraw();
        break;
      case 'x':
        xDraw();
        break;
      case 'y':
        yDraw();
        break;
      case 'd1':
        d1Draw();
        break;
      case 'd2':
        d2Draw();
        break;
      case 's2':
        sDraw();
        break;
      case 's3':
        sDraw();
        break;
      case 's4':
        sDraw();
        break;
      case 's5':
        sDraw();
        break;
      case 's6':
        sDraw();
        break;
      case 's10':
        sDraw();
        break;
      case 'sg1':
        s1Draw();
        break;
      case 'sg2':
        s2Draw();
        break;
      case 'sg3':
        s3Draw();
        break;
      case 'sg4':
        s4Draw();
        break;
      case 'sg5':
        s5Draw();
        break;
      case 'd4':
        normalDraw();
        displacementFourStripes();
        break;
      default:
        normalDraw();
        break;
    }

    if(displacementActive) {
      displacementSymmetry();
    }
}

const normalDraw = () => {
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();
  ctx[0].beginPath();
  ctx[0].moveTo(mouse.x, mouse.y);
}

const xDraw = () => {
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();

  ctx[1].lineTo(WIDTH - mouse.x, mouse.y);
  ctx[1].stroke();
  ctx[1].lineTo(WIDTH - mouse.x, mouse.y);
  ctx[1].stroke();
}

const yDraw = () => {
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();

  ctx[1].lineTo(mouse.x, HEIGHT - mouse.y);
  ctx[1].stroke();
  ctx[1].lineTo(mouse.x, HEIGHT - mouse.y);
  ctx[1].stroke();
}

const d1Draw = () => {
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();

  ctx[1].lineTo(mouse.y, mouse.x);
  ctx[1].stroke();
  ctx[1].lineTo(mouse.y, mouse.x);
  ctx[1].stroke();
}

const d2Draw = () => {
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();
  ctx[0].lineTo(mouse.x, mouse.y);
  ctx[0].stroke();

  ctx[1].lineTo(HEIGHT - mouse.y, WIDTH - mouse.x);
  ctx[1].stroke();
  ctx[1].lineTo(HEIGHT - mouse.y, WIDTH - mouse.x);
  ctx[1].stroke();
}


const sDraw = () => {
  const times = parseInt(typeOfDrawing.slice(1)); //Takes number of repetitions from typeOfDrawing variable
  for(let i = 0; i<times; i++) { //loops in ctx's from 0 to times
    ctx[i].translate(WIDTH/2, HEIGHT/2); //it moves the 0 0 point of canvas to the center of canvas
    ctx[i].rotate(( (360 / times * i) ) * Math.PI / 180); //rotation of the canvas
    ctx[i].lineTo(mouse.x - WIDTH/2, mouse.y - HEIGHT/2); //and it drawes line
    ctx[i].stroke();
    ctx[i].lineTo(mouse.x - WIDTH/2, mouse.y - HEIGHT/2);
    ctx[i].stroke();
    ctx[i].setTransform(1, 0, 0, 1, 0, 0); //canvas is going back to normal here
  }

}

//its a 3x3 grid
let shapesGrid = [
  [[0,0],[0,0],[0,0]],
  [[0,0],[0,0],[0,0]],
  [[0,0],[0,0],[0,0]],
];


const s1Draw = () => {
  let cords = getCord();//gets position of user on the canvas for example 0,0 if user is on the first square of the grid
  let x = cords[0] % 3; //gets position from 0 to 2
  let y = cords[1] % 3;
  if(shapesGrid[y][x].includes(2) || shapesGrid[y][x].includes(3)) sDelete(x,y); //if there is a square (3) or other triangle type (2) clears the square

  if(shapesGrid[y][x][0] === 1) {
    ctx[0].fillStyle = 'white';
    for(let i=0; i<9; i+=3) {
      for(let j=0; j<9; j+=3) {
        //drawing on all squares
        ctx[0].moveTo((WIDTH/9*(x + 1 + j)), HEIGHT/9*(y+i));
        ctx[0].lineTo(WIDTH/9*(x + 1 + j), HEIGHT/9*(y+1+i));
        ctx[0].lineTo(WIDTH/9*(x + j), HEIGHT/9*(y+1+i));
        ctx[0].lineTo(WIDTH/9*(x + 1 + j), HEIGHT/9*(y+i));
        ctx[0].fill();
      }
    }
    shapesGrid[y][x][0] = 0;
    return;
  }

  for(let i=0; i<9; i+=3) {
    for(let j=0; j<9; j+=3) {
      //drawing on all squares
      ctx[0].moveTo((WIDTH/9*(x + 1 + j)), HEIGHT/9*(y+i));
      ctx[0].lineTo(WIDTH/9*(x + 1 + j), HEIGHT/9*(y+1+i));
      ctx[0].lineTo(WIDTH/9*(x + j), HEIGHT/9*(y+1+i));
      ctx[0].lineTo(WIDTH/9*(x + 1 + j), HEIGHT/9*(y+i));
      ctx[0].fill();
    }
  }

  //sets this position on the grid to 1
  shapesGrid[y][x][0] = 1;
}

const s2Draw = () => {
  let cords = getCord();
  let x = cords[0] % 3;
  let y = cords[1] % 3;
  if(shapesGrid[y][x].includes(2) || shapesGrid[y][x].includes(3)) sDelete(x,y);

  if(shapesGrid[y][x][1] === 1) {
    ctx[0].fillStyle = 'white';
    for(let i=0; i<9; i+=3) {
      for(let j=0; j<9; j+=3) {
        ctx[0].moveTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
        ctx[0].lineTo(WIDTH/9*(x + 1 + j), HEIGHT/9*(y+i));
        ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+1+i));
        ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
        ctx[0].fill();
      }
    }
    shapesGrid[y][x][1] = 0;
    return;
  }
  for(let i=0; i<9; i+=3) {
    for(let j=0; j<9; j+=3) {
      ctx[0].moveTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
      ctx[0].lineTo(WIDTH/9*(x + 1 + j), HEIGHT/9*(y+i));
      ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+1+i));
      ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
      ctx[0].fill();
    }
  }

  shapesGrid[y][x][1] = 1;
}

const s3Draw = () => {
  let cords = getCord();
  let x = cords[0] % 3;
  let y = cords[1] % 3;
  if(shapesGrid[y][x].includes(1) || shapesGrid[y][x].includes(3)) sDelete(x,y);

  if(shapesGrid[y][x][0] === 2) {
    ctx[0].fillStyle = 'white';
    for(let i=0; i<9; i+=3) {
      for(let j=0; j<9; j+=3) {
        ctx[0].moveTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
        ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+1+i));
        ctx[0].lineTo(WIDTH/9*(x+1+j), HEIGHT/9*(y+1+i));
        ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
        ctx[0].fill();
      }
    }
    shapesGrid[y][x][0] = 0;
    return;
  }

  for(let i=0; i<9; i+=3) {
    for(let j=0; j<9; j+=3) {
      ctx[0].moveTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
      ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+1+i));
      ctx[0].lineTo(WIDTH/9*(x+1+j), HEIGHT/9*(y+1+i));
      ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
      ctx[0].fill();
    }
  }


  shapesGrid[y][x][0] = 2;
}

const s4Draw = () => {
  let cords = getCord();
  let x = cords[0] % 3;
  let y = cords[1] % 3;
  if(shapesGrid[y][x].includes(1) || shapesGrid[y][x].includes(3)) sDelete(x,y);

  if(shapesGrid[y][x][1] === 2) {
    ctx[0].fillStyle = 'white';
    for(let i=0; i<9; i+=3) {
      for(let j=0; j<9; j+=3) {
        ctx[0].moveTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
        ctx[0].lineTo(WIDTH/9*(x+1+j), HEIGHT/9*(y+i));
        ctx[0].lineTo(WIDTH/9*(x+1+j), HEIGHT/9*(y+1+i));
        ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
        ctx[0].fill();
      }
    }
    shapesGrid[y][x][1] = 0;
    return;
  }

  for(let i=0; i<9; i+=3) {
    for(let j=0; j<9; j+=3) {
      ctx[0].moveTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
      ctx[0].lineTo(WIDTH/9*(x+1+j), HEIGHT/9*(y+i));
      ctx[0].lineTo(WIDTH/9*(x+1+j), HEIGHT/9*(y+1+i));
      ctx[0].lineTo(WIDTH/9*(x+j), HEIGHT/9*(y+i));
      ctx[0].fill();
    }
  }

  shapesGrid[y][x][1] = 2;
}

const s5Draw = () => {
  let cords = getCord();
  let x = cords[0] % 3;
  let y = cords[1] % 3;

  if(shapesGrid[y][x][0] === 3) {
    ctx[0].fillStyle = 'white';
    for(let i=0; i<9; i+=3) {
      for(let j=0; j<9; j+=3) {
        ctx[0].fillRect(WIDTH/9*(x+j), HEIGHT/9*(y+i), WIDTH/9, HEIGHT/9);
      }
    }
    shapesGrid[y][x][0] = 0;
    shapesGrid[y][x][1] = 0;
    return;
  }

  for(let i=0; i<9; i+=3) {
    for(let j=0; j<9; j+=3) {
      ctx[0].fillRect(WIDTH/9*(x+j), HEIGHT/9*(y+i), WIDTH/9, HEIGHT/9);
    }
  }

  shapesGrid[y][x][0] = 3;
  shapesGrid[y][x][1] = 3;
}

const sDelete = (x, y) => {
  for(let i=0; i<9; i+=3) {
    for(let j=0; j<9; j+=3) {
      mainCtx.clearRect(WIDTH/9*(x+j), HEIGHT/9*(y+i), WIDTH/9, HEIGHT/9);
    }
  }
}

const getCord = () => {
  let xCord = 0;
  let yCord = 0;
  if(mouse.x >= WIDTH/9 && mouse.x < WIDTH/9*2) xCord = 1;
  if(mouse.x >= WIDTH/9*2 && mouse.x < WIDTH/9*3) xCord = 2;
  if(mouse.x >= WIDTH/9*3 && mouse.x < WIDTH/9*4) xCord = 3;
  if(mouse.x >= WIDTH/9*4 && mouse.x < WIDTH/9*5) xCord = 4;
  if(mouse.x >= WIDTH/9*5 && mouse.x < WIDTH/9*6) xCord = 5;
  if(mouse.x >= WIDTH/9*6 && mouse.x < WIDTH/9*7) xCord = 6;
  if(mouse.x >= WIDTH/9*7 && mouse.x < WIDTH/9*8) xCord = 7;
  if(mouse.x >= WIDTH/9*8 && mouse.x <= WIDTH) xCord = 8;

  if(mouse.y >= HEIGHT/9 && mouse.y < HEIGHT/9*2) yCord = 1;
  if(mouse.y >= HEIGHT/9*2 && mouse.y < HEIGHT/9*3) yCord = 2;
  if(mouse.y >= HEIGHT/9*3 && mouse.y < HEIGHT/9*4) yCord = 3;
  if(mouse.y >= HEIGHT/9*4 && mouse.y < HEIGHT/9*5) yCord = 4;
  if(mouse.y >= HEIGHT/9*5 && mouse.y < HEIGHT/9*6) yCord = 5;
  if(mouse.y >= HEIGHT/9*6 && mouse.y < HEIGHT/9*7) yCord = 6;
  if(mouse.y >= HEIGHT/9*7 && mouse.y < HEIGHT/9*8) yCord = 7;
  if(mouse.y >= HEIGHT/9*8 && mouse.y <= HEIGHT) yCord = 8;

  return [xCord, yCord];
}

function displacementSymmetry() {
  let xC = 0;
  let yC = 0;
  if(mouse.x >= WIDTH/3 && mouse.x < WIDTH/3*2) xC = 1;
  if(mouse.x >= WIDTH/3*2 && mouse.x <= WIDTH) xC = 2;
  if(mouse.y >= HEIGHT/3 && mouse.y < HEIGHT/3*2) yC = 1;
  if(mouse.y >= HEIGHT/3*2 && mouse.y <= HEIGHT) yC = 2;
  for(let y=0; y<3; y++) {
    for(let x=0; x<3; x++) {
      ctx[x + y*3].drawImage(mirrorCanvas[0], (x - xC) * WIDTH/3, (y - yC) * HEIGHT / 3);
    }
  }
}

function displacementFourStripes() {
  let xC = 0;
  if(mouse.x >= WIDTH/4 && mouse.x < WIDTH/4*2) xC = 1;
  if(mouse.x >= WIDTH/4*2 && mouse.x < WIDTH/4*3) xC = 2;
  if(mouse.x >= WIDTH/4*3 && mouse.x <= WIDTH) xC = 3;
  for(let x=0; x<4; x++) {
    ctx[x].drawImage(mirrorCanvas[0], (x - xC) * WIDTH/4, 0);
  }
}

const saveFunction = () => {
  //if(['sg1', 'sg2', 'sg3', 'sg4', 'sg5'].includes(typeOfDrawing)) return;
  ctx.forEach((c, index) => { //takes all canvas and draws them into mainCanvas
    mainCtx.drawImage(mirrorCanvas[index], 0, 0);
    c.clearRect(0,0,WIDTH,HEIGHT);
  });
  //delete next saves
  if(saves.length > positionOfSave && positionOfSave >= 0) {
    saves = saves.slice(0, positionOfSave + 1);
  }
  //adds new save
  saves.push(canvas.toDataURL('image/png'));
  positionOfSave++;
}

let touchE = false;

//some listeners both for mouse and touch
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('touchstart', (e) => {
    touchE = true;
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    startPosition('yes');
});

canvas.addEventListener('mouseup', () => {
  finishedPosition();
  saveFunction();
});
canvas.addEventListener('touchend', () => {
  if(['sg1', 'sg2', 'sg3', 'sg4', 'sg5'].includes(typeOfDrawing)) {
    return;
  }
  touchE = true;
  finishedPosition();
  saveFunction();
});

canvas.addEventListener('mousemove', () => {
    if(touchE) return;
    getMousePos();
    if(!['sg1', 'sg2', 'sg3', 'sg4', 'sg5'].includes(typeOfDrawing)) { //you cant move mouse while drawing those shapes
      draw();
    }
});
canvas.addEventListener('touchmove', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    touchE = true;
    if(!['sg1', 'sg2', 'sg3', 'sg4', 'sg5'].includes(typeOfDrawing)) {
      draw('yes');
    }
});
canvas.addEventListener('mouseover', () => {
    mouseIn = true;
});
canvas.addEventListener('mouseout', () => {
  if(!touchE) mouseIn = false;
});
canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); });
//DRAW END