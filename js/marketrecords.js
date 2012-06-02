$(function() {
	$("#ratingForm").dialog({
		autoOpen: false,
		height: 400,
		width: 350,
		modal: true,
		buttons: {
			"Submit": function() {
				$("#submitRatings").click();
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}
	});
	
	$("#countForm").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Submit": function() {
				$("#submitDownloads").click();
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}
	});
});
