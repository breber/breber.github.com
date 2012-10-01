// Colors
var grey = "rgb(205,201,201)";
var white = "rgb(255,255,255)";
var black = "rgb(0,0,0)";
var red  = "rgb(255,0,0)";

// Game States
var paused = 'p';
var started = 's';
var finished = 'f';

// Cell States
var flag = 'f';
var ready = 'r';
var clicked = 'c';
var none = '';

$().ready(function(){
	// Prevent Right click
	document.getElementById("panel").oncontextmenu = function() { return false; };
	setSettings();
	var graph = document.getElementById('panel');
	var context = graph.getContext('2d');
	context.fillStyle = black;
	context.strokeStyle = black;
	context.lineWidth = 2;
	var numRows = sessionStorage['numRows'];
	var numCols = sessionStorage['numCols'];
	var cellSize = 48;
	var panel = $('#panel');

	var flagImage = new Image();
	flagImage.src = "/images/Flag.gif";

	$("#status").html('Waiting');

	setUpPanel();
	
	$("#panel").mousedown(function(e){ 
		if (e.button == 2) { 
			if (started === getGameState()) {
				var cell = getCell(e);
				var x = cell.x;
				var y = cell.y;
				if (ready === getCellState(x, y)) {
					context.drawImage(flagImage,(x * cellSize) + 1, (y * cellSize) + 1);
					setCellState(x, y, flag);
				} else if (flag === getCellState(x, y)) {
					context.fillStyle = white;
					context.fillRect((x * cellSize) + 1, (y * cellSize) + 1, cellSize-2, cellSize-2);
					setCellState(x, y, ready);
				}
			}
			return false; 
		} 
		return true; 
	}); 

	$('#panel').click(function(e){
		if (started === getGameState()) {
			var cell = getCell(e);
			var x = cell.x;
			var y = cell.y;
			setTimeout(function(){
				if (ready === getCellState(x, y)) {
					if ('MINE' === getCellValue(x, y)) {
						fillMines();
						context.fillStyle = red;
					} else {
						context.fillStyle = grey;
					}

					context.fillRect((x * cellSize) + 1, (y * cellSize) + 1, cellSize-2, cellSize-2);
					context.fillStyle = black;
					var element = getCellValue(x, y);
					context.fillText((element == '0') ? "" : element, (x * cellSize + (.5 * cellSize)), (y * cellSize + (.5 * cellSize)));
					setCellState(x, y, clicked);
				}
			}, 250);
		}
	});
	
	newGame();
	
	$('#newgame').click(newGame);
});

function fillMines() {
	var context = graph.getContext('2d');
	var numCols = sessionStorage['numCols'];
	var numRows = sessionStorage['numRows'];
	for (var i = 0; i < numRows; i++) {
		for (var j = 0; j < numCols; j++) {
			if ('MINE' === getCellValue(i, j)) {
				context.fillStyle = red;
				context.fillRect((i * cellSize) + 1, (j * cellSize) + 1, cellSize-2, cellSize-2);
				context.fillStyle = black;
				context.fillText('MINE', (i * cellSize + (.5 * cellSize)), (j * cellSize + (.5 * cellSize)));
			}
		}
	}
	
	setGameState(finished);
	$("#status").html('Finished');
}

function setUpPanel() {
	var graph = document.getElementById('panel');
	var context = graph.getContext('2d');
	context.fillStyle = black;
	context.strokeStyle = black;
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
	
	// Clear sessionStorage
	for (var i = 0; i < numRows; i++) {
		for (var j = 0; j < numCols; j++) {
			setCellState(j, i, none);
			setCellValue(j, i, none);
		}
	}
	
    var e = generateBoard(numRows, numCols);
    
    var div = $('#text');
    var str = [];
    str.push("<table id='test'>");
    
    for (var i = 0; i < numRows; i++) {
        str.push('<tr>')
        for (var j = 0; j < numCols; j++) {
            str.push("<td>(" + i + "," + j + ")<br />" + e.locations[i][j].value + "</td>");
            setCellValue(j, i, e.locations[i][j].value);
            setCellState(j, i, ready);
        }
        str.push("</tr>");
    }
    str.push("</table>");
    
    div.html(str.join(""));
    div.hide();
	

	$("#status").html('Started');
	setGameState(started);
};

