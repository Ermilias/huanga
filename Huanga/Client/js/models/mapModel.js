app.models.MapModel = (function(){
    var Observable = app.libs.Observable;
    
	function MapModel(name){
        Observable.call(this);
        this.name = name;
		this.id = '';
		this.mapList = {};
		this.mapTiles = {};
		this.mapTilesList = {};
		this.tileListWeight = [];
		this.map = [];
		this.mapCol = 0;
		this.mapRow = 0;
	}
MapModel.prototype = Object.create(Observable.prototype);
MapModel.prototype.constructor = MapModel;

MapModel.prototype.setMapTilesList = function(array){
	console.log(array);
	for (var i = array.length - 1; i >= 0; i--) {
		this.mapTilesList[i] = [];
		for (key in array[i]){
			var tile = new app.models.TileModel();
			tile.setImageSrc(array[i][key].path);
			tile.setImage(array[i][key].name);
			tile.setSize(array[i][key].size);
			tile.setIsBlock(array[i][key].isBlock);
			tile.setFactor(array[i][key].factor);
			this.mapTilesList[i].push(tile);
		}
	};
	return this;
}
MapModel.prototype.setTilesWeight = function(array){
	console.log(array);
	this.tilesWeight = array;
	return this;
}

MapModel.prototype.rand = function(min, max) {
    return Math.random() * (max - min) + min;
};
 
MapModel.prototype.getRandomItem = function(list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });
     
    var random_num = this.rand(0, total_weight);
    var weight_sum = 0;
    //console.log(random_num)
     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);
         
        if (random_num <= weight_sum) {
            return list[i];
        }
    }
     
    // end of function
};

MapModel.prototype.getRandTile = function(tileList){
	var key = Math.floor(Math.random() * tileList.length);
	return tileList[key];
}

MapModel.prototype.getMapTilesList = function(){
		return this.mapTilesList;
}
MapModel.prototype.getMapTiles = function(){
		return this.mapTiles;
}
MapModel.prototype.setMap = function(map){
	this.map = map;
	return this;
}
MapModel.prototype.getMap = function(){
	return this.map;
}
MapModel.prototype.updateModelMap = function(model){
	model.activeMap = this.getMapTiles();
	model.setMap(this);
	return this;
}

MapModel.prototype.generateMap = function(){
	var count = 0;
	for (var row = 0; row < this.map.length; row++){
		this.mapTiles[row] = {};
		for (var key = 0; key < this.map[row].length; key++){
			if (this.map[row][key] === 3){
				this.mapTiles[row][key] = this.tempTile;
				this.mapTiles[row][key].canDraw = false;
				continue;
			}
			
			var tileList = this.mapTilesList[this.map[row][key]];
			console.log(this.map[row][key]);
			var mapTile = this.getRandomItem(tileList,this.tilesWeight[this.map[row][key]]);
			
			var tile = new app.models.TileModel();
			tile.setImage(mapTile.getImage());
			tile.setSize(mapTile.getSize());
			tile.setIsBlock(mapTile.getIsBlock());
			tile.setFactor(mapTile.getFactor());
			tile.setPosition({x: (row * tile.size.width), y: (key * tile.size.height)});

			this.mapTiles[row][key] = tile;

			if (this.map[row][key] === 2) {
				var tempTile = new app.models.TileModel();
				tempTile.setImage(mapTile.getImage());
				tempTile.setSize(mapTile.getSize());
				tempTile.setIsBlock(mapTile.getIsBlock());
				tempTile.setFactor(mapTile.getFactor());
				tempTile.setPosition({x: (row * tempTile.size.width), y: (key * tempTile.size.height)});
				this.tempTile = tempTile;
				console.log(tempTile);
				count = 1;
				while (this.map[row][key + count] === 3){
					count += 1;
				}
				console.log(count);
			}
		}
	}
	this.mapCol = key;
	this.mapRow = row;
	return this;
}

/*MapModel.prototype.generateMap_BK = function(){
	for (var row = 0; row < this.map.length; row++){
		this.mapTiles[row] = {};
		for (var key = 0; key < this.map[row].length; key++){
			var tileList = this.mapTilesList[this.map[row][key]];
			var mapTile = this.getRandTile(tileList);
			var tile = new app.models.TileModel();
			tile.setImage(mapTile.getImage());
			tile.setSize(mapTile.getSize());
			tile.setIsBlock(mapTile.getIsBlock());
			tile.setPosition({x: (row * tile.size.width), y: (key * tile.size.height)});
			this.mapTiles[row][key] = tile;
		}
	}
	this.mapCol = key;
	this.mapRow = row;
	return this;
}*/

MapModel.prototype.checkCol = function(pos){
	if (this.mapTiles[pos.x][pos.y].isBlock){
		return false;
	}else{
		return true;
	}
}

	return MapModel;
}).call(this);