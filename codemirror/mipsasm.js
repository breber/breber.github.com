// MIPS mode. Ported to CodeMirror 2 by Brian Reber
 
CodeMirror.defineMode("mipsasm", function(config, parserConfig) {
  var indentUnit = config.indentUnit;

  function prefixRE(words) {
    return new RegExp("^(?:" + words.join("|") + ")", "i");
  }
  function wordRE(words) {
    return new RegExp("^(?:" + words.join("|") + ")$", "i");
  }
 
  // long list of standard functions from lua manual
  var builtins = wordRE([
    "add","addi","addiu","addu","and","andi","beq","bgez","bgezal","bgtz",
    "blez","blt","bltz","bltzal","bne","div","divu","j","jal","jr","lb","lui",
    "lw","mult","mul","multu","noop","or","ori","sb","sll", "sllv", "slt", "slti",
    "sltiu", "sltu", "sra", "srl", "srlv", "sub", "subu", "sw", "xor", "xori"
  ]);
  var registers = wordRE([
    "\$0","\$1","\$2","\$3","\$4","\$5","\$6","\$7","\$9","\$9", "\$10",
    "\$11","\$12","\$13","\$14","\$15","\$16","\$17","\$18","\$19","\$20","\$21","\$22",
    "\$23","\$24","\$25","\$26","\$27","\$28","\$29","\$30","\$31", 
    
    "\$zero","\$at","\$v0","\$v1","\$a0","\$a1","\$a2","\$a3","\$t0","\$t1", "\$t2",
    "\$t3","\$t4","\$t5","\$t6","\$t7","\$s0","\$s1","\$s2","\$s3","\$s4","\$s5","\$s6",
    "\$s7","\$t8","\$t9","\$k0","\$k1","\$gp","\$sp","\$fp","\$ra"
  ]);
  var keywords = wordRE([".data",".text" ]);

  function normal(stream, state) {
    var ch = stream.next();
    if (ch == "#") {
      stream.skipToEnd();
      return "comment";
    } 
    if (ch == "\"" || ch == "'")
      return (state.cur = string(ch))(stream, state);
    if (/\d/.test(ch)) {
      stream.eatWhile(/[\w.%]/);
      return "number";
    }
    if (/[$]/.test(ch)) {
      stream.eatWhile(/[\w\\\-_.]/);
      return "variable-2";
    }
    if (/[.\w_]/.test(ch)) {
      stream.eatWhile(/[\w\\\-_.]/);
      return "variable";
    }
    return null;
  }

  function string(quote) {
    return function(stream, state) {
      var escaped = false, ch;
      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped) break;
        escaped = !escaped && ch == "\\";
      }
      if (!escaped) state.cur = normal;
      return "string";
    };
  }
    
  return {
    startState: function(basecol) {
      return {basecol: basecol || 0, indentDepth: 0, cur: normal};
    },

    token: function(stream, state) {
      if (stream.eatSpace()) return null;
      var style = state.cur(stream, state);
      var word = stream.current();
      if (style == "variable") {
        if (keywords.test(word)) style = "keyword";
        else if (builtins.test(word)) style = "builtin";
        else if (registers.test(word)) style = "variable-2";
      }
      return style;
    }
  };
});

CodeMirror.defineMIME("text/x-mipsasm", "mipsasm");
