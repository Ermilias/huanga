app.models.GlobalModel = (function() {
    var Observable = app.libs.Observable;

    function GlobalModel(name) {
        Observable.call(this);
        // here goes attributes;
        this.name = name;
        this.resolution = 64;
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

    return GlobalModel;
}).call(this);

	app.models.GlobalModel.prototype.eat = function(){
		this.notify({cmd:''});
	};
	
	app.models.GlobalModel.prototype.changeImage = function(buttonId, state){
		this.notify({cmd:'changeState', val:{buttonId:buttonId, state:state}});
	};

	app.models.GlobalModel.prototype.setResolution = function(newResolution){
		this.resolution = newResolution;
		this.notify({cmd:'updateReso'});
		return this;
	}

	app.models.GlobalModel.prototype.isEaten = function(){
		this.notify({cmd:''});
	};

	app.models.GlobalModel.prototype.deplacer = function(dir){
		this.notify({cmd: 'dir', val: dir});
	};

	app.models.GlobalModel.prototype.setPlayer = function(player){
		this.player = player;
		return this;
	};

	app.models.GlobalModel.prototype.setMap = function(map){
		this.map = map;
		return this;
	};
	app.models.GlobalModel.prototype.loaded = function(){
		this.notify({cmd: 'loaded'});
	};