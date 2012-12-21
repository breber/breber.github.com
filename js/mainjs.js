// Switch to mobile view if the user agent indicates
// they are on a mobile platform
// $().ready(function switchMobile() {
// 	var uagent = navigator.userAgent.toLowerCase();
//
// 	function checkBrowserMobile() {
// 		return (uagent.search("iphone") > -1) || (uagent.search("ipod") > -1) || (uagent.search("android") > -1);
// 	};
//
// 	if (checkBrowserMobile()) {
// 		window.location = "http://m.brianreber.com";
// 	}
// });

// Set up the navigation bar
$().ready(function(){
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
