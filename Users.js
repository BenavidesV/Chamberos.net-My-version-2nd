var Users = {
    tbUsrs: function () {
        var tbUsers = localStorage.getItem("tbUsers");
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
                var users = listUsers[i];
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
    							$('<button>', {
    								type: 'button',
    								class: 'clsDelete',
    								value: 'Delete',
                                    onclick: 'Users.Delete(this)',
                                    name:users.User,
                                    dUser: i
    							}).append($('<img src="delete.png">')),
                         
                                $('<button>', {
    								type: 'button',
    								class: 'clsEdit',
    								value: 'Edit',
                                    onclick: 'Users.Charge(this)',
                                    name:users.User,
                                    dUser: i,
    							}).append($('<img src="edit.png">')) //The image to identify
    							)
    						)
    					);
                 }
          }
    },
    //When creates a new user
    User: function () {
        var $tempUser = $('#username'), $tempPass = $('#password');
        var tempUsers = Users.tbUsrs();
        this.User=$tempUser.val();
        this.Password= $tempPass.val();      
        tempUsers.push(this);
        localStorage.setItem("tbUsers", JSON.stringify(tempUsers));
        alert('User Saved');
        document.location=('users.html');
       
    },
    //To save changes
    Save: function(position){
        //position=$('#saveChanges').val();
        var users = Users.tbUsrs();
        for (var index = 0; index < users.length; index++) {
            if (position == index) {
                var eUser = {User: $("#editUsername").val(), Password: $("#editPassword").val()};
                users.splice(index, 1,eUser); 
            }
        }
        localStorage.setItem("tbUsers", JSON.stringify(users));
        alert('User Modified');
        document.location=('users.html');
    },
    Charge: function (btn) {
        window.location.replace("#modal2");
        var strEdit = btn.getAttribute('duser');
        $('#saveChanges').val(strEdit);
        var users = Users.tbUsrs();
        for (var index = 0; index < users.length; index++) {
            if (strEdit == index) {
                $("#editUsername").val(btn.getAttribute('name'));
                $("#editPassword").val(users[index].Password);
                $("#editRetypePassword").val(users[index].Password);
            }
        }
    },

    Delete: function(btn){
        var strDelete = btn.getAttribute('duser');
 
	    if (confirm('Are you sure you want delete '+ btn.getAttribute('name')+' ?' )) {
		var users = Users.tbUsrs();
        for (var index = 0; index < users.length; index++) {
            console.log(strDelete);
            console.log(users[index].User+"-"+users[index]["User"]);
            if (index==strDelete) {
                users.splice(index, 1);                
            }   
        }
		localStorage.setItem("tbUsers", JSON.stringify(users));
		//charge the list of the users
		Users.AllUsers();
    }},
    Verification: function(edit){
        var position= $('#saveChanges').val();
        var $tempUser='';
        var $tempPass='';
        var $tempConfirmation='';
        if (!edit) {
           $tempUser = $('#username'), $tempPass = $('#password'), $tempConfirmation=$('#retypePassword');
        }else{
           $tempUser = $('#editUsername'), $tempPass = $('#editPassword'), $tempConfirmation=$('#editRetypePassword');
        }
		if ($.trim($tempUser.val()) != '' && $.trim($tempPass.val())!= '') {
            if ($tempPass.val()==$tempConfirmation.val()) {
                if (edit) {
                    Users.Save(position);
                }else{
                    Users.User();
                }
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
};
$(document).ready(function () {
    Dashboard.Logged();
    Users.AllUsers();
});
