$().ready(function(){
	// Add handler for typing in the First Operand's Decimal box
	$("#decimal").keyup(function(e) {
		var decimalVal = $("#decimal").val();
		var num = new Number(decimalVal);
		
		// Sign and Magnitude
		$("#hexSM").val(num.toString(16));
		$("#binarySM").val(num.toString(2));
		
		// One's Complement
		$("#hex1C").val(toHex1C(num));
		$("#binary1C").val(toBin1C(num));
		
		// Two's Complement
		$("#hex2C").val(toHex2C(num));
		$("#binary2C").val(toBin2C(num));
	});
	
	// Add handler for typing in the Second Operand's Decimal box
	$("#decimal2").keyup(function(e) {
		var decimalVal = $("#decimal2").val();
		var num = new Number(decimalVal);
		
		// Sign and Magnitude
		$("#hexSM2").val(num.toString(16));
		$("#binarySM2").val(num.toString(2));
		
		// One's Complement
		$("#hex1C2").val(toHex1C(num));
		$("#binary1C2").val(toBin1C(num));
		
		// Two's Complement
		$("#hex2C2").val(toHex2C(num));
		$("#binary2C2").val(toBin2C(num));
	});
	
	$("#performAdd").click(function(e) {
		var decimalVal1 = $("#decimal").val();
		var decimalVal2 = $("#decimal2").val();
		var num1 = new Number(decimalVal1);
		var num2 = new Number(decimalVal2);
		var result = num1 + num2;
		
		$("#decimalRslt").val(result);
		
		// Sign and Magnitude
		$("#hexSMRslt").val(result.toString(16));
		$("#binarySMRslt").val(result.toString(2));
		
		// One's Complement
		$("#hex1CRslt").val(toHex1C(result));
		$("#binary1CRslt").val(toBin1C(result));
		
		// Two's Complement
		$("#hex2CRslt").val(toHex2C(result));
		$("#binary2CRslt").val(toBin2C(result));
	});
	
	$("#performSub").click(function(e) {
		var decimalVal1 = $("#decimal").val();
		var decimalVal2 = $("#decimal2").val();
		var num1 = new Number(decimalVal1);
		var num2 = new Number(decimalVal2);
		var result = num1 - num2;
		
		$("#decimalRslt").val(result);
		
		// Sign and Magnitude
		$("#hexSMRslt").val(result.toString(16));
		$("#binarySMRslt").val(result.toString(2));
		
		// One's Complement
		$("#hex1CRslt").val(toHex1C(result));
		$("#binary1CRslt").val(toBin1C(result));
		
		// Two's Complement
		$("#hex2CRslt").val(toHex2C(result));
		$("#binary2CRslt").val(toBin2C(result));
	});
	
	$("#performMult").click(function(e) {
		var decimalVal1 = $("#decimal").val();
		var decimalVal2 = $("#decimal2").val();
		var num1 = new Number(decimalVal1);
		var num2 = new Number(decimalVal2);
		var result = num1 * num2;
		
		$("#decimalRslt").val(result);
		
		// Sign and Magnitude
		$("#hexSMRslt").val(result.toString(16));
		$("#binarySMRslt").val(result.toString(2));
		
		// One's Complement
		$("#hex1CRslt").val(toHex1C(result));
		$("#binary1CRslt").val(toBin1C(result));
		
		// Two's Complement
		$("#hex2CRslt").val(toHex2C(result));
		$("#binary2CRslt").val(toBin2C(result));
	});
});


function toHex1C(num) {
	if (num > 0) {
		return num.toString(16);
	} else {
		var oneCbin = toBin1C(num);
		var toRet = [];
		
		for (var i = 0; i < oneCbin.length; i += 4) {
			var tempVal = toDecimal(oneCbin.substring(i, i + 4));
			toRet.push(tempVal.toString(16));
		}
		
		return toRet.join("");
	}
};

function toHex2C(num) {
	if (num > 0) {
		return num.toString(16);
	} else {
		var twoCbin = toBin2C(num);
		var toRet = [];
		
		for (var i = 0; i < twoCbin.length; i += 4) {
			var tempVal = toDecimal(twoCbin.substring(i, i + 4));
			toRet.push(tempVal.toString(16));
		}
		
		return toRet.join("");
	}
};

function toBin1C(num) {
	if (num > 0) {
		return padWithZeros(num.toString(2));
	} else {
		var magnitude = padWithZeros("0" + Math.abs(num).toString(2));
		var toRet = [];
		
		for (var i = 0; i < magnitude.length; i++) {
			if (magnitude.charAt(i) === '0') {
				toRet.push('1');
			} else {
				toRet.push('0');
			}
		}
		
		return toRet.join("");
	}
};

function toBin2C(num) {
	if (num > 0) {
		return padWithZeros(num.toString(2));
	} else {
		var oneComp = toBin1C(num);
		var decimal = toDecimal(oneComp);
		decimal += 1;
		// TODO:
		return decimal.toString("2");
	}
};

function toDecimal(bin) {
	var toRet = 0;
	
	for (var i = 0; i < bin.length; i++) {
		if (bin.charAt(i) === '1') {
			toRet += Math.pow(2, bin.length - i - 1);
		}
	}
	
	return toRet;
};

function padWithZeros(num) {
	var toRet = num;
	
	if (num.length % 4 !== 0) {
		var numZerosToAppend = 4 - (num.length % 4);
		toRet = [];
		
		for (var i = 0; i < numZerosToAppend; i++) {
			toRet.push("0");
		}
		
		toRet.push(num);
		toRet = toRet.join("");
	}
	
	return toRet;
};

