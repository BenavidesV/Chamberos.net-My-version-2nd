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
/*To show the information when a change is applied*/
function otherUser() {
	var listUsers = localStorage.getItem("tbUsers");
	listUsers = JSON.parse(listUsers);
	var user = document.getElementById('username').value;
	var pass = document.getElementById('password').value;

	for (var index = 0; index < listUsers.length; index++) {
		if (listUsers[index].user == user && listUsers[index].password == pass) {
			return true;
		}
	}
	return false;
}
