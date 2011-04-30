$().ready(function(){
	setSettings();
	var graph = document.getElementById('panel');
	var context = graph.getContext('2d');
	context.fillStyle = "rgb(0,0,0)";
	context.strokeStyle = "rgb(0,0,0)";
	context.lineWidth = 2;
	var numRows = sessionStorage['numRows'];
	var numCols = sessionStorage['numCols'];
	var cellSize = 48;
	var panel = $('#panel');

	var flagImage = new Image();
	flagImage.src = "images/Flag.gif";

	$("#status").html('Waiting');

	setUpPanel();

	$('#panel').click(function(e){
		if (sessionStorage['gameState'] == 's') {
			var cell = getCell(e);
			var x = cell.x;
			var y = cell.y;
			setTimeout(function(){
				if (sessionStorage['cell'+y+''+x+'state'] == 'r') {
					if (sessionStorage['cell'+y+''+x+'value'] == 'MINE') {
						fillMines();
						context.fillStyle = 'rgba(255,0,0,1)';
					} else {
						context.fillStyle = 'rgba(205,201,201,1)';
					}

					context.fillRect((x * cellSize) + 1, (y * cellSize) + 1, cellSize-2, cellSize-2);
					context.fillStyle = "rgb(0,0,0)";
					var element = sessionStorage['cell'+y+''+x+'value'];
					context.fillText((element == '0') ? "":element, (x * cellSize + (.5 * cellSize)), (y * cellSize + (.5 * cellSize)));
					sessionStorage['cell'+y+''+x+'state'] = 'c';
				}
			}, 250);
		}
	});

	$('#panel').dblclick(function(e){
		if (sessionStorage['gameState'] == 's') {
			var cell = getCell(e);
			var x = cell.x;
			var y = cell.y;
			if (sessionStorage['cell'+y+''+x+'state'] == 'r') {
				context.drawImage(flagImage,(x * cellSize) + 1, (y * cellSize) + 1);
				sessionStorage['cell'+y+''+x+'state'] = 'f';
			}
		}
	});
	$('#newgame').click(function(){
		newGame();
	});
	function fillMines() {
		var numCols = sessionStorage['numCols'];
		var numRows = sessionStorage['numRows'];
		for (var i = 0; i < numRows; i++) {
			for (var j = 0; j < numCols; j++) {
				if (sessionStorage['cell'+j+''+i+'value'] == 'MINE') {
					context.fillStyle = 'rgba(255,0,0,1)';
					context.fillRect((i * cellSize) + 1, (j * cellSize) + 1, cellSize-2, cellSize-2);
					context.fillStyle = "rgb(0,0,0)";
					context.fillText('MINE', (i * cellSize + (.5 * cellSize)), (j * cellSize + (.5 * cellSize)));
				}
			}
		}
		sessionStorage['gameState'] = 'f';
		$("#status").html('Finished');
	}
});

function setUpPanel(){
	var graph = document.getElementById('panel');
	var context = graph.getContext('2d');
	context.fillStyle = "rgb(0,0,0)";
	context.strokeStyle = "rgb(0,0,0)";
	context.lineWidth = 2;
	var numRows = sessionStorage['numRows'];
	var numCols = sessionStorage['numCols'];
	var cellSize = 48;
	var panel = $('#panel');
	$('#panel').ready(function() {
		graph.setAttribute('width', cellSize * numCols);
		graph.setAttribute('height', cellSize * numRows);
		for (var i = 1; i < numCols; i++) {
			context.beginPath();
			context.moveTo((panel.width() / numCols) * i, 0);
			context.lineTo((panel.width() / numCols) * i, panel.height());
			context.stroke();
			context.closePath();
		}
		for (var i = 1; i < numRows; i++) {
			context.beginPath();
			context.moveTo(0, (panel.height() / numRows) * i);
			context.lineTo(panel.width(), (panel.height() / numRows) * i);
			context.stroke();
			context.closePath();
		}
		context.textAlign = "center";
		context.font = "2em";
		context.textBaseline = 'middle';
		panel.css('font-size', '2em');
	});
};

function getCell(e) {
	var panel = $('#panel');
	var offsetLeft = sessionStorage['offsetLeft'];
	var offsetTop = sessionStorage['offsetTop'];
	var numCols = sessionStorage['numCols'];
	var numRows = sessionStorage['numRows'];
	var x = numCols - (panel.width() - (e.pageX - offsetLeft)) / (panel.width() / numCols);
	var y = numRows - (panel.height() - (e.pageY - offsetTop)) / (panel.height() / numRows);
	var ret = {};
	ret.x = Math.floor(x);
	ret.y = Math.floor(y);
	return ret;
};

