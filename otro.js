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
    							$('<button><img src="delete.png"></button>', {
    								type: 'button',
    								class: 'clsDelete btn primary',
    								value: 'Delete',
    							}), $('<a href="#modal2"><img src="edit.png"></a>', {
    								type: 'button',
    								class: 'clsEdit btn primary',
    								value: 'Edit'
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
                document.location=('users.html');
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
            Users.AllUsers();
    },
    Charge: function (strEdit) {
        var users = Users.tbUsrs();
        for (var index = 0; index < users.length; index++) {
		if (strEdit==users[index].user) {
            $("#Name").val(users[index].user);
            $("#Password").val(users[index].password);
		}		
	}
        
    },
    Clean: function () {
        $("#Name").val('');
        $("#Password").val('');
    },
};

$(document).ready(function () {
    Users.AllUsers();})