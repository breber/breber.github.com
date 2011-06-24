$().ready(function(){
	$.get('https://api.github.com/users/breber', callback);

	function callback(ghObject) {
		var githubText = [];
		githubText.push("<div>");
		githubText.push("<img src='" + ghObject.avatar_url + " />");
		guthubText.push("<h4 style='display:inline'>" + ghObject.name + " (" + ghObject.login + ")</h4>");
		githubText.push("</div>");
		$("div#githubwrapper").html(githubText.join(""));
	}
});
