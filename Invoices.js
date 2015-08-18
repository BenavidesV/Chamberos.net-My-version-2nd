var Invoices = {
    tbInvoices: function () {
        var tbInvoices = localStorage.getItem("tbInvoices");
        tbInvoices = JSON.parse(tbInvoices);
        if (tbInvoices == null) {
            tbInvoices = [];

        }
        return tbInvoices;
        
    },
    AllInvoices: function () {
        var $objTable = $('#tbInvoices').find('tbody');
        $objTable.empty();
        var list = Invoices.tbInvoices();
        if (list.length==0) {
            $objTable.append(
				$('<tr>').append(
					$('<td>', {
						text: 'Not invoices registered',
						colspan: 5,
						align: 'center'
					})
					)
				);
            
        }else{
            
            for (var i in list) {
                var invoices = list[i];
                //create a new row
                
    				$objTable.append(
    					$('<tr>').append(
    						$('<td>', {
    							text: invoices.Client,
    							align: 'left'
    						}),
    						$('<td>', {
    							text: invoices.Description,
    							align: 'left'
    						}),
                            $('<td>', {
    							text: invoices.Date,
    							align: 'left'
    						}),
                            $('<td>', {
    							text: invoices.Mount,
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
                                    onclick: 'Invoices.Delete(this)',
                                    dInvoice: i
    							}).append($('<img src="delete.png">')),
                         
                                $('<button>', {
    								type: 'button',
    								class: 'clsEdit',
    								value: 'Edit',
                                    onclick: 'Invoices.Charge(this)',
                                    dInvoice: i,
    							}).append($('<img src="edit.png">')) //The image to identify
    							)
    						)
    					);
                 }
          }
    },
    //When creates a new invoice
    Invoice: function () {
        var $tClient = $('#client'), $tDescription = $('#description'), $tDate = $('#date'), $tMount = $('#mount');
        var tempInvoices = Invoices.tbInvoices();
        //Set the attributes of the new invoice
        this.Client=($tClient.val());
        this.Description= $tDescription.val();
        this.Date=($tDate.val());
        this.Mount=($tMount.val());
        tempInvoices.push(this);
        localStorage.setItem("tbInvoices", JSON.stringify(tempInvoices));
        alert('Invoice Saved');
        document.location=('invoices.html');
       
    },
    //To save changes
    Save: function(position){
        //position=$('#saveChanges').val();
        var invoices = Invoices.tbInvoices();
        for (var index = 0; index < invoices.length; index++) {
            if (position == index) {
                var eInvoice = ({Client: $("#editClient").val(), Description: $("#editDescription").val(), 
                    Date: $("#editDate").val(), Mount: $("#editMount").val()});
                invoices.splice(index, 1,eInvoice); 
            }
        }
        localStorage.setItem("tbInvoices", JSON.stringify(invoices));
        alert('Invoice Modified');
        document.location=('invoices.html');
    },
    Charge: function (btn) {
        window.location.replace("#modal2");
        var strEdit = btn.getAttribute('dInvoice');
        $('#saveChanges').val(strEdit);
        var invoices = Invoices.tbInvoices();
        for (var index = 0; index < invoices.length; index++) {
            var inv =invoices[index];
            if (strEdit == index) {
                $("#editClient").val(inv.Client);
                $("#editDescription").val(inv.Description);
                $("#editDate").val(inv.Date);
                $("#editMount").val(inv.Mount);
            }
        }
    },

    Delete: function(btn){
        var strDelete = btn.getAttribute('dInvoice');
 
	    if (confirm('Are you sure you want delete this invoice?' )) {
		var invoices = Invoices.tbInvoices();
        for (var index = 0; index < invoices.length; index++) {
            console.log(strDelete);
            if (index==strDelete) {
                invoices.splice(index, 1);                
            }   
        }
		localStorage.setItem("tbInvoices", JSON.stringify(invoices));
		//charge the list of invoices
		Invoices.AllInvoices();
    }},
    Verification: function(edit){
        var position= $('#saveChanges').val();
        var $tempClient='';
        var $tempDescription='';
        var $tempDate='';
        var $tempMount='';
        if (!edit) {
           $tempClient = $('#client'), $tempDescription = $('#description'), $tempDate=$('#date'), $tempMount=$('#mount');
        }else{
            $tempClient = $('#editClient'), $tempDescription = $('#editDescription'), $tempDate=$('#editDate'), $tempMount=$('#editMount');
        }
		if ($.trim($tempClient.val()) != '' && $.trim($tempDescription.val())!= ''
            && $.trim($tempDate.val()) != ''&&$.trim($tempMount.val()) != '') {
                if (edit) {
                    Invoices.Save(position);
                }else{
                    Invoices.Invoice();
                }
		} else {
			if ($.trim($tempClient.val()) == '') {
				alert('Select the client from the list. Please');
				$tempId.val('').focus();
			} else {
				alert('Please review the information. All fields are required');
			}}
            Invoices.AllInvoices();
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
    Invoices.AllInvoices();
    Invoices.FillDataList();
});
