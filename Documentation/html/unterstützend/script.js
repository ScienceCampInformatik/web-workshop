var name = "Lena";
var list = [];

function zeigeName(){
		document.getElementById("name").textContent = name;
}

function aendereName(){
		name = prompt("Aendere den Namen!","Gib hier Namen an");
}

function aendereHintergrund(){
	var wahl = document.getElementById("hintergrundWechsler").value
	
	if(wahl === "blumen"){
		document.querySelector("body").style.backgroundImage = "url(bilder/hintergrund/blumen.png)";
		document.querySelector("body").style.backgroundSize = "auto";

	}else{
		document.querySelector("body").style.backgroundImage = "url(bilder/hintergrund/pink-blau.png)";
		document.querySelector("body").style.backgroundSize = "cover";
	}
}

function essenHinzufuegen(){
	var essen = prompt("Gebe ein Essen ein, das du gerne isst.", "Pizza!");
	list.push(essen);
	zeigeEssen();
}
function zeigeEssen() {
    var ul = document.getElementById("essen");
    while( ul.firstChild ){
        ul.removeChild( ul.firstChild );
    }
	for(var essen in list ){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(list[essen]));
        ul.appendChild(li);
	}
}
function loescheEssen(){
	list = [];
	zeigeEssen();
}

