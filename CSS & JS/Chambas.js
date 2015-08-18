var Chambas = {
    tbChambas: function () {
        var tbChambas = localStorage.getItem("tbChambas");
        tbChambas = JSON.parse(tbChambas);
        if (tbChambas == null) {
            tbChambas = [];

        }
        return tbChambas;
        
    },
    AllChambas: function () {
        var $objTable = $('#tbChambas').find('tbody');
        $objTable.empty();
        var list = Chambas.tbChambas();
        if (list.length==0) {
            $objTable.append(
				$('<tr>').append(
					$('<td>', {
						text: 'Not chambas registered',
						colspan: 5,
						align: 'center'
					})
					)
				);
            
        }else{
            
            for (var i in list) {
                var chambas = list[i];
                //create a new row
                
    				$objTable.append(
    					$('<tr>').append(
    						$('<td>', {
    							text: chambas.Client,
    							align: 'left'
    						}),
    						$('<td>', {
    							text: chambas.Description,
    							align: 'left'
    						}),
                            $('<td>', {
    							text: chambas.Date,
    							align: 'left'
    						}),
                            $('<td>', {
    							text: chambas.Notes,
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
                                    onclick: 'Chambas.Delete(this)',
                                    dChamba: i
    							}).append($('<img src="delete.png">')),
                         
                                $('<button>', {
    								type: 'button',
    								class: 'clsEdit',
    								value: 'Edit',
                                    onclick: 'Chambas.Charge(this)',
                                    dChamba: i,
    							}).append($('<img src="edit.png">')) //The image to identify
    							)
    						)
    					);
                 }
          }
    },
    //When creates a new chamoice
    Chamba: function () {
        var $tClient = $('#client'), $tDescription = $('#description'), $tDate = $('#date'), $tNotes = $('#notes');
        var tempChambas = Chambas.tbChambas();
        //Set the attributes of the new chamoice
        this.Client=($tClient.val());
        this.Description= $tDescription.val();
        this.Date=($tDate.val());
        this.Notes=($tNotes.val());
        tempChambas.push(this);
        localStorage.setItem("tbChambas", JSON.stringify(tempChambas));
        alert('Chamba Saved');
        document.location=('chambas.html');
       
    },
    //To save changes
    Save: function(position){
        //position=$('#saveChanges').val();
        var chambas = Chambas.tbChambas();
        for (var index = 0; index < chambas.length; index++) {
            if (position == index) {
                var eChamba = ({Client: $("#editClient").val(), Description: $("#editDescription").val(), 
                    Date: $("#editDate").val(), Notes: $("#editNotes").val()});
                chambas.splice(index, 1,eChamba); 
            }
        }
        localStorage.setItem("tbChambas", JSON.stringify(chambas));
        alert('Chamba Modified');
        document.location=('chambas.html');
    },
    Charge: function (btn) {
        window.location.replace("#modal2");
        var strEdit = btn.getAttribute('dChamba');
        $('#saveChanges').val(strEdit);
        var chambas = Chambas.tbChambas();
        for (var index = 0; index < chambas.length; index++) {
            var cham =chambas[index];
            if (strEdit == index) {
                $("#editClient").val(cham.Client);
                $("#editDescription").val(cham.Description);
                $("#editDate").val(cham.Date);
                $("#editNotes").val(cham.Notes);
            }
        }
    },

    Delete: function(btn){
        var strDelete = btn.getAttribute('dChamba');
 
	    if (confirm('Are you sure you want delete this chamba?' )) {
		var chambas = Chambas.tbChambas();
        for (var index = 0; index < chambas.length; index++) {
            console.log(strDelete);
            if (index==strDelete) {
                chambas.splice(index, 1);                
            }   
        }
		localStorage.setItem("tbChambas", JSON.stringify(chambas));
		//charge the list of chambas
		Chambas.AllChambas();
    }},
    Verification: function(edit){
        var position= $('#saveChanges').val();
        var $tempClient='';
        var $tempDescription='';
        var $tempDate='';
        var $tempNotes='';
        if (!edit) {
           $tempClient = $('#client'), $tempDescription = $('#description'), $tempDate=$('#date'), $tempNotes=$('#notes');
        }else{
            $tempClient = $('#editClient'), $tempDescription = $('#editDescription'), $tempDate=$('#editDate'), $tempNotes=$('#editNotes');
        }
		if ($.trim($tempClient.val()) != '' && $.trim($tempDescription.val())!= ''
            && $.trim($tempDate.val()) != ''&&$.trim($tempNotes.val()) != '') {
                if (edit) {
                    Chambas.Save(position);
                }else{
                    Chambas.Chamba();
                }
		} else {
			if ($.trim($tempClient.val()) == '') {
				alert('Select the client from the list. Please');
				$tempId.val('').focus();
			} else {
				alert('Please review the information. All fields are required');
			}}
            Chambas.AllChambas();
    },
    FillDataList: function(){
       var listClients = localStorage.getItem("tbClients");
	   listClients = JSON.parse(listClients);
       var options = '';
       for (var u in listClients) {
           var c=listClients[u];
           options += '<option value="'+c.Fullname+'" />';
       };
       document.getElementById('clients').innerHTML = options;
    }
};
$(document).ready(function () {
    Dashboard.Logged();
    Chambas.AllChambas();
    Chambas.FillDataList();
});
