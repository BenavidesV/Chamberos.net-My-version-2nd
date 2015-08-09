$(document).ready(function () {

	var modalWindow = '<div><form class="form" id="usernameInfo" method="post">Username<input type= "text" class="form-control" id="username" placeholder="Username">Password:<input type="password" class="form-control" id="password" placeholder="Password">Confirm password<input type="password" class="form-control" id="retypePassword" placeholder="Confirm your password"></input></form><button id="save" type="submit" class="btn btn-warning" onclick="Users.AddUsers()">Save</button><button id="cancel" class="btn btn-success" onclick=\"closeModal()\">Cancel</button></div>';
	var ancho = 500;
	var alto = 150;

	$('#addUser').click(function () {

		/*var bgdiv = $('<div>').attr({
			className: 'bgtransparent',
			id: 'bgtransparent'
		});
 
		// agregamos nuevo div a la pagina
		$('body').append(bgdiv);
 */
		// obtenemos ancho y alto de la ventana del explorer
		var wscr = $(window).width();
		var hscr = $(window).height();
 
		//establecemos las dimensiones del fondo
		$('#bgtransparent').css("width", wscr);
		$('#bgtransparent').css("height", hscr);
 
 
		// ventana modal
		// creamos otro div para la ventana modal y dos atributos
		var moddiv = $('<div>').attr({
			className: 'bgmodal',
			id: 'bgmodal'
		}); 
 
		// agregamos div a la pagina
		$('body').append(moddiv);

		// agregamos contenido HTML a la ventana modal
		$('#bgmodal').append(modalWindow);
 
		// redimensionamos para que se ajuste al centro y mas
		$(window).resize();
		this.disabled = true;
	});

	$(window).resize(function () {
		// dimensiones de la ventana del explorer 
		var wscr = $(window).width();
		var hscr = $(window).height();

		// estableciendo dimensiones de fondo
		$('#bgtransparent').css("width", wscr);
		$('#bgtransparent').css("height", hscr);
 
		// estableciendo tamaño de la ventana modal
		$('#bgmodal').css("width", ancho + 'px');
		$('#bgmodal').css("height", alto + 'px');
 
		// obtiendo tamaño de la ventana modal
		var wcnt = $('#bgmodal').width();
		var hcnt = $('#bgmodal').height();
 
		// obtener posicion central
		var mleft = (wscr - wcnt) / 2;
		var mtop = (hscr - hcnt) / 2;
 
		// estableciendo ventana modal en el centro
		$('#bgmodal').css("left", mleft + 'px');
		$('#bgmodal').css("top", mtop + 'px');
	});

});

function closeModal() {
	// removemos divs creados
	$('#bgmodal').remove();
	//$('#bgtransparent').remove();
	document.getElementById("addUser").disabled = false;
	Users.AllUsers();
}