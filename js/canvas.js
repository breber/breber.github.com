$("canvas#graph").ready(function(){
	var canvas = $("canvas#graph");
	var graph = document.getElementById('graph');
	var context = graph.getContext('2d');
	context.fillStyle = "rgb(0,0,0)";
	var offsetLeft = $("#graph").offset().left;
	var offsetTop = $("#graph").offset().top; 
	var size = 10;

	canvas.mousedown(function(e) {
		sessionStorage['clicked'] = "y";
		context.fillRect((e.pageX - offsetLeft - (size / 2)), (e.pageY - offsetTop - (size / 2)), size, size);
	});
	canvas.mouseup(function() {
		sessionStorage['clicked'] = "n";
	});
	canvas.mouseout(function() { 
		sessionStorage['clicked'] = "n";
	});

	canvas.mousemove(function(e) {
		if (sessionStorage['clicked'] === "y") {
			context.fillRect((e.pageX - offsetLeft - (size / 2)), (e.pageY - offsetTop - (size / 2)), size, size);
		}
	});
	
	function hexFromRGB(r, g, b) {
		var hex = [r.toString(16), g.toString(16), b.toString(16)];
		
		for (var i = 0; i < 3; i++) {
			if (hex[i].length == 1) {
				hex[i] = '0' + val;
			}
		}
		
		return hex.join('').toUpperCase();
	};

	function updateSwatch() {
		var hex = hexFromRGB($("#red").slider("value"), $("#green").slider("value"), $("#blue").slider("value"));
		$("#swatch").css("background-color", "#" + hex);
		context.fillStyle = "#" + hex;
	};

	function updateSize() { 
		size = $("#size").slider("value"); 
	};

	$("#red, #green, #blue").slider({
		orientation: 'horizontal',
		range: "min",
		max: 255,
		value: 127,
		slide: updateSwatch,
		change: updateSwatch
	});
	
	$("#red").slider("value", 50);
	$("#green").slider("value", 50);
	$("#blue").slider("value", 245);

	$("#size").slider({
		orientation: 'horizontal',
		range: "min",
		max: 100,
		value: size,
		slide: updateSize,
		change: updateSize
	});
});
