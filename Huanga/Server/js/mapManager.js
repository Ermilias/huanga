var Map = module.exports = {

	maps: [],
	mapCol: 0,
	mapRow: 0,
	activeMap: [],

	setMaps: function(mapsArray){
		Map.maps = mapsArray;
	},

	setActiveMap: function(map){
		Map.activeMap = map;
	},

	generateMap: function(mapSize){
		map = this.createMap(mapSize);
		var mapACL = map.length;
		for (var column = 0; column < mapACL; column++) {
			var mapARL =  map[column].length;
			for (var row = 0; row < map[column].length; row++) {
				if (column === 0 || column === mapACL -1 || row === 0 || row === mapARL -1){
					map[column][row] = 0;
				}
			};
		};
		this.setActiveMap(map);
	},

	createMap: function(mapSize){
		var mapSize = mapSize || 1;
		var	mapPatern = mapSize * mapSize;
		var mapArray = [];
		var finalMap = [];
		for  (var i = 0; i < mapPatern; i++){
			mapArray[i] = Map.maps[Math.floor(Math.random() * Map.maps.length)];
		}

		if (mapSize > 1){
			for (var i = 0; i < mapArray.length; i+=mapSize) {
				for(var j = 0; j < mapArray[i].length; j++){
					if (mapArray[i + mapSize - 1] !== undefined){
						var fusion = Map.joinMap(mapArray,i,j,mapSize);
						finalMap.push(fusion);
					}
				}
			}
			Map.mapCol = finalMap.length;
			Map.mapRow = finalMap.length;
			return finalMap;
		}/*else{
			mapACL = mapArray[0].length;
			for (var column = 0; column < mapACL; column++) {
			mapARL =  mapArray[0][column].length;
				for (var row = 0; row < mapArray[0][column].length; row++) {
					if (column === 0 || column === mapACL -1 || row === 0 || row === mapARL -1){
						mapArray[0][column][row] = 0;
					}
				};
			};
		}*/
		Map.mapCol = mapArray[0].length;
		Map.mapRow = mapArray[0][0].length;
		return mapArray[0];
	},

	joinMap: function(array,column, row, mapSize){
		var fusion = '';
		console.log(column);
		for (var x = 0; x < mapSize; x++){
			/*mapACL = array[column + x].length;
			mapARL =  array[column + x][row].length;
			if (column === 0 || column === mapACL -1 || row === 0 || row === mapARL -1){
				for (var i = 0; i < array[column + x][row].length; i++) {
					array[column + x][row][i] = 0;
				};
			}*/
			if (x === mapSize - 1){
				fusion += array[column + x][row].join();
			}else{
				fusion += array[column + x][row].join() + ',';
			}
		}
		return fusion.split(',');
	}
}