var app = {
	init: function() {
		console.log('Start');
	}
};


var everythingLoaded = setInterval(function () {
	if (/loaded|complete/.test(document.readyState)) {
		clearInterval(everythingLoaded);
		app.init();
	}
},10);
everythingLoaded;