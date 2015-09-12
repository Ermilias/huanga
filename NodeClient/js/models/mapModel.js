app.models.MapModel = (function(){
	function MapModel(){
		this.id = '';
		this.mapList = {};
		this.mapTiles = {};
		this.mapTilesList = {};
		this.map = [];
	}

MapModel.prototype.setMapTilesList = function(array){
	for (var i = array.length - 1; i >= 0; i--) {
		var tile = new app.models.TileModel();
		tile.setImage(array[i].name);
		tile.setSize(array[i].size);
		tile.setIsBlock(array[i].isBlock);
		this.mapTilesList[i] = tile;
	};
	return this;
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
MapModel.prototype.updateViewMap = function(view){
	view.activeMap = this.getMapTiles();
}

MapModel.prototype.generateMap = function(){
	for (row in this.map){
		this.mapTiles[row] = {};
		for (key in this.map[row]){
			
			var tile = new app.models.TileModel();
			tile.setImage(this.mapTilesList[this.map[row][key]].getImage());
			tile.setSize(this.mapTilesList[this.map[row][key]].getSize());
			
			tile.setPosition({x: (row * tile.size.width), y: (key * tile.size.height)});
			this.mapTiles[row][key] = tile;
		}
	}
}



	return MapModel;
}).call(this);