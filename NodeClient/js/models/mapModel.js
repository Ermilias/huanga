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
	this.map = this.createMap(map);
	return this;
}
MapModel.prototype.getMap = function(){
	return this.map;
}
MapModel.prototype.updateViewMap = function(view){
	view.activeMap = this.getMapTiles();
	view.map = this;
}

MapModel.prototype.generateMap = function(){
	for (row in this.map){
		this.mapTiles[row] = {};
		for (key in this.map[row]){
			var tileList = this.mapTilesList[this.map[row][key]];
			var mapTile = this.getRandTile(tileList);
			var tile = new app.models.TileModel();
			tile.setImage(mapTile.getImage());
			tile.setSize(mapTile.getSize());
			tile.setIsBlock(mapTile.getIsBlock());
			tile.setPosition({x: (row * tile.size.width), y: (key * tile.size.height)});
			this.mapTiles[row][key] = tile;
			this.mapCol++;
		}
		this.mapRow++;
	}
}
MapModel.prototype.createMap = function(array, mapSize){
	var mapSize = mapSize || 1;
	var mapArray = [];
	var finalMap = [];
	for  (var i = 0; i < mapSize; i++){
		console.log(i);
		mapArray[i] = array[Math.floor(Math.random() * array.length)];
	}
	if (mapSize > 1){
		console.log('bug');
		for (var i = 0; i < mapArray.length; i+=2) {
			for(var j = 0; j < mapArray[i].length; j++){
				if (mapArray[i+1] !== undefined){
					var fusion = (mapArray[i][j].join() + ',' + mapArray[i+1][j].join()).split(',');
					finalMap.push(fusion);
				}
			}
		}
		return finalMap;
	}
	return mapArray[0];
}



	return MapModel;
}).call(this);