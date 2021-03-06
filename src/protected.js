import { createTable, createDiv, createParagraph, getCookie} from "./DOMFunction.js"

export function protectedContent(){
	console.log("inside protectedContent()");


	createDiv("temp", "text")
	createParagraph("display", "temp");
	createTable("petsTable", "temp");

	document.getElementById("display").innerHTML = "<h2>PROTECTED CONTENT " +
	"ACCESS GRANTED</h2><br><h4> You can now view and buy pets</h4>";

	let dispTblPet = document.getElementById("petsTable");
	var url = "https://api-dev.calpoly.edu/pets";
	const headers = new Headers();
	const key = getCookie("id_token")
	headers.append('Content-Type', 'application/json');
	// headers.append('Authorization', `Bearer ${key}`);
	headers.append('Authorization', `Bearer ${key}`);

	fetch(url, {headers: headers, mode : "cors"}).then(function(response){
		return response.json();
	})
	.then(function(petsJson){
		var keys = Object.keys(petsJson);
		var petKeys = Object.keys(petsJson[0]);
		for(var key in keys) {
			var petJson = petsJson[key]
			var row = dispTblPet.insertRow();
			row.className = "tBodyRow"
			for(var petKey in petKeys) {
				var keyName = petKeys[petKey]
				row.insertCell().innerHTML = petJson[keyName]
			}
		}

		row = dispTblPet.createTHead().insertRow(0);
		row.className = "thRow"
		for (petKey in petKeys) {
			row.insertCell().innerHTML = '<b>' + petKeys[petKey] + '</b>'
		}
	})
	return;
}
