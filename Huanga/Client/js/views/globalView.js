var DEPLACEMENT_DURATION = 6;
var ANIMATION_DURATION = 1;

app.views.GlobalView = (function(){
	var Observable = app.libs.Observable;
	function GlobalView(model){
		Observable.call(this);
		this.model = model;
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
		this.addListeners(elem,'keyup');
		//this.addListeners(elem,'click');
		this.addListeners(document, 'DOMContentLoaded');
	};


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

		for (var n = 0; n < this.model.map.mapCol/arenaSize; n++){
			var niSize = (n * arenaSize);
			background[n] = [];
			for (var m = 0; m < this.model.map.mapCol/arenaSize; m++){
				var mjSize = (m * arenaSize);
				for (c = mjSize; c < (mjSize + arenaSize); c++ ){
					if (typeof map[c] === 'object'){
						for (r = niSize; r < (niSize + arenaSize); r++){
							if (typeof map[c][r] === 'object'){
								var image = map[c][r];
								var tile = new Image();
								tile.src = image.getImageSrc() + image.getImage();
								this.model.ctx.drawImage(tile,(c%arenaSize * image.size.width),(r%arenaSize * image.size.height),image.size.width,image.size.height);
								if (c%arenaSize === 15 && r%arenaSize === 15){
									background[n][m] = (this.model.canvas.toDataURL("./image/background" + paint + ".png"));
									paint++;
									this.model.ctx.clearRect(0,0,this.model.canvas.width,this.model.canvas.height);
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
					value =  {key: event.keyCode};
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
		this.model.ctx.clearRect(0,0,this.model.canvas.width,this.model.canvas.height);
		var mapPos = {x: (Math.floor(this.model.player.pos.y / 16)),
				   y: (Math.floor(this.model.player.pos.x / 16))};
		for (id in this.model.players){
			var otherMapPos = {x: (Math.floor(this.model.players[id].pos.y / 16)),
				   y: (Math.floor(this.model.players[id].pos.x / 16))};
			if (mapPos.x === otherMapPos.x && mapPos.y === otherMapPos.y){
				this.model.players[id].drawChar(this.model.activeMap);
			}
		}
		}.bind(this),50);
	}

	GlobalView.prototype.update = function(event){
		console.log('global : event received : ' + event.cmd);
		if (event.cmd === 'loaded'){
			socket.emit('ready');
		}

		if (event.cmd === 'changeState'){
			this.change(event.val);
		}
		if (event.cmd === 'dir'){
			switch (event.val){
				case 'bottom':
					this.model.player.setDirection(0);
				break;
				case 'top':
					this.model.player.setDirection(1);
				break;
				case 'left':
					this.model.player.setDirection(2);
				break;
				case 'right':
					this.model.player.setDirection(3);
				break;
			}
			console.log(this.model.player.id);
			this.model.player.deplacer(this.model.player.look);
		}
	};
	return GlobalView;
}).call(this);