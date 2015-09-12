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
		this.ctx.drawImage(this.player.image,(pos.x * 32),(pos.y * 32));
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
			}
		}.bind(this))
	}

	GlobalView.prototype.update = function(event){
		console.log('global : event received : ' + event.cmd);
		if (event.cmd === 'loaded'){
			// DO SOMETHING...
			this.drawCanvas(this.activeMap);
			this.drawPlayers(this.activeMap);
		}

	};
	return GlobalView;
}).call(this);