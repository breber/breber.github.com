google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(theCallback);

function theCallback() {
	$.getJSON("http://apps.brianreber.com/getapps?callback=?", updateGraphs);
};

function getDataAndDrawGraphs(appName, rowNum) {
	$.getJSON("http://apps.brianreber.com/getcounts?appName=" + appName + "&callback=?",
		function (data) {
			var temp = [];
	
			$.each(data.data, 
				function (index, value) {
					var obj = [];
					obj.push(value.date);
					obj.push(value.total);
					obj.push(value.active);	
		
					temp.push(obj);
				}
			);
	
			drawLineChart(appName, temp, rowNum);
		}
	);

	$.getJSON("http://apps.brianreber.com/getratings?appName=" + appName + "&callback=?", 
		function (data) {
			drawPieChart(data, rowNum);
		}
	);
};

function updateGraphs(data) {
	var table = document.getElementById("mTable");
	
	$.each(data.names, 
		function (index, value) {
			var row = document.createElement("tr");
			var col1 = document.createElement("td");
			var col2 = document.createElement("td");
			
			var div1 = document.createElement("div");
			div1.id = 'areaChart' + index;
			
			var div2 = document.createElement("div");
			var button1 = document.createElement("button");
			button1.id = 'addDownload' + index;
			div2.appendChild(button1);
			
			col1.appendChild(div1);
			col1.appendChild(div2);
			
			var div3 = document.createElement("div");
			div3.id = 'pieChart' + index;
			
			var div4 = document.createElement("div");
			div4.id = 'count' + index;
			
			var div5 = document.createElement("div");
			var button2 = document.createElement("button");
			button2.id = 'addRating' + index;
			div5.appendChild(button1);
			
			col2.appendChild(div3);
			col2.appendChild(div4);
			col2.appendChild(div5);
			
			row.appendChild(col1);
			row.appendChild(col2);
			
			table.appendChild(row);
			
			$("#addDownload" + index).button().click(function() {
				$("#appNameCount").value(value);
				$("#countForm").dialog("open");
			});
			
			$("#addRating" + index).button().click(function() {
				$("#appNameRating").value(value);
				$("#ratingForm").dialog("open");
			});
			
			getDataAndDrawGraphs(value, index);
		}
	);
};
 	
function drawLineChart(appName, theData, rowNum) {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
	data.addColumn('number', 'Total Downloads');
	data.addColumn('number', 'Active Installs');

	data.addRows(theData);
	
	var chart = new google.visualization.AreaChart(document.getElementById('areaChart' + rowNum));
	chart.draw(data, {width: 750, height: 500, title: appName + ' Downloads', hAxis: {title: 'Date', titleTextStyle: {color: '#FF0000'}}});
};

function drawPieChart(theData, rowNum) {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Rating');
	data.addColumn('number', 'Count');

	var total = 0;
	var count = 0;
	
	data.addRows(5);
	$.each(theData.ratings, 
		function (index, value) {
			data.setValue(index, 0, value.rating);
			data.setValue(index, 1, value.count);
			count += value.count;
			total += (value.count * convertStringToInt(value.rating))
		}
	);
	
	var chart = new google.visualization.PieChart(document.getElementById('pieChart' + rowNum));
	var theTitle = theData.appName + " Ratings as of " + theData.date;

	chart.draw(data, {width: 450, height: 450, title: theTitle});
	
	var div = document.getElementById('count' + rowNum);
	div.innerHTML = "Total Ratings: " + count + "<br />Average Rating: " + (total / count);
};

function convertStringToInt(str) {
	if (str === "Five") {
		return 5;
	} else if (str === "Four") {
		return 4;
	} else if (str === "Three") {
		return 3;
	} else if (str === "Two") {
		return 2;
	} else {
		return 1;
	}
};
