var DEPLACEMENT_DURATION = 6;
var ANIMATION_DURATION = 1;

app.views.GlobalView = (function(){
	var Observable = app.libs.Observable;
	function GlobalView(model){
		Observable.call(this);
		this.model = model;
		this.map = {};
		this.player = {};
		this.players = {};
		this.activeMap = [];
		this.canvas = document.getElementById('gameMap');
		this.canvasBg = document.getElementById('canvasBg');
		this.canvasBgArray;
		this.background;
		this.ctx = this.canvas.getContext('2d');
		this.init();
	}

	GlobalView.prototype = Object.create(Observable.prototype);
	GlobalView.prototype.constructor = GlobalView;
	GlobalView.prototype.init = function(){
		var elem = document;
		var body = document.getElementById('body');
		var buttons = document.getElementsByClassName('arrowImage');

		for (var i = 0; i < buttons.length; ++i)
		{
			this.addListeners(buttons[i], 'touchstart');
			this.addListeners(buttons[i], 'touchend');
		}
		this.addListeners(body,'keyup');
		this.addListeners(elem,'click');
		this.addListeners(document, 'DOMContentLoaded');
	};

	GlobalView.prototype.setMap = function(map){
		this.map = map;
		return this;
	}


	GlobalView.prototype.updateGlobalInfo = function(keys){
		for (key in keys){
			if (document.getElementById(key)){
				var elem = document.getElementById(key)
				elem.innerHTML = this.model[key].toString() + keys[key].symb.toString();
			}
		}
	}

	GlobalView.prototype.drawCanvas = function(map){
		var x = 0;
		var y = 0;
		var arenaSize = 16;
		var paint = 0;
		var next = false;
		var background = [];
		var done = false;

		for (var n = 0; n < this.map.mapCol/arenaSize; n++){
			var niSize = (n * arenaSize);
			background[n] = [];
			for (var m = 0; m < this.map.mapCol/arenaSize; m++){
				var mjSize = (m * arenaSize);
				for (c = mjSize; c < (mjSize + arenaSize); c++ ){
					if (typeof map[c] === 'object'){
						for (r = niSize; r < (niSize + arenaSize); r++){
							if (typeof map[c][r] === 'object'){
								var image = map[c][r];
								var tile = new Image();
								tile.src = image.getImageSrc() + image.getImage();
								this.ctx.drawImage(tile,(c%arenaSize * image.size.width),(r%arenaSize * image.size.height),image.size.width,image.size.height);
								if (c%arenaSize === 15 && r%arenaSize === 15){
									background[n][m] = (this.canvas.toDataURL("./image/background" + paint + ".png"));
									paint++;
									this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
								}
							}
						}
					}
				}
			}
		}
		return background;
	}

	GlobalView.prototype.addListeners = function(elem,onEvent){
		elem.addEventListener(onEvent, function(event){
			event.preventDefault();
			if (event.target.id){
				var value = {};
				if(onEvent === 'keyup'){
					this.notify({cmd: event.target.id, on: onEvent, val: event.keyCode});
				}else if (event.target.parentNode.getElementsByTagName('input')){
					values = event.target.parentNode.getElementsByTagName('input');
					var length = values.length;
					for (var val =0; val < length; val++){
						value[values[val].id] = values[val].value;
					}
				}
				this.notify({cmd: event.target.id, on: onEvent, val: value});
			}else if(onEvent === 'DOMContentLoaded'){
				this.notify({cmd: 'document', on: onEvent, val: value});
			}else{};
		}.bind(this))
	}
	
	GlobalView.prototype.change = function(val)
	{
		var button = document.getElementById(val.buttonId);
		var path = '';
		
		if (val.state === 'released')
			path = "./image/" + val.buttonId + ".png";
		else
			path = "./image/" + val.buttonId + "Pressed.png";
		button.src = path;
	}

	GlobalView.prototype.start =  function(){
		var setIV = setInterval(function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		var mapPos = {x: (Math.floor(this.player.pos.y / 16)),
				   y: (Math.floor(this.player.pos.x / 16))};
		for (id in this.players){
			var otherMapPos = {x: (Math.floor(this.players[id].pos.y / 16)),
				   y: (Math.floor(this.players[id].pos.x / 16))};
			if (mapPos.x === otherMapPos.x && mapPos.y === otherMapPos.y){
				this.players[id].drawChar(this.activeMap);
			}
		}
		}.bind(this), 200);
	}

	GlobalView.prototype.update = function(event){
		console.log('global : event received : ' + event.cmd);
		if (event.cmd === 'loaded'){
			
			this.start();
		}

		if (event.cmd === 'changeState'){
			this.change(event.val);
		}
		if (event.cmd === 'dir'){
			switch (event.val){
				case 'bottom':
					this.player.setDirection(0);
				break;
				case 'top':
					this.player.setDirection(1);
				break;
				case 'left':
					this.player.setDirection(2);
				break;
				case 'right':
					this.player.setDirection(3);
				break;
			}
			this.player.deplacer(this.player.look);
		}
	};
	return GlobalView;
}).call(this);