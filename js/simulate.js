window.assembledInstructions = [];
window.labels = [];

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
		localStorage.setItem(programCounter, 0);
		
		//localStorage.setItem(memKey + 0, 4);
		//localStorage.setItem(memKey + 4, 5);
		//localStorage.setItem(memKey + 8, -1);
		//localStorage.setItem(memKey + 12, 15);
		//localStorage.setItem(memKey + 16, 7);
	});
	
	$("#runStep").click(function() {
		var currentPC = getRegisterValues(programCounter);
		if (currentPC < window.assembledInstructions.length) {
			window.editor.setLineClass(new Number(currentPC), null);
			window.editor.setLineClass(currentPC + 1, 'activeline');
			window.assembledInstructions[currentPC]();
		} else {
			$("#messages").append("Out of instructions\n");
			$("#assemble").removeAttr("disabled");
			$("#runStep").attr("disabled", "disabled");
			$("#runAll").attr("disabled", "disabled");
		}
		updateUI();
	});
	
	$("#runAll").click(function() {
		var currentPC = getRegisterValues(programCounter);
		while (currentPC < window.assembledInstructions.length) {
			window.assembledInstructions[currentPC]();
			currentPC = getRegisterValues(programCounter);
		}
		updateUI();
		$("#messages").append("Out of instructions\n");
		$("#assemble").removeAttr("disabled");
		$("#runStep").attr("disabled", "disabled");
		$("#runAll").attr("disabled", "disabled");
	});
});

/**
 * Go through the text box, line by line, parsing the instructions
 * and adding them to the instruction memory.
 *
 * Essentially 'assembling' the assembly code
 */
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

/**
 * Parse a line of assembly code, and add it to our 'instruction memory'
 */
