app.models.GlobalModel = (function(){
	var Observable = app.libs.Observable;
	function GlobalModel(){
		Observable.call(this);
		this.player = '';
		this.players = {};
		this.canvas = document.getElementById('gameMap');
		this.canvasBg = document.getElementById('canvasBg');
		this.canvasBgArray;
		this.ctx = this.canvas.getContext('2d');
		this.map;
		this.activeMap = [];

	}
	GlobalModel.prototype = Object.create(Observable.prototype);
	GlobalModel.prototype.constructor = GlobalModel;

	GlobalModel.prototype.eat = function(){
		this.notify({cmd:''});
	}
	
	GlobalModel.prototype.changeImage = function(buttonId, state){
		this.notify({cmd:'changeState', val:{buttonId:buttonId, state:state}});
	}

	GlobalModel.prototype.isEaten = function(){
		this.notify({cmd:''});
	}

	GlobalModel.prototype.deplacer = function(dir){
		this.notify({cmd: 'dir', val: dir});
	}

	GlobalModel.prototype.setPlayer = function(player){
		this.player = player;
		return this;
	}

	GlobalModel.prototype.setMap = function(map){
		this.map = map;
		return this;
	}
	GlobalModel.prototype.loaded = function(){
		this.notify({cmd: 'loaded'});
	}

	return GlobalModel;
}).call(this);