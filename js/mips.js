var registerKey     = "reg";
var programCounter  = "pc";
var memKey          = "mem";

var regNames = {
    "zero" : "0",
    "at"   : "1",
    "v0"   : "2",
    "v1"   : "3",
    "a0"   : "4",
    "a1"   : "5",
    "a2"   : "6",
    "a3"   : "7",
    "t0"   : "8",
    "t1"   : "9",
    "t2"   : "10",
    "t3"   : "11",
    "t4"   : "12",
    "t5"   : "13",
    "t6"   : "14",
    "t7"   : "15",
    "s0"   : "16",
    "s1"   : "17",
    "s2"   : "18",
    "s3"   : "19",
    "s4"   : "20",
    "s5"   : "21",
    "s6"   : "22",
    "s7"   : "23",
    "t8"   : "24",
    "t9"   : "25",
    "k0"   : "26",
    "k1"   : "27",
    "gp"   : "28",
    "sp"   : "29",
    "fp"   : "30",
    "ra"   : "31",
};

/**
 * Performs an add operation
 */
function add(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);
	
    localStorage.setItem(translateRegisterNames(dest), iA + iB);
	console.log("add " + dest + ", " + a + ", " + b + " = " + localStorage.getItem(registerKey + dest));
};

/**
 * Performs an add immediate operation
 */
function addi(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);

	localStorage.setItem(translateRegisterNames(dest), iA + iB);
	console.log("addi " + dest + ", " + a + ", " + b + " = " + localStorage.getItem(registerKey + dest));
};

/**
 * Performs an add immediate unsigned operation
 */
function addiu(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);
    
	localStorage.setItem(translateRegisterNames(dest), iA + iB);
};

/**
 * Performs an add unsigned operation
 */
function addu(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);

	localStorage.setItem(translateRegisterNames(dest), iA + iB);
};

/**
 * Performs an and operation
 */
function and(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);

	localStorage.setItem(translateRegisterNames(dest), iA & iB);
};

/**
 * Performs an and immediate operation
 */
function andi(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);

	localStorage.setItem(translateRegisterNames(dest), iA & iB);
};

/**
 * Performs a branch if a == b
 */
function beq(a, b, target) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);
    
    if (iA === iB) {
        branch(target);   
    }
};

/**
 * Performs a branch if a >= 0
 */
function bgez(a, target) {
    var iA = getRegisterValues(registerKey + a);
    
    if (iA >= 0) {
        branch(target); 
    }
};

/**
 * Performs a branch (and link) if a >= 0
 */
function bgezal(a, target) {
    var iA = getRegisterValues(registerKey + a);
    
    if (iA >= 0) {
        var currentPC = getRegisterValues(programCounter);
        branch(target);
        localStorage.setItem(registerKey + '31', currentPC); 
    }
};

/**
 * Performs a branch if a > 0
 */
function bgtz(a, target) {
    var iA = getRegisterValues(registerKey + a);
    
    if (iA > 0) {
        branch(target);
    }
};

/**
 * Performs a branch if a <= 0
 */
function blez(a, target) {
    var iA = getRegisterValues(registerKey + a);
    
    if (iA <= 0) {
        branch(target);
    }
};

/**
 * Performs a branch if a < b
 */
function blt(a, b, target) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);
    
    if (iA < iB) {
        branch(target);
    }
};

/**
 * Performs a branch if a < 0
 */
function bltz(a, target) {
    var iA = getRegisterValues(registerKey + a);
    
    if (iA < 0) {
        branch(target);
    }
};

/**
 * Performs a branch (and link) if a < 0
 */
function bltzal(a, target) {
    var iA = getRegisterValues(registerKey + a);
    
    if (iA < 0) {
        var currentPC = getRegisterValues(programCounter);
        branch(target);
        localStorage.setItem(registerKey + '31', currentPC); 
    }
};

/**
 * Performs a branch if a != b
 */
function bne(a, b, target) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);
    
    if (iA !== iB) {
        branch(target);
    }
};

/**
 * Performs an div operation
 */
function div(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);

	localStorage.setItem(translateRegisterNames(dest), iA / iB);
};

/**
 * Performs an jump operation
 */
function j(target) {
    var immed = getImmediateValue(target);
    var pc = getRegisterValues(programCounter);
    var val = (pc & 0xf0000000) | (immed << 2)

	localStorage.setItem(programCounter, val);
};

/**
 * Performs an jump and link operation
 */
function jal(target) {
    var immed = getImmediateValue(target);
    var pc = getRegisterValues(programCounter);
    var val = (pc & 0xf0000000) | (immed << 2)

	localStorage.setItem(programCounter, val);
    localStorage.setItem(registerKey + '31', pc); 
};

/**
 * Performs an jump register operation
 */
function jr(a) {
    var iA = getRegisterValues(registerKey + a);

	localStorage.setItem(programCounter, iA);
};

/**
 * Performs a load byte operation
 */
function lb(a, offset, dest) {
	var iA = getRegisterValues(registerKey + a);
	if (offset === null) {
        offset = 0;
    } else if (typeof(offset) !== Number) {
        offset = new Number(offset);
    }
	
	iA += offset;
	
	localStorage.setItem(translateRegisterNames(dest), getMemoryValue(iA));
};

/**
 * Performs a load upper immediate operation
 */
function lui(a, dest) {
    var iA = getImmediateValue(a);
	localStorage.setItem(translateRegisterNames(dest), (iA << 16));
};

/**
 * Performs a load word operation
 */
