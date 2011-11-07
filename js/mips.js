var registerKey     = "reg";
var programCounter  = "pc";

/**
 * Performs an add operation
 */
function add(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);
    
    localStorage.setItem(registerKey + dest, iA + iB);
};

/**
 * Performs an add immediate operation
 */
function addi(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);

	localStorage.setItem(registerKey + dest, iA + iB);
};

/**
 * Performs an add immediate unsigned operation
 */
function addiu(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);
    
	localStorage.setItem(registerKey + dest, iA + iB);
};

/**
 * Performs an add unsigned operation
 */
function addu(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);

	localStorage.setItem(registerKey + dest, iA + iB);
};

/**
 * Performs an and operation
 */
function and(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getRegisterValues(registerKey + b);

	localStorage.setItem(registerKey + dest, iA & iB);
};

/**
 * Performs an and immediate operation
 */
function andi(a, b, dest) {
    var iA = getRegisterValues(registerKey + a);
    var iB = getImmediateValue(b);

	localStorage.setItem(registerKey + dest, iA & iB);
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
    
    if (iA >== 0) {
        branch(target); 
    }
};

/**
 * Performs a branch (and link) if a >= 0
 */
function bgezal(a, target) {
    var iA = getRegisterValues(registerKey + a);
    
    if (iA >== 0) {
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

	localStorage.setItem(registerKey + dest, iA / iB);
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
 * Performs a branch.
 *
 * New PC = CurrentPC + target
 */
function branch(target) {
    var currentPC = getRegisterValues(programCounter);
    currentPC += target;
    
    localStorage.setItem(programCounter, currentPC);
};

function getRegisterValues(a) {
    var iA = localStorage.getItem(a);
    
    if (iA === null) {
        iA = 0;
    } else if (typeof(iA) !== number) {
        iA = new Number(iA);
    }
    
    return iA;
};

function getImmediateValue(a) {
    var iA = a;
        
    if (a === "" || a === undefined || a === '0' || isNaN(a) || a === "") {
        iA = 0;
	}
    
    return iA;
};