function individualInstruction(line) {
	// Remove comments...
	line = line.replace(/#.+$/, '');
	
	// Parse Labels
	if (line.indexOf(":") !== -1) {
		var label = {};
		label.label = line.substr(0, line.indexOf(":"));
		label.instr = window.assembledInstructions.length;
		window.labels.push(label);
		
		// Update the line with the label removed, and continue processing
		line = line.substr(line.indexOf(":") + 1);
		console.log("Found label " + label.label + " at instruction " + label.instr + " ");
	}
	
	var tokens = line.split(" ");
	
	for (var i = 0; i < tokens.length; i++) {
		tokens[i] = tokens[i].replace(",", "").replace("$", "").replace(/\s|\t/g, "");
	}
	
	switch (tokens[0]) {
		case "add" : window.assembledInstructions.push(function() { incrementPC(); add(tokens[2], tokens[3], tokens[1]); }); break;
		case "addi" : window.assembledInstructions.push(function() { incrementPC(); addi(tokens[2], tokens[3], tokens[1]); }); break;
		case "addiu" : window.assembledInstructions.push(function() { incrementPC(); addiu(tokens[2], tokens[3], tokens[1]); }); break;
		case "addu" : window.assembledInstructions.push(function() { incrementPC(); addu(tokens[2], tokens[3], tokens[1]); }); break;
		case "and" : window.assembledInstructions.push(function() { incrementPC(); and(tokens[2], tokens[3], tokens[1]); }); break;
		case "andi" : window.assembledInstructions.push(function() { incrementPC(); andi(tokens[2], tokens[3], tokens[1]); }); break;
		// Branches find Labels...
		case "beq" : window.assembledInstructions.push(function() { incrementPC(); beq(tokens[1], tokens[2], getLabelLocation(tokens[3], true)); }); break;
		case "bgez" : window.assembledInstructions.push(function() { incrementPC(); bgez(tokens[1], getLabelLocation(tokens[2], true)); }); break;
		case "bgezal" : window.assembledInstructions.push(function() { incrementPC(); bgezal(tokens[1], getLabelLocation(tokens[2], true)); }); break;
		case "bgtz" : window.assembledInstructions.push(function() { incrementPC(); bgtz(tokens[1], getLabelLocation(tokens[2], true)); }); break;
		case "blez" : window.assembledInstructions.push(function() { incrementPC(); blez(tokens[1], getLabelLocation(tokens[2], true)); }); break;
		// Pseudo Instruction...
		case "blt" : window.assembledInstructions.push(function() { incrementPC(); blt(tokens[1], tokens[2], getLabelLocation(tokens[3], true)); }); break;
		case "bltz" : window.assembledInstructions.push(function() { incrementPC(); bltz(tokens[1], getLabelLocation(tokens[2], true)); }); break;
		case "bltzal" : window.assembledInstructions.push(function() { incrementPC(); bltzal(tokens[1], getLabelLocation(tokens[2], true)); }); break;
		case "bne" : window.assembledInstructions.push(function() { incrementPC(); bne(tokens[1], tokens[2], getLabelLocation(tokens[3], true)); }); break;
		case "div" : window.assembledInstructions.push(function() { incrementPC(); div(tokens[2], tokens[3], tokens[1]); }); break;
		// DIVU
		case "j" : window.assembledInstructions.push(function() { incrementPC(); j(getLabelLocation(tokens[1], false)); }); break;
		case "jal" : window.assembledInstructions.push(function() { incrementPC(); jal(getLabelLocation(tokens[1], false)); }); break;
		case "jr" : window.assembledInstructions.push(function() { incrementPC(); jr(tokens[1]); }); break;
		// LB
		case "lb" : window.assembledInstructions.push(function() { incrementPC(); lb(tokens[2].substr(tokens[2].indexOf("(") + 1, tokens[2].indexOf(")") - 2), tokens[2].substr(0, tokens[2].indexOf("(")), tokens[1]); }); break;
		case "lui" : window.assembledInstructions.push(function() { incrementPC(); lui(tokens[2], tokens[1]); }); break;
		// LW
		case "lw" : window.assembledInstructions.push(function() { incrementPC(); lw(tokens[2].substr(tokens[2].indexOf("(") + 1, tokens[2].indexOf(")") - 2), tokens[2].substr(0, tokens[2].indexOf("(")), tokens[1]); }); break;
		case "mul" : window.assembledInstructions.push(function() { incrementPC(); mult(tokens[2], tokens[3], tokens[1]); }); break;
		case "mult" : window.assembledInstructions.push(function() { incrementPC(); mult(tokens[2], tokens[3], tokens[1]); }); break;
		// MULTU
		case "or" : window.assembledInstructions.push(function() { incrementPC(); or(tokens[2], tokens[3], tokens[1]); }); break;
		case "ori" : window.assembledInstructions.push(function() { incrementPC(); ori(tokens[2], tokens[3], tokens[1]); }); break;
		// SB
		case "sb" : window.assembledInstructions.push(function() { incrementPC(); sb(tokens[2].substr(tokens[2].indexOf("(") + 1, tokens[2].indexOf(")") - 2), tokens[2].substr(0, tokens[2].indexOf("(")), tokens[1]); }); break;
		case "sll" : window.assembledInstructions.push(function() { incrementPC(); sll(tokens[2], tokens[3], tokens[1]); }); break;
		case "sllv" : window.assembledInstructions.push(function() { incrementPC(); sllv(tokens[2], tokens[3], tokens[1]); }); break;
		// SLT
		// SLTI
		// SLTIU
		// SLTU
		case "sra" : window.assembledInstructions.push(function() { incrementPC(); sra(tokens[2], tokens[3], tokens[1]); }); break;
		case "srl" : window.assembledInstructions.push(function() { incrementPC(); srl(tokens[2], tokens[3], tokens[1]); }); break;
		case "srlv" : window.assembledInstructions.push(function() { incrementPC(); srlv(tokens[2], tokens[3], tokens[1]); }); break;
		case "sub" : window.assembledInstructions.push(function() { incrementPC(); sub(tokens[2], tokens[3], tokens[1]); }); break;
		// SUBU
		case "sw" : window.assembledInstructions.push(function() { incrementPC(); sw(tokens[2].substr(tokens[2].indexOf("(") + 1, tokens[2].indexOf(")") - 2), tokens[2].substr(0, tokens[2].indexOf("(")), tokens[1]); }); break;
		case "xor" : window.assembledInstructions.push(function() { incrementPC(); xor(tokens[2], tokens[3], tokens[1]); }); break;
		case "xori" : window.assembledInstructions.push(function() { incrementPC(); xori(tokens[2], tokens[3], tokens[1]); }); break;
		default : {
			if (!(tokens[0] === null || "" === tokens[0])) {
				window.assembledInstructions.push(function() { incrementPC(); });
				console.log("Unknown Instruction " + tokens[0]);
			}
		}
	}
};

/**
 * Get the offset from the CurrentPC for the given label
 */
function getLabelLocation(label, diff) {
	for (var i = 0; i < window.labels.length; i++) {
		if (window.labels[i].label === label) {
			return diff ? (window.labels[i].instr - getRegisterValues(programCounter)) : window.labels[i].instr;
		}
	}
	
	return 0;
};

/**
 * Update all registers and PC values on the UI
 */
function updateUI() {
	for (var i = 0; i < 31; i++) {
		$("#r" + i + "val").html("<span>" + getRegisterValues(registerKey + i) + "</span>");
	}
	
	$("#rPCval").html("<span>" + getRegisterValues(programCounter) + "</span>");
};