function lw(a, offset, dest) {
	var iA = getRegisterValues(registerKey + a);
	if (offset === null) {
        offset = 0;
    } else if (typeof(offset) !== Number) {
        offset = new Number(offset);
    }
	
	iA += offset;
	
	// Divide by 4 to get word address, then multiply by 4 to get aligned
	// word address
	iA >> 2;
	iA << 2;
	
	// Get each byte individually
	var toStore = getMemoryValue(iA);
	toStore |= (getMemoryValue(iA + 1) << 8);
	toStore |= (getMemoryValue(iA + 2) << 16);
	toStore |= (getMemoryValue(iA + 3) << 24);
	
	localStorage.setItem(translateRegisterNames(dest), toStore);
};

/**
 * Performs an mult operation
 */
function mult(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);

	localStorage.setItem(translateRegisterNames(dest), iA * iB);
};

/**
 * Performs an or operation
 */
function or(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);

	localStorage.setItem(translateRegisterNames(dest), iA | iB);
};

/**
 * Performs an or immediate operation
 */
function ori(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);

	localStorage.setItem(translateRegisterNames(dest), iA | iB);
};

/**
 * Performs a store byte operation
 */
function sb(a, offset, data) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getRegisterValues(registerKey + data);
	
	if (offset === null) {
        offset = 0;
    } else if (typeof(offset) !== Number) {
        offset = new Number(offset);
    }
	
	iA += offset;
	
	// Get the lowest Byte
	iB &= 0x000000FF;
	
	localStorage.setItem(memKey + iA, iB);
};

/**
 * Performs a shift left logical operation
 */
function sll(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getImmediateValue(b);
	
	localStorage.setItem(translateRegisterNames(dest), iA << iB);
};

/**
 * Performs a shift left logical variable operation
 */
function sllv(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getRegisterValues(registerKey + b);
	
	localStorage.setItem(translateRegisterNames(dest), iA << iB);
};

/**
 * Performs a shift right arithmetic operation
 */
function sra(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getImmediateValue(b);
	
	localStorage.setItem(translateRegisterNames(dest), iA >> iB);
};

/**
 * Performs a shift right logical operation
 */
function srl(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getImmediateValue(b);
	
	localStorage.setItem(translateRegisterNames(dest), iA >>> iB);
};

/**
 * Performs a shift right logical variable operation
 */
function srlv(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getRegisterValues(registerKey + b);
	
	localStorage.setItem(translateRegisterNames(dest), iA >>> iB);
};

/**
 * Performs a sub operation
 */
function sub(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getRegisterValues(registerKey + b);
	
	localStorage.setItem(translateRegisterNames(dest), iA - iB);
};

/**
 * Performs a store word operation
 */
function sw(a, offset, data) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getRegisterValues(registerKey + data);
	
	if (offset === null) {
        offset = 0;
    } else if (typeof(offset) !== Number) {
        offset = new Number(offset);
    }
	
	iA += offset;
	
	// Divide by 4 to get word address, then multiply by 4 to get aligned
	// word address
	iA >> 2;
	iA << 2;
	
	localStorage.setItem(memKey + iA, iB & 0x000000FF);
	localStorage.setItem(memKey + (iA + 1), iB & 0x0000FF00);
	localStorage.setItem(memKey + (iA + 2), iB & 0x00FF0000);
	localStorage.setItem(memKey + (iA + 3), iB & 0xFF000000);
};

/**
 * Performs a xor operation
 */
function xor(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getRegisterValues(registerKey + b);
	
	localStorage.setItem(translateRegisterNames(dest), iA ^ iB);
};

/**
 * Performs a xori operation
 */
function xori(a, b, dest) {
	var iA = getRegisterValues(registerKey + a);
	var iB = getImmediateValue(b);
	
	localStorage.setItem(translateRegisterNames(dest), iA ^ iB);
};

/**
 * Performs a branch.
 *
 * New PC = CurrentPC + target
 */
function branch(target) {
    var currentPC = getRegisterValues(programCounter);
	if (isNaN(currentPC)) {
		currentPC = 0;
	}
	// Make sure target is Number not string
	if (target === null) {
        target = 0;
    } else if (typeof(target) !== Number) {
        target = new Number(target);
    }
	
    currentPC += target;
	
    localStorage.setItem(programCounter, currentPC);
};

function incrementPC() {
	branch(1);
};

function getRegisterValues(a) {
    var aTemp = translateRegisterNames(a);

    var iA = localStorage.getItem(aTemp);
    
    if (iA === null) {
        iA = 0;
    } else if (typeof(iA) !== Number) {
        iA = new Number(iA);
    }
    
    return iA;
};

/**
 * Translate named retisters to their numerical register
 */
function translateRegisterNames(token) {
    var toRet = token.replace(registerKey, "").replace(programCounter, "");

    // We either have a programCounter or a null register
    // Just return what we were given
    if (toRet === null || "" === toRet) {
        return token;
    }

    // If the token doesn't start with a number, we will
    // try and translate it
    if (isNaN(toRet[0])) {
        return registerKey + regNames[toRet];
    }
    
    // If it was a number, just return what we were given
    return token;
};

function getImmediateValue(a) {
    var iA = new Number(a);
        
    if (a === "" || a === undefined || a === '0' || isNaN(a) || a === "") {
        iA = 0;
	}
    
    return iA;
};

function getMemoryValue(byteAddr) {
    var iA = localStorage.getItem(memKey + byteAddr);
    
    if (iA === null) {
        iA = 0;
    } else if (typeof(iA) !== Number) {
        iA = new Number(iA);
    }
    
    return iA;
};
