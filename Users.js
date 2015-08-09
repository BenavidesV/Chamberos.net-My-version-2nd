var Users = {
    tbUsrs: function () {
        tbUsers = localStorage.getItem("tbUsers");
        tbUsers = JSON.parse(tbUsers);
        if (tbUsers == null) {
            tbUsers = [];

        }
        return tbUsers;
        
    },
    AllUsers: function () {
        var $objUsersTable = $('#tblUsers').find('tbody');
        $objUsersTable.empty();
        var listUsers = Users.tbUsrs();
        if (listUsers.length==0) {
            $objUsersTable.append(
				$('<tr>').append(
					$('<td>', {
						text: 'Not users registered',
						colspan: 3,
						align: 'center'
					})
					)
				);
            
        }else{
            for (var i in listUsers) {
                var users = JSON.parse(listUsers[i]);
                //create a new row
    				$objUsersTable.append(
    					$('<tr>').append(
    						$('<td>', {
    							text: users.User,
    							align: 'left'
    						}),
    						$('<td>', {
    							text: users.Password,
    							align: 'left'
    						}),
    						$('<td>', { //row with the option buttons
    							align: 'center',
    							width: 150
    						}).append(//to add the buttons
    							$('<input>', {
    								type: 'button',
    								class: 'clsDelete',
    								value: 'Delete',
    							}), $('<input>', {
    								type: 'button',
    								class: 'clsEdit',
    								value: 'Edit',
                                    id: 'addUser'
    							}).data('dUser', users.User) //save the user that could be deleted
    							)
    						)
    					);
                 }
          }
        


    },
    AddUsers: function () {
        var tempUsers = Users.tbUsrs();
        
        var $tempUser = $('#username'), $tempPass = $('#password'), $tempConfirmation=$('#retypePassword');

		if ($.trim($tempUser.val()) != '' && $.trim($tempPass.val())!= '') {
            if ($tempPass.val()==$tempConfirmation.val()) {            
    			var newUser = JSON.stringify({User: $("#username").val(), Password: $("#password").val()});
                tempUsers.push(newUser);
                localStorage.setItem("tbUsers", JSON.stringify(tempUsers));
                alert("User Saved");
            }else{
                alert('The password and the confirmation must be equals');
				$tempPass.val('').focus();
            }
		} else {
			if ($.trim($tempUser.val()) == '') {
				alert('Write the username. Please');
				$tempUser.val('').focus();
			} else {
				alert('Please type the password');
				$tempPass.val('').focus();
			}}
            closeModal();
            Users.AllUsers();
    },
};
//Delete clic event
	$('.clsDelete').on('click', function () {
        alert('Hola');
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

$(document).ready(function () {
    Users.AllUsers();})