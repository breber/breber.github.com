// Switch to mobile view if the user agent indicates
// they are on a mobile platform
$().ready(function switchMobile() {
	var uagent = navigator.userAgent.toLowerCase();

	function checkBrowserMobile() {
		return (uagent.search("iphone") > -1) || (uagent.search("ipod") > -1) || (uagent.search("android") > -1);
	};
    
	if (checkBrowserMobile()) {
		window.location += "/mobile/mobile.html";
	}
});

// Set up the navigation bar
$().ready(function(){
    var rightText = [];
    rightText.push("<div style='margin-bottom: 1em; line-height: 2em; padding-bottom: 4px'>&nbsp;</div>");
    rightText.push("<div class='navbar'>");
    rightText.push("<ul id='navbarlist'>");
    rightText.push("<li class='nav' id='2011'><b>2011</b>");
    rightText.push("<ul>");
    rightText.push("<li><a href='twitterpicviewer.html'>Twitter Picture Viewer</a></li>");
    rightText.push("</ul></li>");
    rightText.push("<li class='nav' id='2010'><b>2010</b>");
    rightText.push("<ul>");
    rightText.push("<li><a href='agendawidget.html'>Android Agenda Widget</a></li>");
    rightText.push("<li><a href='https://github.com/breber/CyRide'>CyRide for Android</a></li>");
    rightText.push("<li><a href='http://code.google.com/p/android-number-guess'>Android Number Guess</a></li>");
    rightText.push("<li><a href='http://home.engineering.iastate.edu/~breber/Minesweeper/minesweeper.html'>Minesweeper</a></li>");
    rightText.push("<li><a href='http://home.engineering.iastate.edu/~breber/TomcatAnalysis/Tomcat.html'>Tomcat Analysis</a></li>");
    rightText.push("<li><a href='http://code.google.com/p/iphone-motion-unlock'>iPhone Motion Unlock</a></li>");
    rightText.push("<li><a href='canvastest.html'>HTML5 Canvas Drawing</a></li>");
    rightText.push("<li><a href='mines.html'>HTML5 &amp; jQuery Minesweeper</a></li>");
    rightText.push("</ul></li>");
    rightText.push("<li class='nav' id='2009'><b>2009</b>");
    rightText.push("<ul>");
    rightText.push("<li><a href='http://breber.public.iastate.edu/250H'>English 250H ePortfolio</a></li>");
    rightText.push("</ul>");
    rightText.push("</li>");
    rightText.push("</ul>");
    rightText.push("</div>");
    rightText.push("<div style='text-align: center'><p>Copyright &copy;<br /> Brian Reber, " + new Date().getFullYear() + "</p></div>");
    
    $("div#right").html(rightText.join(""));

	var elems = document.getElementById('navbarlist').childNodes;

	for (var i = 0; i < elems.length; i++){
		if (elems.item(i).className == 'nav' && elems.item(i).id != undefined) {
			setStorage(elems.item(i).id, 'out');
		}
	}

	$("li.nav ul").hide();
	$("li.nav:not(li.nav ul)").mouseover(function(){
		var id = this.getAttribute('id');
		$("li#"+id+" ul").show(500);
		setStorage(id, 'in');
	});
	$("li.nav, li.nav ul").mouseout(function(){
		var id = this.getAttribute('id');
		setStorage(id, 'out');
		var temp = "getStorage("+id+")=='out'";
		setTimeout("if("+temp+"){" +
				"$('li#"+id+" ul').hide(500);}", 2000);
	});
    
    $("div#topNav").html("<a href='index.html'>About the Site</a><span class='spacer'></span>|<span class='spacer'></span><a href='aboutme.html'>About Me</a><span class='spacer'></span>|<span	class='spacer'></span><a href='languages.html'>Languages</a><span class='spacer'></span>|<span class='spacer'></span><a href='platforms.html'>Platforms</a><span class='spacer'></span>|<span class='spacer'></span><a href='androidmarket.html'>Visit Me on the Android Market!</a>");
});

function setStorage(id, value) {
	var i = id+"";
	sessionStorage.i = value;
};

function getStorage(id) {
	var i = id+"";
	return sessionStorage.i;
};
