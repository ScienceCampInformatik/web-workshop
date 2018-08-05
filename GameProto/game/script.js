////////////////////////////////////////////////////////////
//
// benötigte Globale Variablen
//
///////////////////////////////////////////////////////////
var redGamePiece; // Spieler
var runningGamePieces = []; //Liste der Geschosse
var opponentGamePieces = []; //Liste der Gegner
var canvasXSize = 600; // Spielfeld X größe => width
var canvasYSize = 300; // Spielfeld Y größe => height
var lastUpdate = 0; //wie lang ist das Letzte Update des Spielfelds her
var updateFrequency = 20; //Wie oft soll das Spielfeld aktualisiert werden
var opponentFrequency = 100; //Wann soll der nächste Gegener kommen
var maxOpponentFrequency = 250; //max Dauer bis der nächste Gegener kommt
var minOpponentFrequency = 100; //minimale Dauer bis der nächste Gegener kommt
var score = 0; //der Score
var myScore; //Komponente die den Score anzeigt
var frameNumber = 0; //Anzahl der Aktualisierungen seit dem letzten neuen Gegener
var interval; //Interval für Aktualisierungen
var canvas; // das Spielfeld
var context; // der Kontext des Spielfelds der drauf zeichnen etc ermöglicht
///////////////////////////////////////////////////////////////
//
// Spielinitialisierung, initialisierung des Feldes, start und stop
//
/////////////////////////////////////////////////////////////

function paintGame(){
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");
  startGame();
}

function startGame() {
  //setze alle Werte und das Spielfeld zurück (clear, runningGamePieces und opponentGamePieces auf leere Liste, score auf 0)

  //erstelle den spieler (redGamePiece) mit 20x20 größe in rot (red) bei (50,50)

  //Erstelle die Komponente die den Score anzeigt namens myScore (textComponent, 30px, Schriftart Consolas, Farbe schwarz, x=280 y=40, Score als Text

  //initialisiere Keys
  //initKeyHandling();
  //starte die Gameloop
}

function stopInterval(){
  clearInterval(interval);
}

function clear(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}
function startInterval(){
  frameNumber = 0;
  interval = setInterval(updateGameArea, 1);
}


fnction restartGame() {
	stopInterval();
	startGame();
}

///////////////////////////////////////////////////////////////////////
//
// Hilfsmethoden zur Gegner erzeugung und für Zufall!
//
//////////////////////////////////////////////////////////////////////
//erzeugt einen zufälligen Gegner
function spawnOpponent() {
  //zufällige Geschwindigkeit zwischen 0.8 und 4
	var opponentSpeed = random(0.8, 4);
  //zufällige Größe zwischen 10 und 40
	var opponentSize = random(10, 40);
  //zufälliger Startort auf der y-Achse zwischen 0 und dem Rand (da links oben immer die "gemerkten" Koordinaten sind, muss die Größe des Elements abgzogen werden)
	var opponentY = random(0, canvasYSize-opponentSize);
  //erzeugen des zugehörigen Objects
	var opponent = new component(opponentSize, opponentSize, "blue", canvasXSize, opponentY);
  //setzen der Geschwindigkeit
	opponent.speedX -= opponentSpeed;
  //Liste der Gegner hinzufügen
	opponentGamePieces.push(opponent);
}

//Gibt eine Zufällige Zahl zwischen mit und max, (inkl min und max)
function random(min, max) {
	 //TODO
}


//////////////////////////////////////////////////////////////////////////
//
// Objekttypen die Benötigt werden
//
///////////////////////////////////////////////////////////////////////////

//Erzeugt eine Komponente mit verschiedenen Attributen
//WIDTH := die Breite
//HEIGHT := die höhe des Objects
//width und height sind für Spielsteine immer gleich da quadratisch
//COLOR := Farbe die das Object haben soll
//x: die x Koordinate auf dem canvas
//y: die y Koordinate auf dem canvas
function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
	this.color = color;
	this.speedY = 0;
	this.speedX = 0;

  //Eine komponente hat neben verschiedener Attribute auch Funktionen die man aufrufen kann
  //Hier: update
  //Aufgabe: 1. aktualisiert den Standort der Komponente anhand der Geschwindigkeit
  //         2. zeichnet das Objekt auf das Spielfeld
  this.update = function(){
    this.y += this.speedY;
    this.x += this.speedX;
    //zeichnet quadrat auf Spielfeld
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);

  },
  //Funktion die überprüft ob die aktuelle Komponente mit einer bestimmten anderen Komponente
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

//Erzeugt eine Komponente mit verschiedenen Attributen welche einen Text hat
//TEXTSIZE := Schriftgröße
//FONT := Schriftart
//COLOR := Farbe die der Text haben soll
//x: die x Koordinate auf dem canvas
//y: die y Koordinate auf dem canvas
//Koordinate ist immer die obere Linke ecke
function textComponent(textSize, font, color, x, y, text) {
  this.textSize = textSize;
  this.font = font;
  this.x = x;
  this.y = y;
	this.color = color;
  this.text = text;
  this.update = function(){
    context.font = this.textSize + " " + this.font;
    context.fillStyle = this.color;
    context.fillText(this.text, this.x, this.y);
  }

}

