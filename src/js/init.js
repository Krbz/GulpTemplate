// requestAnim shim layer by Paul Irish
// window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       || 
//           window.webkitRequestAnimationFrame || 
//           window.mozRequestAnimationFrame    || 
//           window.oRequestAnimationFrame      || 
//           window.msRequestAnimationFrame     || 
//           function(/* function */ callback, /* DOMElement */ element){
//             window.setTimeout(callback, 1000 / VAR.fps);
//           };
// })();

var Game, app;

Game = {
	W: 0, 
    H: 0,
    lastTime: 0,
    fps: 10,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	},
	shuffle:function(arr){
		var counter = arr.length; 
		var tmp; 
		var index; 
		while(counter>0){
			counter--;
			index = Math.floor(Math.random() * counter);
			tmp = arr[counter];
			arr[counter] = arr[index];
			arr[index] = tmp;
		}
		return arr;
	},
	heroState: 'stay'
};
app = {
	init: function() {
		Game.canvas = document.getElementById('playground');
		Game.ctx = Game.canvas.getContext('2d');
		this.canvas();
	},
	canvas: function() {
		var _this = this;

		function layout() {
			Game.W = window.innerWidth;
			Game.H = window.innerHeight;
			Game.canvas.width = Game.W;
			Game.canvas.height = Game.H;
		}
		
		function update() {
			Game.ctx.clearRect(0,0,Game.W,Game.H);
			_this.renderCtx();
		}
		function animate() {
			update();
			requestAnimationFrame( animate );
		}
		layout();
		animate();
		//events
		window.addEventListener('resize', layout);
	},
	renderCtx: function() {
		console.log('i');
		Game.ctx.fillStyle = 'red';
		Game.ctx.beginPath();
		Game.ctx.arc(Math.random() * Game.W, Math.random() * Game.H, Game.rand(2,10), 0, Math.PI * 2, false );
		Game.ctx.fill();
	}
};


var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    app.init();
  }
}, 10);