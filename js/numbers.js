/**
 * Updates all relevant text boxes with their proper representations
 * 
 * @param decimal - the decimal representation to use
 * @param modifying - which representation is being typed in (so we don't 
 *					overwrite what the user is typing)
 */
function getValue(decimalVal) {
	var num = new Number(decimalVal);
	var toRet = {};
	toRet.hex = 0;
    toRet.bin = 0;
    
	if (decimalVal === "" || decimalVal === undefined || num === '0' || isNaN(num) || num === "") {
        toRet.hex = toHex2C(num);
        toRet.bin = toBin2C(num);
	}
    
    return toRet;
};

/**
 * Converts a decimal number into 1's Compliment Binary
 * 
 * @param decimal - the decimal number to convert
 * @return the 1's Compliment Binary representation of the
 * 		   given number
 */
function toBin1C(decimal) {
	if (decimal > 0) {
		return padWithZeros(decimal.toString(2));
	} else {
		var magnitude = padWithZeros("0" + Math.abs(decimal).toString(2));
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

/**
 * Converts a decimal number into 2's Compliment Binary
 * 
 * @param decimal - the decimal number to convert
 * @return the 2's Compliment Binary representation of the
 * 		   given number
 */
function toBin2C(decimal) {
	if (decimal > 0) {
		return padWithZeros(decimal.toString(2));
	} else {
		var oneComp = toBin1C(decimal);
		var decimal = toDecimal(oneComp);
		decimal += 1;
		return decimal.toString("2");
	}
};

/**
 * Converts a decimal number into 1's Compliment Hex
 * 
 * @param decimal - the decimal number to convert
 * @return the 1's Compliment Hexadecimal representation of the
 * 		   given number
 */
function toHex1C(decimal) {
	if (decimal > 0) {
		return decimal.toString(16);
	} else {
		var oneCbin = toBin1C(decimal);
		var toRet = [];
		
		for (var i = 0; i < oneCbin.length; i += 4) {
			var tempVal = toDecimal(oneCbin.substring(i, i + 4));
			toRet.push(tempVal.toString(16));
		}
		
		return toRet.join("");
	}
};

/**
 * Converts a decimal number into 2's Compliment Hex
 * 
 * @param decimal - the decimal number to convert
 * @return the 2's Compliment Hexadecimal representation of the
 * 		   given number
 */
function toHex2C(decimal) {
	if (decimal > 0) {
		return decimal.toString(16);
	} else {
		var twoCbin = toBin2C(decimal);
		var toRet = [];
		
		for (var i = 0; i < twoCbin.length; i += 4) {
			var tempVal = toDecimal(twoCbin.substring(i, i + 4));
			toRet.push(tempVal.toString(16));
		}
		
		return toRet.join("");
	}
};

/**
 * Converts a binary number into decimal
 * 
 * @param bin - the binary number to convert
 * @return the decimal equivalent (sign/magnitude representation)
 */
function toDecimal(bin) {
	var toRet = 0;
	
	for (var i = 0; i < bin.length; i++) {
		if (bin.charAt(i) === '1') {
			toRet += Math.pow(2, bin.length - i - 1);
		}
	}
	
	return toRet;
};

/**
 * Converts Hex to binary
 * 
 * @param hex - the hex number to convert
 * @return the padded binary value
 */
function binFromHex(hex) {
    var toRet = [];
    
    for (var i = 0; i < hex.length; i++) {
        var num = new Number(hex[i]);
        
        if (isNaN(num)) {
            switch (hex[i]) {
                case 'a': toRet.push("1010"); break;
                case 'b': toRet.push("1011"); break;
                case 'c': toRet.push("1100"); break;
                case 'd': toRet.push("1101"); break;
                case 'e': toRet.push("1110"); break;
                case 'f': toRet.push("1111"); break;
            };
        } else {
            toRet.push(padWithZeros(hex[i].toString(2)));
        }
    }
    
    console.log(toRet.join(""));
    
    return toRet.join("");
};

/**
 * Pads a binary number with zeros to the closest multiple of 4
 *		Ex: 10110 --> 00010110
 * 
 * @param bin - the binary number to convert
 * @return the padded binary value
 */
function padWithZeros(bin) {
	var toRet = bin;
	
	if (bin.length % 4 !== 0) {
		var numZerosToAppend = 4 - (bin.length % 4);
		toRet = [];
		
		for (var i = 0; i < numZerosToAppend; i++) {
			toRet.push("0");
		}
		
		toRet.push(bin);
		toRet = toRet.join("");
	}
	
	return toRet;
};
