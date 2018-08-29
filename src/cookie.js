// Returns the value of the cookie
// specified by the given cookie name (cname)
// If invalid cookie name is given returns ""
export function getCookie(cname) {
	console.log("inside getCookie()");
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return JSON.parse(c.substring(name.length, c.length));
		}
	}
	return "";
}

// Sets the cookie with given values
// cname - cookie name
// cvalue - cookie value
// exsecs - cookie life amounts in seconds
export function setCookie(cname, cvalue, exsecs) {
	var d = new Date();
	d.setTime(d.getTime() + exsecs*1000)
	var expires = d.toUTCString();
	let cookieObj = {
		"value" : cvalue,
		"expDate" : expires
	}

	document.cookie = cname + "=" + JSON.stringify(cookieObj) + ";expires=" + expires + ";path=/";
}

// Deletes the cookie  of the specified path
// Sets expiration date to passed date to delete cookie
export function deleteCookie() {
	console.log("Deleting cookie");
	document.cookie = "id_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
