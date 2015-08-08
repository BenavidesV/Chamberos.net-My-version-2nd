
$(function () {

	$.showListUsers = function () {

		var iTotal = localStorage.length,
			$objUsersTable = $('#tblUsers').find('tbody');
		
		//clean the table's body
		$objUsersTable.empty();

		if (iTotal > 0) {
			//from the list on localstorage
			for (var i = 0; i < iTotal; i++) {
				//create temporal variables from localStorage
				var user = localStorage.key(i),
					pass = localStorage.getItem(localStorage.key(i));
				
				//create a new row
				$objUsersTable.append(
					$('<tr>').append(
						$('<td>', {
							text: user,
							align: 'left'
						}),
						$('<td>', {
							text: pass,
							align: 'left'
						}),
						$('<td>', { //row with the option buttons
							align: 'center',
							width: 60
						}).append(//agregamos a la fila el boton
							$('<input>', {
								type: 'button',
								class: 'clsDelete',
								value: 'Delete',
							}, '<input>', {
									type: 'button',
									class: 'clsEdit',
									value: 'Edit',
								}).data('dUser', user) //save the user that could be deleted
							)
						)
					);

			}
			//If there aren't users
		} else {
			$objUsersTable.append(
				$('<tr>').append(
					$('<td>', {
						text: 'Not users registered',
						colspan: 3,
						align: 'center'
					})
					)
				);
		}
	};
	
	//To clean the form fields
	$.CleanFields = function () {
		$('#username,#password,#retypePassword').val('');
		$('#username').focus();
	};
	
	//submit event on form
	$('#prueba').on('submit', function (eEvento) {
		//void the recharging
		eEvento.preventDefault();

		var $tempUser = $('#username'), $tempPass = $('#password');

		if ($.trim($tempUser.val()) != '' && $.trim($tempPass.val())) {
			//temporal variables to save the information
			var strUser = $.trim($tempUser.val()),
				strPass = $.trim($tempPass.val());
			
			//if the username exist
			if (localStorage.getItem(strUser)) {
				if (confirm('This user exists. Do you want replace it?')) {
					//update the info
					localStorage.setItem(strUser, strPass);
					$.showListUsers();
					$.CleanFileds();
				}
			} else {
				localStorage.setItem(strUser, strPass);
				$.showListUsers();
				//limpiamos el formulario
				$.CleanFields();
			}
		} else {
			if ($.trim($tempUser.val()) == '') {
				alert('Write the username. Please');
				$tempUser.val('').focus();
			} else {
				alert('Please type the password');
				$tempPass.val('').focus();
			}
		}
	});
	
	//Delete clic event
	$('.clsDelete').on('click', function () {
		var strDelete = $(this).data('dUser');

		if (confirm('Are you sure you want delete?' + strDelete)) {
			localStorage.removeItem(strDelete);
			//charge the list of the users
			$.showListUsers();
		}
	});

	$.showListUsers();
});