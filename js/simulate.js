window.assembledInstructions = [];

$().ready(function() {
	$("#runStep").attr("disabled", "disabled");
	$("#runAll").attr("disabled", "disabled");
	
	$("#assemble").click(function() {
		var editorText = window.editor.getValue();
		parseInstructions(editorText);
		
		$("#assemble").attr("disabled", "disabled");
		$("#runStep").removeAttr("disabled");
		$("#runAll").removeAttr("disabled");
		localStorage.clear();
	});
	
	$("#runStep").click(function() {
		var currentPC = getRegisterValues(programCounter);
		if (currentPC < window.assembledInstructions.length) {
			window.assembledInstructions[currentPC]();
		} else {
			$("#messages").append("Out of instructions\n");
			$("#assemble").removeAttr("disabled");
			$("#runStep").attr("disabled", "disabled");
			$("#runAll").attr("disabled", "disabled");
		}
	});
	
	$("#runAll").click(function() {
		var currentPC = getRegisterValues(programCounter);
		while (currentPC < window.assembledInstructions.length) {
			window.assembledInstructions[currentPC]();
			currentPC = getRegisterValues(programCounter);
		}
		
		$("#messages").append("Out of instructions\n");
		$("#assemble").removeAttr("disabled");
		$("#runStep").attr("disabled", "disabled");
		$("#runAll").attr("disabled", "disabled");
	});
});

function parseInstructions(text) {
	var end = text.search("\n");
	if (end === -1) {
		end = text.length;
	}
	if (text.length > 0) {
		var line = text.substr(0, end);
		
		individualInstruction(line);
		
		if (end !== -1) {
			parseInstructions(text.substr(end + 1));
		}
	}
};

function individualInstruction(line) {
	var tokens = line.split(" ");
	
	for (var i = 1; i < tokens.length; i++) {
		tokens[i] = tokens[i].replace(",", "").replace("$", "");
	}
	
	switch (tokens[0]) {
		case "addi" : window.assembledInstructions.push(function() { addi(tokens[2], tokens[3], tokens[1]); incrementPC(); }); break;
		case "add" : window.assembledInstructions.push(function() { add(tokens[2], tokens[3], tokens[1]); incrementPC(); }); break;
		case "and" : window.assembledInstructions.push(function() { and(tokens[2], tokens[3], tokens[1]); incrementPC(); }); break;
		default : {
			alert("Error");
		}
	}
};

function updateUI() {
	for (var i = 0; i < 31; i++) {
		$("#r" + i + "val").html("<span>" + getRegisterValues(registerKey + i) + "</span>");
	}
	
	$("#rPCval").html("<span>" + getRegisterValues(programCounter) + "</span>");
};