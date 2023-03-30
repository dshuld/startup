const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.setAttribute('width', '300');
canvas.setAttribute('height', '300');

const blackBtn = document.getElementById('black-button');
const blueBtn = document.getElementById('blue-button');
const greenBtn = document.getElementById('green-button');
const orangeBtn = document.getElementById('orange-button');
const redBtn = document.getElementById('red-button');
const forestBtn = document.getElementById('forest-button');
const mountainBtn = document.getElementById('mountain-button');
const beachBtn = document.getElementById('beach-button');
const cityBtn = document.getElementById('city-button');

const blueBtnXp = 100;
const greenBtnXp = 500;
const orangeBtnXp = 1000;
const redBtnXp = 2000;
const mountainBtnXp = 1000;
const beachBtnXp = 2000;
const cityBtnXp = 3000;

const xpPerClick = 10;

canvas.addEventListener('mousedown', function(event) {
    handleClick();
});

function pixelsToPercent(pix) {
    return (pix/canvas.width)*100;
}

function percentToPixels(per) {
    return (per/100)*canvas.width;
}

var pixelPal = {
    locationsOwned: ['forest'],
    colorsOwned: ['black'],
    xp: 0,
    color: 'black',
    level: 1,
    location: 'forest'
};

function getProgress() {
    return JSON.stringify(pixelPal);
}

function loadProgress(data) {
    pixelPal = JSON.parse(data);
}

setInterval(function() {
    pixelPal.xp += pixelPal.level;
    drawCanvas();
    checkButtons();
}, 1000);

function checkButtons() {
    blueBtn.disabled = (pixelPal.colorsOwned.indexOf('blue') === -1) && (pixelPal.xp < blueBtnXp);
    greenBtn.disabled = (pixelPal.colorsOwned.indexOf('green') === -1) && (pixelPal.xp < greenBtnXp);
    orangeBtn.disabled = (pixelPal.colorsOwned.indexOf('orange') === -1) && (pixelPal.xp < orangeBtnXp);
    redBtn.disabled = (pixelPal.colorsOwned.indexOf('red') === -1) && (pixelPal.xp < redBtnXp);
    mountainBtn.disabled = (pixelPal.locationsOwned.indexOf('mountain') === -1) && (pixelPal.xp < mountainBtnXp);
    beachBtn.disabled = (pixelPal.locationsOwned.indexOf('beach') === -1) && (pixelPal.xp < beachBtnXp);
    cityBtn.disabled = (pixelPal.locationsOwned.indexOf('city') === -1) && (pixelPal.xp < cityBtnXp);
    if(pixelPal.colorsOwned.indexOf('blue') > -1) {
        blueBtn.textContent = 'Blue';
    }
    if(pixelPal.colorsOwned.indexOf('green') > -1) {
        greenBtn.textContent = 'Green';
    }
    if(pixelPal.colorsOwned.indexOf('orange') > -1) {
        orangeBtn.textContent = 'Orange';
    }
    if(pixelPal.colorsOwned.indexOf('red') > -1) {
        redBtn.textContent = 'Red';
    }

    if(pixelPal.locationsOwned.indexOf('mountain') > -1) {
        mountainBtn.textContent = 'Mountain';
    }
    if(pixelPal.locationsOwned.indexOf('beach') > -1) {
        beachBtn.textContent = 'Beach';
    }
    if(pixelPal.locationsOwned.indexOf('city') > -1) {
        cityBtn.textContent = 'City';
    }
}

function clickBlack() {
    pixelPal.color = 'black';
    drawCanvas();
}

function clickBlue() {
    if(pixelPal.colorsOwned.indexOf('blue') > -1) {
        pixelPal.color = 'blue';
    }
    else if (pixelPal.xp >= blueBtnXp) {
        pixelPal.xp -= blueBtnXp;
        pixelPal.colorsOwned.push('blue');
        pixelPal.color = 'blue';
        blueBtn.textContent = 'Blue';
        checkButtons();
    }
    drawCanvas();
}

function clickGreen() {
    if (pixelPal.colorsOwned.indexOf('green') > -1) {
        pixelPal.color = 'green';
    } else if (pixelPal.xp >= greenBtnXp) {
        pixelPal.xp -= greenBtnXp;
        pixelPal.colorsOwned.push('green');
        pixelPal.color = 'green';
        greenBtn.textContent = 'Green';
        checkButtons();
    }
    drawCanvas();
}
  
function clickOrange() {
    if (pixelPal.colorsOwned.indexOf('orange') > -1) {
        pixelPal.color = 'orange';
    } else if (pixelPal.xp >= orangeBtnXp) {
        pixelPal.xp -= orangeBtnXp;
        pixelPal.colorsOwned.push('orange');
        pixelPal.color = 'orange';
        orangeBtn.textContent = 'Orange';
        checkButtons();
    }
    drawCanvas();
}
  
function clickRed() {
    if (pixelPal.colorsOwned.indexOf('red') > -1) {
        pixelPal.color = 'red';
    } else if (pixelPal.xp >= redBtnXp) {
        pixelPal.xp -= redBtnXp;
        pixelPal.colorsOwned.push('red');
        pixelPal.color = 'red';
        redBtn.textContent = 'Red';
        checkButtons();
    }
    drawCanvas();
}

function clickForest() {
    pixelPal.location = 'forest';
    drawCanvas();
}

function clickMountain() {
    if (pixelPal.locationsOwned.indexOf('mountain') > -1) {
        pixelPal.location = 'mountain';
    } else if (pixelPal.xp >= mountainBtnXp) {
        pixelPal.xp -= mountainBtnXp;
        pixelPal.locationsOwned.push('mountain');
        pixelPal.location = 'mountain';
        mountainBtn.textContent = 'Mountain';
        checkButtons();
        pixelPal.level++;
    }
    drawCanvas();
}

function clickBeach() {
    if (pixelPal.locationsOwned.indexOf('beach') > -1) {
        pixelPal.location = 'beach';
    } else if (pixelPal.xp >= beachBtnXp) {
        pixelPal.xp -= beachBtnXp;
        pixelPal.locationsOwned.push('beach');
        pixelPal.location = 'beach';
        beachBtn.textContent = 'Beach';
        checkButtons();
        pixelPal.level++;
    }
    drawCanvas();
}

function clickCity() {
    if (pixelPal.locationsOwned.indexOf('city') > -1) {
        pixelPal.location = 'city';
    } else if (pixelPal.xp >= cityBtnXp) {
        pixelPal.xp -= cityBtnXp;
        pixelPal.locationsOwned.push('city');
        pixelPal.location = 'city';
        cityBtn.textContent = 'City';
        checkButtons();
        pixelPal.level++;
    }
    drawCanvas();
}
  

function handleClick() {
    pixelPal.xp += xpPerClick;
    drawCanvas();
    checkButtons();
}

function drawCanvas() {
    //set background
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    var bg = new Image();
    bg.src = './res/' + pixelPal.location + '.png';
    bg.onload = function() {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // draw the xp and level
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        ctx.fillText('XP: ' + pixelPal.xp, 5, 15);
        ctx.fillText('Level: ' + pixelPal.level, 5, 30);
    };
    // draw the pixel pal
    ctx.fillStyle = pixelPal.color;
    var img = new Image();
    img.src = './res/' + 'small_dog_' + pixelPal.color + '.png';
    img.onload = function() {
        ctx.drawImage(img, percentToPixels(40), percentToPixels(40), percentToPixels(20), percentToPixels(20));
    };
}
