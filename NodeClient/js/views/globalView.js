app.views.GlobalView = (function(){
	var Observable = app.libs.Observable;
	function GlobalView(model){
		Observable.call(this);
		this.model = model;
		this.activeMap = [];
		this.canvas = document.getElementById('gameMap');
		this.ctx = this.canvas.getContext('2d');
		this.init();
	}

	GlobalView.prototype = Object.create(Observable.prototype);
	GlobalView.prototype.constructor = GlobalView;
	GlobalView.prototype.init = function(){
		var elem = document;
		var buttons = document.getElementsByClassName('arrowImage');

		for (var i = 0; i < buttons.length; ++i)
		{
			this.addListeners(buttons[i], 'touchstart');
			this.addListeners(buttons[i], 'touchend');
		}
		this.addListeners(window,'keydown');
		this.addListeners(elem,'click');
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
		for (column in map) {
			if (typeof map[column] === 'object'){
				for (row in map[column]) {
					if (typeof map[column][row] === 'object'){
						var image = map[column][row];
						var tile = new Image();
						tile.src = image.getImageSrc() + image.getImage();
						this.ctx.drawImage(tile,image.pos.x,image.pos.y,image.size.width,image.size.height);
					}
				}
			}
		}
	}
	GlobalView.prototype.randPos = function(map){
		console.log(map);
		var pos = {
			x: Math.floor(Math.random() * this.map.mapCol / 32),
			y: Math.floor(Math.random() * this.map.mapRow)
		}

		console.log(pos);
			if (map[pos.x][pos.y].isBlock){
				return this.randPos(map);
			}else{
				return pos;
			}
	}

	GlobalView.prototype.drawPlayers = function(map){
		var pos = this.randPos(map);
		var image = new Image()
		image.src = this.player.team.image;
		this.ctx.drawImage(image, 0, 0, 32, 32, (pos.x * 32),(pos.y * 32), 32, 32);
	}

	GlobalView.prototype.drawChar= function(){
		var frame = 0;
		var moveX = 0;
		var	moveY = 0;

		if(this.estateAnimation >= DEPLACEMENT_DURATION) {
			this.estateAnimation = -1;
		} else if(this.estateAnimation >= 0) {
			frame = Math.floor(this.estateAnimation / ANIMATION_DURATION);
			if(frame > 3) {
				frame %= 6;
			}
			
			var pixelsToGo = 32 - (32 * (this.estateAnimation / DEPLACEMENT_DURATION));
			
			if(this.direction.top) {
				this.player.look = 0;
				moveY = pixelsToGo;
			} else if(this.direction.left) {
				this.player.look = 1;
				moveY = -pixelsToGo;
			} else if(this.direction.bottom) {
				this.player.look = 2;
				moveX = pixelsToGo;
			} else if(this.direction.right) {
				this.player.look = 3;
				moveX = -pixelsToGo;
			}
			this.estateAnimation++;
		}
		
		var image = new Image();
		image.src = this.player.team.image;
		this.ctx.drawImage(
			image,
			32 * frame, this.player.look * 32,
			32, 32,
			(this.player.pos.x * 32) - (32 / 2) + 16 + moveX, (this.player.pos.y * 32) - 32 + 24 + moveY,
			32, 32
		);
	}

	GlobalView.prototype.addListeners = function(elem,onEvent){
		elem.addEventListener(onEvent, function(event){
			event.preventDefault();
			if (event.target.id){
				var value = {};
				if (event.target.parentNode.getElementsByTagName('input')){
					values = event.target.parentNode.getElementsByTagName('input');
					var length = values.length;
					for (var val =0; val < length; val++){
						value[values[val].id] = values[val].value;
					}
				}
				this.notify({cmd: event.target.id, on: onEvent, val: value});
			}else if(onEvent === 'DOMContentLoaded'){
				this.notify({cmd: 'document', on: onEvent, val: value});
			}else if(onEvent === 'keydown'){
				this.notify({cmd: 'window', on: onEvent, val: event.keyCode});
			}
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

	GlobalView.prototype.update = function(event){
		console.log('global : event received : ' + event.cmd);
		if (event.cmd === 'loaded'){
			// DO SOMETHING...
			this.drawCanvas(this.activeMap);
			this.drawPlayers(this.activeMap);
			this.drawChar();
		}

		if (event.cmd === 'changeState'){
			this.change(event.val);
		}
		if (event.cmd === 'draw'){
			this.drawChar();
		}
		if (event.cmd === 'dir'){
			this.player.deplacer(this.player.look);
		}
	};
	return GlobalView;
}).call(this);