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

canvas.addEventListener('mousedown', function(event) {
    handleClick();
});

function pixelsToPercent(pix) {
    return (pix/canvas.width)*100;
}

function percentToPixels(per) {
    return (per/100)*canvas.width;
}

var locationsOwned = ['forest']
var colorsOwned = ['black']
const xpPerClick = 10;
var xpPerSecond = 1;

const pixelPal = {
    xp: 0,
    color: 'black',
    level: 1,
    location: 'forest',
    gainXp: function(amount) {
        this.xp += amount;
    },
    changeColor: function(color) {
        this.color = color;
    },
    levelUp: function() {
        this.level++;
        xpPerSecond = this.level;
    },
    changeLocation: function(location) {
        this.location = location;
    }
};

setInterval(function() {
    pixelPal.gainXp(xpPerSecond);
    drawCanvas();
    checkButtons();
}, 1000);

function checkButtons() {
    blueBtn.disabled = (colorsOwned.indexOf('blue') === -1) && (pixelPal.xp < blueBtnXp);
    greenBtn.disabled = (colorsOwned.indexOf('green') === -1) && (pixelPal.xp < greenBtnXp);
    orangeBtn.disabled = (colorsOwned.indexOf('orange') === -1) && (pixelPal.xp < orangeBtnXp);
    redBtn.disabled = (colorsOwned.indexOf('red') === -1) && (pixelPal.xp < redBtnXp);
    mountainBtn.disabled = (locationsOwned.indexOf('mountain') === -1) && (pixelPal.xp < mountainBtnXp);
    beachBtn.disabled = (locationsOwned.indexOf('beach') === -1) && (pixelPal.xp < beachBtnXp);
    cityBtn.disabled = (locationsOwned.indexOf('city') === -1) && (pixelPal.xp < cityBtnXp);
}

function clickBlack() {
    pixelPal.changeColor('black');
    drawCanvas();
}

function clickBlue() {
    if(colorsOwned.indexOf('blue') > -1) {
        pixelPal.changeColor('blue');
    }
    else if (pixelPal.xp >= blueBtnXp) {
        pixelPal.xp -= blueBtnXp;
        colorsOwned.push('blue');
        pixelPal.changeColor('blue');
        blueBtn.textContent = 'Blue';
        checkButtons();
    }
    drawCanvas();
}

function clickGreen() {
    if (colorsOwned.indexOf('green') > -1) {
        pixelPal.changeColor('green');
    } else if (pixelPal.xp >= greenBtnXp) {
        pixelPal.xp -= greenBtnXp;
        colorsOwned.push('green');
        pixelPal.changeColor('green');
        greenBtn.textContent = 'Green';
        checkButtons();
    }
    drawCanvas();
}
  
function clickOrange() {
    if (colorsOwned.indexOf('orange') > -1) {
        pixelPal.changeColor('orange');
    } else if (pixelPal.xp >= orangeBtnXp) {
        pixelPal.xp -= orangeBtnXp;
        colorsOwned.push('orange');
        pixelPal.changeColor('orange');
        orangeBtn.textContent = 'Orange';
        checkButtons();
    }
    drawCanvas();
}
  
function clickRed() {
    if (colorsOwned.indexOf('red') > -1) {
        pixelPal.changeColor('red');
    } else if (pixelPal.xp >= redBtnXp) {
        pixelPal.xp -= redBtnXp;
        colorsOwned.push('red');
        pixelPal.changeColor('red');
        redBtn.textContent = 'Red';
        checkButtons();
    }
    drawCanvas();
}

function clickForest() {
    pixelPal.changeLocation('forest');
    drawCanvas();
}

function clickMountain() {
    if (locationsOwned.indexOf('mountain') > -1) {
      pixelPal.changeLocation('mountain');
    } else if (pixelPal.xp >= mountainBtnXp) {
      pixelPal.xp -= mountainBtnXp;
      locationsOwned.push('mountain');
      pixelPal.changeLocation('mountain');
      mountainBtn.textContent = 'Mountain';
      checkButtons();
      pixelPal.levelUp();
    }
    drawCanvas();
  }
  
  function clickBeach() {
    if (locationsOwned.indexOf('beach') > -1) {
      pixelPal.changeLocation('beach');
    } else if (pixelPal.xp >= beachBtnXp) {
      pixelPal.xp -= beachBtnXp;
      locationsOwned.push('beach');
      pixelPal.changeLocation('beach');
      beachBtn.textContent = 'Beach';
      checkButtons();
      pixelPal.levelUp();
    }
    drawCanvas();
  }
  
  function clickCity() {
    if (locationsOwned.indexOf('city') > -1) {
      pixelPal.changeLocation('city');
    } else if (pixelPal.xp >= cityBtnXp) {
      pixelPal.xp -= cityBtnXp;
      locationsOwned.push('city');
      pixelPal.changeLocation('city');
      cityBtn.textContent = 'City';
      checkButtons();
      pixelPal.levelUp();
    }
    drawCanvas();
  }
  

function handleClick() {
    pixelPal.gainXp(xpPerClick);
    drawCanvas();
    checkButtons();
}

function drawCanvas() {
    //set background
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    var bg = new Image();
    bg.src = pixelPal.location + '.png';
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    // draw the pixel pal
    ctx.fillStyle = pixelPal.color;
    var img = new Image();
    img.src = 'small_dog_' + pixelPal.color + '.png';
    ctx.drawImage(img, percentToPixels(40), percentToPixels(40), percentToPixels(20), percentToPixels(20));
    
    // draw the xp and level
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.fillText('XP: ' + pixelPal.xp, 5, 15);
    ctx.fillText('Level: ' + pixelPal.level, 5, 30);
}
