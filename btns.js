//Estos eventos son los que no sé como aplicar
//Delete clic event
	$('.clsDelete').on('click', function () {
		var strDelete = $(this).data('dUser');

		if (confirm('Are you sure you want delete?' + strDelete)) {
			var users = Users.tbUsrs();
                users.splice(strDelete.username, 1);
                localStorage.setItem("tbUsers", JSON.stringify(users));
			//charge the list of the users
			Users.AllUsers();
		}
	});
	//Edit clic event
	$('.clsEdit').bind('click', function () {
		var strEdit = $(this).data('dUser');
        
		$('#username').innerhtml = strEdit.username, $('#password').innerhtml = strEdit.password, $('#retypePassword').innerhtml = strEdit.password;
		//Users.AllUsers();
	});
