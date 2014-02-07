$(document).ready(function() {
	
	$('body').dompath({
		after_click: function(output) {
			console.log(output);
		}
	});

});