import { createTable, createDiv } from "./DOMFunction.js"



export function searchFunction(){
	var error = document.getElementById("errorMess")
	if (error != null){
		error.parentNode.removeChild(error)
	}
	var searchVal = document.getElementById("Input").value
	var url = `https://api.iextrading.com/1.0/stock/${searchVal}/company`;
	console.log("MY URL", url);
	createTable("stockTable", "contentItems")
	let dispStock = document.getElementById("stockTable")

	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';

	request.onload = function() {
		var resp = request.response;
		console.log("GOT", resp);

		if (resp == null){
			var s_table = document.getElementById("stockTable")
			if (s_table != null){
				s_table.parentNode.removeChild(s_table);
			}
			createDiv("errorMess", "error", "contentItems")
			document.getElementById("errorMess").innerHTML = "<h2> Invalid " +
			"Corporation Symbol </h2>";
		}
		var tblLen = dispStock.rows.length;
		var respKeys = Object.keys(resp);
		for(var i = 0; i < respKeys.length; i++) {

			if(tblLen === 0) {
				var row = dispStock.insertRow(i);
				row.className = "tBodyRow"
				row.insertCell(0).innerHTML = respKeys[i];
				row.insertCell(1).innerHTML = resp[respKeys[i]];
			} else if (tblLen === respKeys.length) {
				dispStock.rows[i].cells[1].innerHTML = resp[respKeys[i]];
			}
		}
	};

	request.send()
}
