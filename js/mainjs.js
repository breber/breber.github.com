// Switch to mobile view if the user agent indicates
// they are on a mobile platform
$().ready(function switchMobile() {
	var uagent = navigator.userAgent.toLowerCase();

	function checkBrowserMobile() {
		return (uagent.search("iphone") > -1) || (uagent.search("ipod") > -1) || (uagent.search("android") > -1);
	};
    
	if (checkBrowserMobile()) {
		window.location = "http://m.brianreber.com";
	}
});

// Set up the navigation bar
$().ready(function(){
    var rightText = [];
    rightText.push("<div class='navbar'>");
    rightText.push("<nav>");
    rightText.push("<a href='index.html'>About</a>");
    rightText.push("<a href='languages.html'>Languages</a>");
    rightText.push("<a href='platforms.html'>Platforms</a>");
    rightText.push("<a href='androidmarket.html'>Android Market</a>");
    rightText.push("<ul id='navbarlist'>");
    rightText.push("<li class='nav' id='2012'><b>2012</b>");
    rightText.push("<ul>");
    rightText.push("<li><a href='cokerewards.html'>Coke Rewards for Android</a></li>");
    rightText.push("</ul></li>");
    rightText.push("<li class='nav' id='2011'><b>2011</b>");
    rightText.push("<ul>");
    rightText.push("<li><a href='twitterpicviewer.html'>Twitter Picture Viewer</a></li>");
    rightText.push("<li><a href='messagingprj.html'>Web-based SMS</a></li>");
    rightText.push("<li><a href='vehiclerecords.html'>Vehicle Log</a></li>");
    rightText.push("<li><a href='binary.html'>Binary Calculator</a></li>");
    rightText.push("</ul></li>");
    rightText.push("<li class='nav' id='2010'><b>2010</b>");
    rightText.push("<ul>");
    rightText.push("<li><a href='agendawidget.html'>Android Agenda Widget</a></li>");
    rightText.push("<li><a href='https://github.com/breber/CyRide'>CyRide for Android</a></li>");
    rightText.push("<li><a href='https://github.com/breber/Number-Guess'>Android Number Guess</a></li>");
    rightText.push("<li><a href='http://home.engineering.iastate.edu/~breber/Minesweeper/minesweeper.html'>Minesweeper</a></li>");
    rightText.push("<li><a href='http://code.google.com/p/iphone-motion-unlock'>iPhone Motion Unlock</a></li>");
    rightText.push("<li><a href='canvastest.html'>HTML5 Canvas Drawing</a></li>");
    rightText.push("<li><a href='mines.html'>HTML5 &amp; jQuery Minesweeper</a></li>");
    rightText.push("</ul></li>");
    rightText.push("</ul>");
    rightText.push("</nav>");
    rightText.push("</div>");
    
    $("div#right").html(rightText.join(""));
    
    
    var socialText = [];
    socialText.push("<a href='http://github.com/breber'><img src='images/github.png' height='46px'/></a>");
    socialText.push("<a href='http://www.linkedin.com/in/breber'><img src='images/linkedin.png' height='46px'/></a>");
    socialText.push("<a href='https://play.google.com/store/apps/developer?id=Brian+Reber'><img src='images/googleplay.png' height='46px'/></a>");
    socialText.push("<a href='https://chrome.google.com/webstore/search/Brian%20Reber'><img src='images/ChromeWebStore.png' height='46px'/></a>");
    socialText.push("<a href='http://appworld.blackberry.com/webstore/vendor/23571/'><img src='images/blackberry.png' height='46px'/></a>");
    
    $("div#social").html(socialText.join(""));
    
	
    $("div#cpyrght").html("<div style='text-align: center'><p>Copyright &copy;<br /> Brian Reber, 2009 - " + new Date().getFullYear() + "</p></div>");
    
    if ($.getUrlVar('barrelRoll') !== undefined) {
        document.body.className = 'barrelRoll';
    }
});

$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name){
        return $.getUrlVars()[name];
    }
});
