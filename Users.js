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
                                    onclick:'Users.Delete()',
    								value: 'Delete',
                                    id:'Delete'
    							}), $('<input>', {
    								type: 'button',
    								class: 'clsEdit',
                                    onclick:'Users.Edit()',
    								value: 'Edit',
                                    id: 'addUser' //to display the modal window
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
    //This funtions creates the index to modify or delete the user
    DeleteUsers: function (etiqueta) {
        var deletes = $(".Delete");
        for (var i = 0; i < deletes.length; i++)
        {
            if (deletes[i] === etiqueta) {
                localStorage.setItem("Index", i);

            }
        }
    },
    EditUsers: function (etiqueta) {
        var Edits = $(".Edit");
        for (var i = 0; i < Edits.length; i++)
        {
            if (Edits[i] === etiqueta) {
                localStorage.setItem("Index", i);

            }
        }
    },
    Delete: function () {
        if (confirm('Are you sure you want delete this user?')){
        var users = Users.tbUsrs();
        var index = parseInt(localStorage.getItem("Index"));
        users.splice(index, 1);
        localStorage.setItem("tbUsers", JSON.stringify(users));
        }
        Users.AllUsers();
    },
    Edit:function() {
        var users = Users.tbUsrs();
        var index = parseInt(localStorage.getItem("Index"));
        users[index]=JSON.stringify({User: $("#username").val(), Password: $("#password").val()});
        localStorage.setItem("tbUsers", JSON.stringify(users));
    }
};
/*
$('.clsDelete').on('click', function () {
	var strDelete = $(this).data('dUser');
	if (confirm('Are you sure you want delete'+strDelete+' ?')) {
		var users = Users.tbUsrs();
        users.splice(strDelete, 1);
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
*/
$(document).ready(function () {
    Users.AllUsers();})