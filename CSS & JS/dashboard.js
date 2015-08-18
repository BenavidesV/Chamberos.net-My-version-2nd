var Dashboard = {
	UserId: function (current) {
		document.getElementById('currentUser').innerHTML = current;
		//$('#currentUser').val('current');
	},
	Logged: function () {
		var loggedUser = localStorage.getItem("CurrentUser");
		if (loggedUser == null) {
			document.location = ('index.html');

        } else {
			if (loggedUser != 'admin') {
				$('#userAdmin').remove();
			}
			Dashboard.UserId(loggedUser);
		}
	}
};
$(document).ready(function () {
    Dashboard.Logged();
	$('#exit').click(function () {
		localStorage.removeItem('CurrentUser');
	})
});