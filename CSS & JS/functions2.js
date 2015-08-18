function validateUser() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var errorElement = document.getElementById('error_msg')

	if (username == 'admin' && password == '$uper4dmin' || otherUser()) {
		console.log('logged in');
		localStorage.setItem('CurrentUser', username);
		errorElement.setAttribute("style", "display:none;");
		window.location.href = 'dashboard.html';

	} else {
		errorElement.innerHTML = 'Username or Password invalid';
		errorElement.setAttribute("style", "display:block;");
	}
}
/*If the user is not administrador*/
function otherUser() {
	var listUsers = localStorage.getItem("tbUsers");
	listUsers = JSON.parse(listUsers);
	var user = document.getElementById('username').value;
	var pass = document.getElementById('password').value;

	for (var u in listUsers) {
		var usr=listUsers[u];
		if (usr.User == user && usr.Password == pass) {
			return true;
		}
	}
	return false;
}
