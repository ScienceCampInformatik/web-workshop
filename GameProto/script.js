var name = "Lena";

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