function setSettings() {
	sessionStorage['numRows'] = 9;
	sessionStorage['numCols'] = 9;
	sessionStorage['offsetTop'] = $("#panel").offset().top;
	sessionStorage['offsetLeft'] = $("#panel").offset().left;
};

function newGame() {
	setUpPanel();
	var numRows = sessionStorage['numRows'];
	var numCols = sessionStorage['numCols'];
	//Clear sessionStorage
	for (var i = 0; i < numRows; i++) {
		for (var j = 0; j < numCols; j++) {
			sessionStorage['cell'+i+''+j+'value'] = '';
			sessionStorage['cell'+i+''+j+'state'] = '';
		}
	}
	
    var e = generateBoard(numRows, numCols);
    
    var div = $('#text');
    var str = [];
    str.push("<table id='test'>");
    
    for (var i = 0; i < numRows; i++) {
        str.push('<tr>')
        for (var j = 0; j < numCols; j++) {
            str.push("<td>("+i+","+j+")<br />"+e.locations[i][j].value + "</td>");
            sessionStorage['cell'+i+''+j+'value'] = e.locations[i][j].value
            sessionStorage['cell'+i+''+j+'state'] ='r';
        }
        str.push("</tr>");
    }
    str.push("</table>");
    
    div.html(str.join());
    div.hide();
	

	$("#status").html('Started');
	sessionStorage['gameState'] = 's';
};

/// Generates a board of the given width and height
function generateBoard(rows, cols) {
    var toRet = {};
    toRet.locations = [];
    
    // Initialize the locations array
    for (var i = 0; i < cols; i++) {
        toRet.locations[i] = [];
        for (var j = 0; j < rows; j++) {
            toRet.locations[i][j] = {};
            toRet.locations[i][j].value = 0;
        }
    }
    
    // Generate the mine locations
    var arr = [];
    for (var i = 0; i < 9; i++) {
        arr[i] = {};
        arr[i].x = Math.floor(Math.random() * cols);
        arr[i].y = Math.floor(Math.random() * rows);
        
        toRet.locations[arr[i].x][arr[i].y].value = "MINE";
        
        // We will increment the spaces surrounding the current location,
        // if it isn't already a mine
        
        // Locations right above the current location
        if ((arr[i].x - 1) > 0) {
            // Right above
            if (toRet.locations[arr[i].x - 1][arr[i].y].value !== "MINE") {
                toRet.locations[arr[i].x - 1][arr[i].y].value++;
            }

            // Right above, to left
            if ((arr[i].y - 1) > 0 && toRet.locations[arr[i].x - 1][arr[i].y - 1].value !== "MINE") {
                toRet.locations[arr[i].x - 1][arr[i].y - 1].value++;
            }
            
            // Right above, to right
            if ((arr[i].y + 1) < rows && toRet.locations[arr[i].x - 1][arr[i].y + 1].value !== "MINE") {
                toRet.locations[arr[i].x - 1][arr[i].y + 1].value++;
            }
        }
        
        // Locations on current row

        // Right above, to left
        if ((arr[i].y - 1) > 0 && toRet.locations[arr[i].x][arr[i].y - 1].value !== "MINE") {
            toRet.locations[arr[i].x][arr[i].y - 1].value++;
        }
        
        // Right above, to right
        if ((arr[i].y + 1) < rows && toRet.locations[arr[i].x][arr[i].y + 1].value !== "MINE") {
            toRet.locations[arr[i].x][arr[i].y + 1].value++;
        }
        
        // Locations right below the current location
        if ((arr[i].x + 1) < cols) {
            // Right above
            if (toRet.locations[arr[i].x + 1][arr[i].y].value !== "MINE") {
                toRet.locations[arr[i].x + 1][arr[i].y].value++;
            }

            // Right above, to left
            if ((arr[i].y - 1) > 0 && toRet.locations[arr[i].x + 1][arr[i].y - 1].value !== "MINE") {
                toRet.locations[arr[i].x + 1][arr[i].y - 1].value++;
            }
            
            // Right above, to right
            if ((arr[i].y + 1) < rows && toRet.locations[arr[i].x + 1][arr[i].y + 1].value !== "MINE") {
                toRet.locations[arr[i].x + 1][arr[i].y + 1].value++;
            }
        }
    }

    return toRet;
};

window.onunload = function() {
	sessionStorage['gameState'] = 'p';	
};