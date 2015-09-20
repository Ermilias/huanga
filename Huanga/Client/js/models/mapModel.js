app.models.MapModel = (function(){
	function MapModel(){
		this.id = '';
		this.mapList = {};
		this.mapTiles = {};
		this.mapTilesList = {};
		this.map = [];
		this.mapCol = 0;
		this.mapRow = 0;
	}

MapModel.prototype.setMapTilesList = function(array){
	for (var i = array.length - 1; i >= 0; i--) {
		this.mapTilesList[i] = [];
		for (key in array[i]){
			var tile = new app.models.TileModel();
			tile.setImage(array[i][key].name);
			tile.setSize(array[i][key].size);
			tile.setIsBlock(array[i][key].isBlock);
			this.mapTilesList[i].push(tile);
		}
	};
	return this;
}

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
}

MapModel.prototype.checkCol = function(pos){
	if (this.mapTiles[pos.x][pos.y].isBlock){
		return false;
	}else{
		return true;
	}
}

	return MapModel;
}).call(this);