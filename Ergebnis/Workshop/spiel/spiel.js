var redGamePiece;
var runningGamePieces = [];
var opponentGamePieces = [];
var canvasXSize = 500;
var canvasYSize = 300;
var lastUpdate = 0;
var updateFrequency = 20;
var opponentFrequency = 100;
var maxOpponentFrequency = 250;
var minOpponentFrequency = 50;
var score = 0;
var myScore;

function paintGame() {
myGameArea.paint();
}

function stopGame() {
myGameArea.stopInterval();
}

function startGame() {
if(!myGameArea.painted) {
paintGame();
}
myGameArea.clear();
runningGamePieces = [];
opponentGamePieces = [];
score = 0;
maxOpponentFrequency = 250;
minOpponentFrequency = 50;
redGamePiece = new component(20, 20, "red", 50, 50);
myScore = new component("30px", "Consolas", "black", 280, 40, "text");


document.onkeydown = function(event) {
if(event.keyCode == 38) {
  startUp();
} else if(event.keyCode == 40) {
  startDown();
} else if(event.keyCode == 32) {
  shoot();
}
}

document.onkeyup = function(event) {
if(event.keyCode == 38 || event.keyCode == 40) {
  release();
}
}

myGameArea.start();
}

function restartGame() {
stopGame();
startGame();
}

var myGameArea = {
canvas : document.getElementById("canvas"),
paint : function() {
this.canvas.width = canvasXSize;
    this.canvas.height = canvasYSize;
    this.context = this.canvas.getContext("2d");
this.painted = true;
},
start : function() {
if(!this.painted) {
  this.paint();
}
this.frameNumber = 0;
    this.interval = setInterval(updateGameArea, 1);
},
stopInterval : function() {
clearInterval(this.interval);
},
clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
}

function spawnOpponent() {
var opponentSpeed = random(0.1, 4);
var opponentSize = random(redGamePiece.width / 2, redGamePiece.width * 2);
var opponentY = random(0, canvasYSize-opponentSize);
var opponent = new component(opponentSize, opponentSize, "blue", canvasXSize, opponentY);
opponent.speedX -= opponentSpeed;
opponentGamePieces.push(opponent);
}

function random(min, max) {
return Math.random()*(max-min+1)+min;
}

function component(width, height, color, x, y, type) {
this.width = width;
this.height = height;
this.x = x;
this.y = y;
this.color = color;
this.type = type;
this.speedY = 0;
this.speedX = 0;

this.update = function(){
this.y += this.speedY;
this.x += this.speedX;
    ctx = myGameArea.context;
if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    } else {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}
},
this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
    }
    return crash;
}
}

function shoot() {
var shot = new component(redGamePiece.width, redGamePiece.height, redGamePiece.color, redGamePiece.x, redGamePiece.y);
shot.speedX = 5;
runningGamePieces.push(shot);
}

function startUp() {
redGamePiece.speedY = -3;
}

function release() {
redGamePiece.speedY = 0;
}

function startDown() {
redGamePiece.speedY = 3;
}

function updateGameArea() {
var currentTime = new Date().getTime();
if(currentTime - lastUpdate < updateFrequency) {
return;
}

lastUpdate = currentTime;
myGameArea.clear();
redGamePiece.update();

var newRunningGamePieces = [];
var newOpponentGamePieces = [];

for(var i = 0; i<opponentGamePieces.length; i++) {
var opponentPiece = opponentGamePieces[i];
if(opponentPiece.x <= 0) {
  opponentPiece.update();
  stopGame();
  continue;
}

if(opponentPiece.crashWith(redGamePiece)) {
  opponentPiece.update();
  stopGame();
  continue;
}

var crashed = false;
for(var j = 0; j<runningGamePieces.length; j++) {
  var piece = runningGamePieces[j];
  if(piece && opponentPiece.crashWith(piece)) {
    runningGamePieces[j] = null;
    crashed = true;
    score += 10;
    minOpponentFrequency -= 1;
    break;
  }
}

if(!crashed) {
  opponentPiece.update();
  newOpponentGamePieces.push(opponentPiece);
}
}
opponentGamePieces = newOpponentGamePieces;

for(var i = 0; i<runningGamePieces.length; i++) {
var piece = runningGamePieces[i];

if(!piece) {
  continue;
}

if(piece.x > canvasXSize) {
  continue;
}

piece.update();
newRunningGamePieces.push(piece);
}
runningGamePieces = newRunningGamePieces;

myGameArea.frameNumber += 1;
if(myGameArea.frameNumber >= opponentFrequency) {
spawnOpponent();
maxOpponentFrequency -= 2;
opponentFrequency = random(minOpponentFrequency, maxOpponentFrequency);
myGameArea.frameNumber = 0;
}

myScore.text = score;
myScore.update();
}
