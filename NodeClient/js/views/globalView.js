var DEPLACEMENT_DURATION = 6;
var ANIMATION_DURATION = 1;

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
		var body = document.getElementById('body');
		var buttons = document.getElementsByClassName('arrowImage');

		for (var i = 0; i < buttons.length; ++i)
		{
			this.addListeners(buttons[i], 'touchstart');
			this.addListeners(buttons[i], 'touchend');
		}
		this.addListeners(body,'keydown');
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
		var pos = {
			x: Math.floor(Math.random() * this.map.mapCol / 32),
			y: Math.floor(Math.random() * this.map.mapRow)
		}
		if (map[pos.x][pos.y].isBlock){
			return this.randPos(map);
		}else{
			return pos;
		}
	}

	GlobalView.prototype.drawPlayers = function(pos){
		var pos = pos || this.randPos();
		var image = new Image()
		image.src = this.player.team.image;
		this.ctx.drawImage(image, 0, 0, 32, 32, (pos.x * 32),(pos.y * 32), 32, 32);
	}

	GlobalView.prototype.drawChar= function(map){
		var frame = 0;
		var moveX = 0;
		var	moveY = 0;

		if(this.player.estateAnimation >= DEPLACEMENT_DURATION) {
			this.player.estateAnimation = -1;
		} else if(this.player.estateAnimation >= 0) {
			frame = Math.floor(this.player.estateAnimation / ANIMATION_DURATION);
			if(frame > 3) {
				frame %= 6;
			}

			var pixelsToGo = 32 - (32 * (this.player.estateAnimation / DEPLACEMENT_DURATION));

			if(this.player.look === this.player.direction.top) {
				moveY = pixelsToGo;
			} else if(this.player.look === this.player.direction.bottom) {
				moveY = -pixelsToGo;
			} else if(this.player.look === this.player.direction.left) {
				moveX = pixelsToGo;
			} else if(this.player.look === this.player.direction.right) {
				moveX = -pixelsToGo;
			}
			this.player.estateAnimation++;
		}
				this.ctx.clearRect((this.player.prevPos.x * 32) ,(this.player.prevPos.y * 32), 32,32);
				//this.ctx.clearRect((this.player.pos.x * 32) ,(this.player.prevPos.y * 32), 32,32);

		var image = new Image();
		image.src = this.player.team.image;
		this.player.ref.height = image.height / 4;
		this.player.ref.width = image.width / 6;
		var image2 = map[this.player.pos.x][this.player.pos.y];
		var image3 = map[this.player.prevPos.x][this.player.prevPos.y];
		var image4 = map[this.player.pos.x][this.player.prevPos.y];
		var image5 = map[this.player.prevPos.x][this.player.pos.y];
		var tile = new Image();
		tile.src = image2.getImageSrc() + image2.getImage();
		this.ctx.drawImage(tile,this.player.pos.x * 32,this.player.pos.y * 32,image2.size.width,image2.size.height);
		tile.src = image3.getImageSrc() + image3.getImage();
		this.ctx.drawImage(tile,this.player.prevPos.x * 32,this.player.prevPos.y * 32,image3.size.width,image3.size.height);
		tile.src = image4.getImageSrc() + image4.getImage();
		this.ctx.drawImage(tile,this.player.pos.x * 32,this.player.prevPos.y * 32,image4.size.width,image4.size.height);
		tile.src = image5.getImageSrc() + image5.getImage();
		this.ctx.drawImage(tile,this.player.prevPos.x * 32,this.player.pos.y * 32,image5.size.width,image5.size.height);
		this.ctx.drawImage(
			image,
			this.player.ref.width * frame, this.player.look * this.player.ref.height,
			this.player.ref.width, this.player.ref.height,
			(this.player.pos.x * 32) - (this.player.ref.width / 2) + 16 + moveX, (this.player.pos.y * 32) - this.player.ref.height + 32 + moveY,
			this.player.ref.width, this.player.ref.height
		);
	}

	GlobalView.prototype.addListeners = function(elem,onEvent){
		elem.addEventListener(onEvent, function(event){
			event.preventDefault();
			if (event.target.id){
				var value = {};
				if(onEvent === 'keydown'){
					this.notify({cmd: 'window', on: onEvent, val: event.keyCode});
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

	GlobalView.prototype.update = function(event){
		console.log('global : event received : ' + event.cmd);
		if (event.cmd === 'loaded'){
			// DO SOMETHING...
			this.drawCanvas(this.activeMap);
			var setIV = setInterval(function(){
			//this.drawCanvas(this.activeMap);
			//this.drawPlayers(this.activeMap);
			this.drawChar(this.activeMap);
		}.bind(this), 50);
		}

		if (event.cmd === 'changeState'){
			this.change(event.val);
		}
		if (event.cmd === 'dir'){
			switch (event.val){
				case 'top':
					this.player.setDirection(0);
				break;
				case 'left':
					this.player.setDirection(1);
				break;
				case 'bottom':
					this.player.setDirection(2);
				break;
				case 'right':
					this.player.setDirection(3);
				break;
			}
			this.player.deplacer(this.player.look);
			//this.drawChar();
		}
	};
	return GlobalView;
}).call(this);