app.models.MapModel = (function(){
	function MapModel(){
		this.id = '';
		this.mapList = {};
		this.mapTiles = {};
		this.mapTilesList = {};
		this.map = [];
	}

MapModel.prototype.setMap = function(map){
	this.map = map;
}

MapModel.prototype.generateMap = function(tiles){
	for (row in this.map){
		for (key in this.map[row]){
			var tile = new TileModel()
			tile.setImage(mapTilesList[this.map[row][key]].getImage());
			tile.setSize(mapTilesList[this.map[row][key]].getSize());
			tile.setPosition({x: (row * tile.size.width), y: (key * tile.size.height)});
			this.mapTiles[row][key] = tile;
		}
	}
}



	return MapModel;
}).call(this);