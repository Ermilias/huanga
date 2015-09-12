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
		for (row in map) {
			if (typeof map[row] === 'object'){
				for (column in map[row]) {
					if (typeof map[row][column] === 'object'){
						//console.log(map[row][column].getImage())
						var image = map[row][column];
						var tile = new Image();
						tile.src = image.getImageSrc() + image.getImage();
						console.log(tile);
						this.ctx.drawImage(tile,image.pos.x,image.pos.y,image.size.width,image.size.height);
					}
				}
			}
		}
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
		}

		if (event.cmd === 'changeState'){
			this.change(event.val);
		}
	};
	return GlobalView;
}).call(this);