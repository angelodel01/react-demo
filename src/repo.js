import { createTable, createDiv } from "./DOMFunction.js"

export function accessFunction(){
	var input = document.getElementById("Input").value;

	var url = `https://api.github.com/user/repos?access_token=${input}`

	var dispTblGit = document.getElementById("gitRepos");
	var erro = document.getElementById("errorMess");

	if(dispTblGit) {
		dispTblGit.parentNode.removeChild(dispTblGit);
	}
	if(erro) {
		erro.parentNode.removeChild(erro)
	}

	fetch(url).then(function(response){
		return response.json();
	})
	.then(function(repoJson){
		let repoKeys = Object.keys(repoJson);
		if(repoKeys.includes("message")) {
			console.log(repoJson);
			createDiv("errorMess", "error", "contentItems");
			let erro = document.getElementById("errorMess")
			erro.innerHTML = "<h2> Enter valid access token and try again </h2>"
			return
		}

		createTable("gitRepos", "contentItems");
		dispTblGit = document.getElementById("gitRepos");

		for(var repo in repoJson) {
			var row = dispTblGit.insertRow(repo);
			row.className = "tBodyRow"
			row.insertCell(0).innerHTML = repoJson[repo].name;
		}
	})
}
