var Clients = {
    tbClients: function () {
        var tbClients1 = localStorage.getItem("tbClients");
        tbClients1 = JSON.parse(tbClients1);
        if (tbClients1 == null) {
            tbClients1 = [];

        }
        
        return tbClients1;
        
    },
    AllClients: function () {
        var $objTable = $('#tbClients').find('tbody');
        $objTable.empty();
        var list = Clients.tbClients();
        if (list.length==0) {
            $objTable.append(
				$('<tr>').append(
					$('<td>', {
						text: 'Not clients registered',
						colspan: 4,
						align: 'center'
					})
					)
				);
            
        }else{
            
            for (var i in list) {
                var clients =list[i];
                //create a new row
                
    				$objTable.append(
    					$('<tr>').append(
    						$('<td>', {
    							text: clients.Id,
    							align: 'left'
    						}),
    						$('<td>', {
    							text: clients.Fullname,
    							align: 'left'
    						}),
                            $('<td>', {
    							text: clients.Phone,
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
                                    onclick: 'Clients.Delete(this)',
                                    name:   clients.Fullname,
                                    dClient: i
    							}).append($('<img src="delete.png">')),
                         
                                $('<button>', {
    								type: 'button',
    								class: 'clsEdit',
    								value: 'Edit',
                                    onclick: 'Clients.Charge(this)',
                                    name: clients.Fullname,
                                    dClient: i,
    							}).append($('<img src="edit.png">')) //The image to identify
    							)
    						)
    					);
                 }
          }
    },
    //When creates a new user
    Client: function () {
        var $tId = $('#id'), $tFullname = $('#fullname'), $tPhone = $('#phone');
        var tempClients = Clients.tbClients();
        //Set the attributes of the new client
        this.Id=($tId.val());
        this.Fullname= $tFullname.val();
        this.Phone=($tPhone.val());      
    	// var newClient =JSON.stringify(this);
        tempClients.push(this);
        localStorage.setItem("tbClients", JSON.stringify(tempClients));
        alert('Client Saved');
        document.location=('clients.html');
       
    },
    //To save changes
    Save: function(position){
        //position=$('#saveChanges').val();
        var clients = Clients.tbClients();
        for (var index = 0; index < clients.length; index++) {
            if (position == index) {
                var eClient = {Id: $("#editId").val(), Fullname: $("#editFullname").val(), Phone: $("#editPhone").val()};
                clients.splice(index, 1,eClient); 
            }
        }
        localStorage.setItem("tbClients", JSON.stringify(clients));
        alert('Client Modified');
        document.location=('clients.html');
    },
    Charge: function (btn) {
        window.location.replace("#modal2");
        var strEdit = btn.getAttribute('dClient');
        $('#saveChanges').val(strEdit);
        var clients = Clients.tbClients();
        for (var index = 0; index < clients.length; index++) {
            if (strEdit == index) {
                var client =  clients[index]// JSON.parse(clients[index]);
                $("#editFullname").val(btn.getAttribute('name'));
                $("#editPhone").val(client.Phone);
                $("#editId").val(client.Id);
            }
        }
    },

    Delete: function(btn){
        var strDelete = btn.getAttribute('dClient');
 
	    if (confirm('Are you sure you want delete '+ btn.getAttribute('name')+' ?' )) {
		var clients = Clients.tbClients();
        for (var index = 0; index < clients.length; index++) {
            console.log(strDelete);
            if (index==strDelete) {
                clients.splice(index, 1);                
            }   
        }
		localStorage.setItem("tbClients", JSON.stringify(clients));
		//charge the list of the users
		Clients.AllClients();
    }},
    Verification: function(edit){
        var position= $('#saveChanges').val();
        var $tempId='';
        var $tempFullname='';
        var $tempPhone='';
        if (!edit) {
           $tempId = $('#id'), $tempFullname = $('#fullname'), $tempPhone=$('#phone');
        }else{
           $tempId = $('#editId'), $tempFullname = $('#editFullname'), $tempPhone=$('#editPhone');
        }
		if ($.trim($tempId.val()) != '' && $.trim($tempFullname.val())!= '') {
                if (edit) {
                    Clients.Save(position);
                }else{
                    Clients.Client();
                }
		} else {
			if ($.trim($tempId.val()) == '') {
				alert('Write the ID. Please');
				$tempId.val('').focus();
			} else {
				alert('Please type the fullname');
				$tempFullname.val('').focus();
			}}
            Clients.AllClients();
    },
};
$(document).ready(function () {
    Clients.AllClients();
    Dashboard.Logged();
});
