if(window.innerWidth < 600) {
    document.querySelector('.undo').remove();
    document.querySelector('.forward').remove();
    document.querySelector('.helpOpen').remove();
    document.querySelector('.title').style.display = 'none';
    document.querySelector('.menu__mobile').innerHTML = `
    <div class="undo undoMobile option">Undo</div>
    <div class="forward forwardMobile option">Redo</div>
    <div class="helpOpen option">Help</div>
    `;
}

let displacementActive = false;

const buttons = {
    red: document.querySelector('.red'),
    yellow: document.querySelector('.yellow'),
    blue: document.querySelector('.blue'),
    green: document.querySelector('.green'),
    black: document.querySelector('.black'),
    clear: document.querySelector('.clear'),
    x: document.querySelector('.x'),
    y: document.querySelector('.y'),
    d1: document.querySelector('.d1'),
    d2: document.querySelector('.d2'),
    two: document.querySelector('.two'),
    three: document.querySelector('.three'),
    four: document.querySelector('.four'),
    five: document.querySelector('.five'),
    six: document.querySelector('.six'),
    ten: document.querySelector('.ten'),
    s1: document.querySelector('.s1'),
    s2: document.querySelector('.s2'),
    s3: document.querySelector('.s3'),
    s4: document.querySelector('.s4'),
    s5: document.querySelector('.s5'),
    d4: document.querySelector('.displacementFour'),
    undo: document.querySelector('.undo'),
    forward: document.querySelector('.forward'),
    clear: document.querySelector('.clear'),
    grid: document.querySelector('.gridButton'),
    help: document.querySelector('.helpOpen'),
    helpClose: document.querySelector('.help__close'),
    normal: document.querySelector('.normal'),
    save: document.querySelector('.save'),
}

const colors = ['red', 'yellow', 'blue', 'green', 'black'];

const shapesA = ['s1', 's2', 's3', 's4', 's5'];

const addHeight = [...colors, ...shapesA, 'two', 'three', 'four', 'five', 'six', 'ten'];

addHeight.forEach((c) => {
    buttons[c].style.height = buttons[c].offsetWidth+'px';
    buttons[c].style.lineHeight = buttons[c].offsetWidth+'px';
});

window.onresize = () => {
    addHeight.forEach((c) => {
        buttons[c].style.height = buttons[c].offsetWidth+'px';
        buttons[c].style.lineHeight = buttons[c].offsetWidth+'px';
    });
}

const colorsUnactive = () => {
    colors.forEach((c) => {
        buttons[c].classList.remove('color__active');
    })
}

buttons.red.addEventListener('click', () => {
    colorsUnactive();
    buttons.red.classList.add('color__active');
    color = 'hsl(0, 100%, 50%)';
});
buttons.yellow.addEventListener('click', () => {
    colorsUnactive();
    buttons.yellow.classList.add('color__active');
    color = 'hsl(56, 100%, 50%)';
});
buttons.blue.addEventListener('click', () => {
    colorsUnactive();
    buttons.blue.classList.add('color__active');
    color = 'hsl(219, 100%, 50%)';
});
buttons.green.addEventListener('click', () => {
    colorsUnactive();
    buttons.green.classList.add('color__active');
    color = 'hsl(120, 100%, 28%)';
});
buttons.black.addEventListener('click', () => {
    colorsUnactive();
    buttons.black.classList.add('color__active');
    color = 'hsl(0, 0%, 0%)';
});
buttons.clear.addEventListener('click', () => {
    mainCtx.clearRect( 0, 0, WIDTH, HEIGHT );
    shapesGrid = [
        [[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0]],
      ];
    if(saves.length > positionOfSave && positionOfSave >= 0) {
        saves = saves.slice(0, positionOfSave + 1);
    }
    saves.push(canvas.toDataURL('image/png'));
    positionOfSave++;
});


const setLine = (element) => {
    element.clearRect(0,0,WIDTH,HEIGHT);
    element.beginPath();
    element.strokeStyle = 'hsl(36, 100%, 75%)';
    element.lineWidth = 2;
}

