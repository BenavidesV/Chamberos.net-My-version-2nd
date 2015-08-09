function validateUser() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var errorElement = document.getElementById('error_msg')
	
	if (username == 'admin' && password == '$uper4dmin') {
		console.log('logged in');
		errorElement.setAttribute("style", "display:none;");
		window.location.href = 'dashboard.html';

	} else {
		errorElement.innerHTML = 'Username or Password invalid';
		errorElement.setAttribute("style", "display:block;");
	}
}
/*To show the information when a change is applied*/
function showNews() {
	var msg = document.getElementById('new_msg');
	msg.innerHTML = 'Client added successfuly';
	msg.setAttribute("style", "display:block;");
}
function showForm() {
	var form=$('#personalInfo');
	form.show();
 
}