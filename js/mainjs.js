$().ready(function(){
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
});

function setStorage(id, value) {
	var i = id+"";
	sessionStorage.i = value;
};

function getStorage(id) {
	var i = id+"";
	return sessionStorage.i;
};

$().ready(function switchMobile() {
	var iPhone = "iphone";
	var iPod = "ipod";
	var android = "android";
	var uagent = navigator.userAgent.toLowerCase();

	function detectIphoneOrIpod() {
		if (uagent.search(iPhone) > -1) return true;
		if (uagent.search(iPod) > -1) return true;
		return false;
	};
	function detectAndroid() {
		if (uagent.search(android) > -1) return true;
		return false;
	};
	function checkBrowserMobile() {
		return detectIphoneOrIpod() || detectAndroid();
	};
	if (checkBrowserMobile()) {
		window.location += "/mobile/mobile.html";
	}
});