const cross = () => { //drawing cross
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH/2 - 20, HEIGHT/2);
    typeCtx.lineTo(WIDTH/2 + 20, HEIGHT/2);
    typeCtx.moveTo(WIDTH/2, HEIGHT/2 - 20);
    typeCtx.lineTo(WIDTH/2, HEIGHT/2 + 20);
    typeCtx.stroke();
}

const removeActive = () => {
    displacementActive = false;
    for(const button in buttons) {
        if(button === 'grid') continue;
        buttons[button].classList.remove('active');
    }
}

//just sets type of drawing and draws line of symmetry if needed
buttons.normal.addEventListener('click', () => {
    removeActive();
    typeOfDrawing = 'normal';
    typeCtx.clearRect(0,0,WIDTH,HEIGHT);
    buttons.normal.classList.add('active');
});

buttons.y.addEventListener('click', () => {
    typeOfDrawing = 'x';
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH/2, 0);
    typeCtx.lineTo(WIDTH/2, HEIGHT);
    typeCtx.stroke();
    removeActive();
    buttons.y.classList.add('active');
});

buttons.x.addEventListener('click', () => {
    typeOfDrawing = 'y';
    setLine(typeCtx);
    typeCtx.moveTo(0, HEIGHT/2);
    typeCtx.lineTo(WIDTH, HEIGHT/2);
    typeCtx.stroke();
    removeActive();
    buttons.x.classList.add('active');
});

buttons.d1.addEventListener('click', () => {
    typeOfDrawing = 'd1';
    setLine(typeCtx);
    typeCtx.moveTo(0, 0);
    typeCtx.lineTo(WIDTH, HEIGHT);
    typeCtx.stroke();
    removeActive();
    buttons.d1.classList.add('active');
});

buttons.d2.addEventListener('click', () => {
    typeOfDrawing = 'd2';
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH, 0);
    typeCtx.lineTo(0, HEIGHT);
    typeCtx.stroke();
    removeActive();
    buttons.d2.classList.add('active');
});

buttons.two.addEventListener('click', () => {
    typeOfDrawing = 's2';
    cross();
    removeActive();
    buttons.two.classList.add('active');
});

buttons.three.addEventListener('click', () => {
    typeOfDrawing = 's3';
    cross();
    removeActive();
    buttons.three.classList.add('active');
});

buttons.four.addEventListener('click', () => {
    typeOfDrawing = 's4';
    cross();
    removeActive();
    buttons.four.classList.add('active');
});

buttons.five.addEventListener('click', () => {
    typeOfDrawing = 's5';
    cross();
    removeActive();
    buttons.five.classList.add('active');
});

buttons.six.addEventListener('click', () => {
    typeOfDrawing = 's6';
    cross();
    removeActive();
    buttons.six.classList.add('active');
});

buttons.ten.addEventListener('click', () => {
    typeOfDrawing = 's10';
    cross();
    removeActive();
    buttons.ten.classList.add('active');
});

//end

//creates image which loads saves
const loadedSave = new Image();

buttons.undo.addEventListener('click', () => {
    mainCtx.clearRect(0,0,WIDTH,HEIGHT)//clears main canvas
    if(positionOfSave <= 0) { //checks if there are any saves if not returns
        positionOfSave = -1;
        return;
    }
    //loads save
    loadedSave.src = saves[positionOfSave-1];
    loadedSave.onload = () => { //when save its loaded draws it
        mainCtx.drawImage(loadedSave,0,0);
        positionOfSave--;
    }
});

buttons.forward.addEventListener('click', () => {
    if(positionOfSave >= saves.length - 1) return; //checks if there are any saves forward if not returns
    mainCtx.clearRect(0,0,WIDTH,HEIGHT); //rest is the same as in undo
    loadedSave.src = saves[positionOfSave+1];
    loadedSave.onload = () => {
        mainCtx.drawImage(loadedSave,0,0);
        positionOfSave++;
    }
});

buttons.grid.addEventListener('click', () => {
    //grid show / hide
    document.querySelector('.grid').classList.toggle('show');
    buttons.grid.classList.toggle('active');
});

