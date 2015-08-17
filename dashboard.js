var Dashboard = {
	UserId: function () {
		var current = localStorage.getItem("CurrentUser");
		document.getElementById('currentUser').innerHTML = current;
		//$('#currentUser').val('current');
	}
};
$(document).ready(function () {
    Dashboard.UserId();
});