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
MapModel.prototype.setMap = function(map,size){
	this.map = this.createMap(map,size);
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
}
MapModel.prototype.createMap = function(array, mapSize){
	var mapSize = mapSize || 1;
	var	mapPatern = mapSize * mapSize;
	var mapArray = [];
	var finalMap = [];
	for  (var i = 0; i < mapPatern; i++){
		mapArray[i] = array[Math.floor(Math.random() * array.length)];
	}

	if (mapSize > 1){
		for (var i = 0; i < mapArray.length; i+=mapSize) {
			for(var j = 0; j < mapArray[i].length; j++){
				if (mapArray[i + mapSize - 1] !== undefined){
					var fusion = this.joinMap(mapArray,i,j,mapSize);
					finalMap.push(fusion);
				}
			}
		}
		this.mapCol = finalMap.length;
		this.mapRow = finalMap.length;
		return finalMap;
	}
	this.mapCol = mapArray[0].length;
	this.mapRow = mapArray[0].length;
	return mapArray[0];
}
MapModel.prototype.joinMap = function(array,column, row, mapSize){
	var fusion = '';
	for (var x = 0; x < mapSize; x++){
		if (x === mapSize - 1){
			fusion += array[column + x][row].join();
		}else{
			fusion += array[column + x][row].join() + ',';
		}
	}
	return fusion.split(',');
}


	return MapModel;
}).call(this);