////////////////////////////////////////////////////////////////////////////////
//
//Spielfeld aktualisierung
//Wird in Schleife sehr oft aufgerufen um das Spielfeld zu akutalisieren
//Herz der Spiellogik => zeichnet Spieler, Gegener, prüft auf Crashs,
//aktualisiert den Score...
//
///////////////////////////////////////////////////////////////////////////////
function updateGameArea() {
  //aktualisiert das Spielfeld nur innerhalb der updateFrequenz
	var currentTime = new Date().getTime();
	if(currentTime - lastUpdate < updateFrequency) {
		return;
	}
	lastUpdate = currentTime;



  //Lösche alles vom Spielfeld

  //aktualisiert den Standort und zeichnet den Spieler (redGamePiece, funktion update())

  //Leere Listen der aktualisierten Objekte
	var newRunningGamePieces = [];
	var newOpponentGamePieces = [];

  //aktuallisert alle Gegner
	for(var i = 0; i<opponentGamePieces.length; i++) {
		var opponentPiece = opponentGamePieces[i];
    //überprüfe ob der Angreifer am linken Rand ist

    //überprüfe ob der Angreifer gegen den Spieler gestoßen ist


    //überprüfe ob ein Geschoss einen Gegner getroffen hat
		var crashed = false;
    //Führt das für jedes Geschoss durch
		for(var j = 0; j<runningGamePieces.length; j++) {
			var piece = runningGamePieces[j];
      //prüft ob das aktuelle geschoss (piece) vorliegt, und wenn ja ob es mit dem aktuellen Gegner (opponentPiece) zussamenstößt

      //wenn ja speicher das es einen crash gab, setze den score und lösche den Gegner
		}
		if(!crashed) {
			  //wenn nicht getroffen wurde aktuallisere den Standort und zeichne neu und füge es zu einer Liste der aktuellen gegner hinzu
		}
	}
  //ersetze die Liste der Gegner mit der neuen Liste der Gegner

  //aktuallisert alle Geschosse
	for(var i = 0; i<runningGamePieces.length; i++) {
		var piece = runningGamePieces[i];

    //ist das Geschoss NULL (=> nicht mehr da weil es zb einen Gegner getroffen hat)? wenn ja gehe zum nächsten

    //ist das Geschoss noch im Bild?

    //wenn ja updaten und in die aktuelle Liste der Geschosse speichern

	}
  //ersetze die alte Liste durch die aktualisierte

  //speichere aktuallisierung
	frameNumber += 1;

  //ist die Anzahl der Aktuallisierungen größer gleich der Zahl nach der ein neuer Gegner gespawnt werden soll (opponentFrequency), wird der neue Gegner gespawnt
	if(frameNumber >= opponentFrequency) {
    //erzeugt den Gegener
		spawnOpponent();
    //senkt max dauer bis zum nächsten Gegner
		maxOpponentFrequency -= 2;
    //setzt zufällig zwischen min und max die Anzahl der akualisierungen bis der nächste Gegner gespawnt werden soll
    opponentFrequency = random(minOpponentFrequency, maxOpponentFrequency);
    //resette die Anzahl der Aktualisierungen
		frameNumber = 0;
	}

  //setzt bei der Score Komponente den score und zeichnet es neu.
	myScore.text = score;
	myScore.update();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Tastatursteuerung
//
///////////////////////////////////////////////////////////////////////////////////////


//schießt eine Komponente weg.
//Dieser hat Geschwindigkeit 5
//Fügt die gerschossene Komponente in eine Liste ein, damit diese gesammelt aktualisiert werden.
function shoot() {
	var shot = new component(redGamePiece.width, redGamePiece.height, redGamePiece.color, redGamePiece.x, redGamePiece.y);
	shot.speedX = 5;
	runningGamePieces.push(shot);
}

//started die hochbewegung in dem eine negative Geschwindigkeit gesetzt wird
function startUp() {
	redGamePiece.speedY = -3;
}
//Wird die hoch oder Runter taste losgelassen wird die Geschwindigkeit wieder auf 0 gesetzt, das Objekt bewegt sich also nicht mehr.
function release() {
	redGamePiece.speedY = 0;
}
//started die runter bewegung in dem eine positive Geschwindigkeit gesetzt wird
function startDown() {
	redGamePiece.speedY = 3;
}

function initKeyHandling(){
  //Wenn der Key runter gedrückt wird, wird die Geschwindigkeit verändert oder direkt geschossen
  document.onkeydown = function(event) {
    if(event.keyCode == 38) {//UP
      startUp();
    } else if(event.keyCode == 40) {// Down
      startDown();
    } else if(event.keyCode == 32) {//Leertaste
      shoot();
    }
  }
  //wird die Taste losgelassen wird die geschwindigkeit auf 0 gesetzt
  document.onkeyup = function(event) {
    if(event.keyCode == 38 || event.keyCode == 40) {
      release();
    }
  }
}
