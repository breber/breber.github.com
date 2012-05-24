$(function() {
	$("#ratingForm").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Submit": function() {
				// TODO: submit form
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		},
		close: function() {
			allFields.val("").removeClass("ui-state-error");
		}
	});
	
	$("#countForm").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Submit": function() {
				// TODO: submit form
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		},
		close: function() {
			allFields.val("").removeClass("ui-state-error");
		}
	});
});