// Generates a board of the given width and height
function generateBoard(rows, cols) {
    var toRet = {};
    toRet.locations = [];
    
    // Initialize the locations array
    for (var i = 0; i < cols; i++) {
		var temp = [];
        for (var j = 0; j < rows; j++) {
			var innerTemp = {};
            innerTemp.value = 0;
			temp.push(innerTemp);
        }
		toRet.locations.push(temp);
    }
	
    // Generate the mine locations
    var arr = [];
    for (var i = 0; i < 9; i++) {
        var temp = {};
        // If there is already a MINE in the chosen location,
        // continue to generate random locations until we find
        // one that isn't full of a mine
        do {
            temp.x = Math.floor(Math.random() * cols);
            temp.y = Math.floor(Math.random() * rows);
        } while (toRet.locations[temp.x][temp.y].value === "MINE");
		arr.push(temp);
		
        toRet.locations[temp.x][temp.y].value = "MINE";
        
        // We will increment the spaces surrounding the current location,
        // if it isn't already a mine
        
        // Locations right above the current location
        if ((temp.x - 1) >= 0) {
            // Right above
            if (toRet.locations[temp.x - 1][temp.y].value !== "MINE") {
                toRet.locations[temp.x - 1][temp.y].value++;
            }

            // Right above, to left
            if ((temp.y - 1) >= 0 && toRet.locations[temp.x - 1][temp.y - 1].value !== "MINE") {
                toRet.locations[temp.x - 1][temp.y - 1].value++;
            }
            
            // Right above, to right
            if ((temp.y + 1) < rows && toRet.locations[temp.x - 1][temp.y + 1].value !== "MINE") {
                toRet.locations[temp.x - 1][temp.y + 1].value++;
            }
        }
        
        // Locations on current row

        // To left
        if ((temp.y - 1) >= 0 && toRet.locations[temp.x][temp.y - 1].value !== "MINE") {
            toRet.locations[temp.x][temp.y - 1].value++;
        }
        
        // To right
        if ((temp.y + 1) < rows && toRet.locations[temp.x][temp.y + 1].value !== "MINE") {
            toRet.locations[temp.x][temp.y + 1].value++;
        }
        
        // Locations right below the current location
        if ((temp.x + 1) < cols) {
            // Right above
            if (toRet.locations[temp.x + 1][temp.y].value !== "MINE") {
                toRet.locations[temp.x + 1][temp.y].value++;
            }

            // Right above, to left
            if ((temp.y - 1) >= 0 && toRet.locations[temp.x + 1][temp.y - 1].value !== "MINE") {
                toRet.locations[temp.x + 1][temp.y - 1].value++;
            }
            
            // Right above, to right
            if ((temp.y + 1) < rows && toRet.locations[temp.x + 1][temp.y + 1].value !== "MINE") {
                toRet.locations[temp.x + 1][temp.y + 1].value++;
            }
        }
    }

    return toRet;
};

function getCellState(x, y) {
	return sessionStorage['cell' + y + '' + x + 'state'];
};

function setCellState(x, y, value) {
	sessionStorage['cell' + y + '' + x + 'state'] = value;
};

function getCellValue(x, y) {
	return sessionStorage['cell' + y + '' + x + 'value'];
};

function setCellValue(x, y, value) {
	sessionStorage['cell' + y + '' + x + 'value'] = value;
};

function setGameState(newState) {
	sessionStorage['gameState'] = newState;
};

function getGameState() {
	return sessionStorage['gameState'];
};

/**
 * Pause game on page unload
 */
window.onunload = function() {
	setGameState(paused);	
};