buttons.s1.addEventListener('click', () => {
    typeOfDrawing = 'sg1';
    removeActive();
    moreFields();
    buttons.s1.classList.add('active');
});

buttons.s2.addEventListener('click', () => {
    typeOfDrawing = 'sg2';
    removeActive();
    moreFields();
    buttons.s2.classList.add('active');
});

buttons.s3.addEventListener('click', () => {
    typeOfDrawing = 'sg3';
    removeActive();
    moreFields();
    buttons.s3.classList.add('active');
});

buttons.s4.addEventListener('click', () => {
    typeOfDrawing = 'sg4';
    removeActive();
    moreFields();
    buttons.s4.classList.add('active');
});

buttons.s5.addEventListener('click', () => {
    typeOfDrawing = 'sg5';
    removeActive();
    moreFields();
    buttons.s5.classList.add('active');
});

const displacementOn = () => {
    displacementActive = true;
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH/3, 0);
    typeCtx.lineTo(WIDTH/3, HEIGHT);

    typeCtx.moveTo(WIDTH/3*2, 0);
    typeCtx.lineTo(WIDTH/3*2, HEIGHT);

    typeCtx.moveTo(0, HEIGHT/3);
    typeCtx.lineTo(WIDTH, HEIGHT/3);

    typeCtx.moveTo(0, HEIGHT/3*2);
    typeCtx.lineTo(WIDTH, HEIGHT/3*2);
    typeCtx.stroke();
}

const moreFields = () => {
    displacementActive = true;
    setLine(typeCtx);

    for(let i=1; i<9; i++) {
        typeCtx.moveTo(WIDTH/9*i, 0);
        typeCtx.lineTo(WIDTH/9*i, HEIGHT);

        typeCtx.moveTo(0, HEIGHT/9*i);
        typeCtx.lineTo(WIDTH, HEIGHT/9*i);
    }
    typeCtx.stroke();

    typeCtx.beginPath();
    typeCtx.lineWidth = 5;

    typeCtx.moveTo(WIDTH/3, 0);
    typeCtx.lineTo(WIDTH/3, HEIGHT);

    typeCtx.moveTo(WIDTH/3*2, 0);
    typeCtx.lineTo(WIDTH/3*2, HEIGHT);

    typeCtx.moveTo(0, HEIGHT/3);
    typeCtx.lineTo(WIDTH, HEIGHT/3);

    typeCtx.moveTo(0, HEIGHT/3*2);
    typeCtx.lineTo(WIDTH, HEIGHT/3*2);
    typeCtx.stroke();
}

const menuL = document.querySelector('.menu__left');
const menuR = document.querySelector('.menu__right');
const canvasBox = document.querySelector('.canvasBox');

document.querySelector('.menu__active').addEventListener('click', () => {
    menuL.classList.toggle('show');
    menuR.classList.toggle('show');
    canvasBox.classList.toggle('hide');
});

buttons.save.addEventListener('click', () => {
    if(saves.length) {
        ctx[0].fillStyle = '#fff';
        ctx[0].fillRect(0,0,WIDTH,HEIGHT);
        ctx[0].drawImage(canvas, 0, 0);
        const download = document.createElement('a');
        download.download = 'Symmetry Drawing';
        download.href = mirrorCanvas[0].toDataURL('image/png');
        download.click();
        ctx[0].clearRect(0,0,WIDTH,HEIGHT);
    }
});

buttons.d4.addEventListener('click', () => {
    typeOfDrawing = 'd4';
    removeActive();
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH/4, 0);
    typeCtx.lineTo(WIDTH/4, HEIGHT);
    typeCtx.moveTo(WIDTH/4*2, 0);
    typeCtx.lineTo(WIDTH/4*2, HEIGHT);
    typeCtx.moveTo(WIDTH/4*3, 0);
    typeCtx.lineTo(WIDTH/4*3, HEIGHT);
    typeCtx.stroke();
    buttons.normal.classList.add('active');
    buttons.d4.classList.add('active');
});
