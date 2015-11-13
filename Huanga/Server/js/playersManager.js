function Player(){
	this.id = '';

	this.pos = {
			x:0,
			y:0,
		};
	this.teamId = '';
}
Player.prototype.constructor = Player;

Player.prototype.setId =  function(id){
		this.id = id;
	}
Player.prototype.setTeam = function(teamData){

	if (teamData.fire.count < teamData.water.count && teamData.water.count <= teamData.earth.count){
		this.teamId = teamData.fire.id;
		teamData.fire.add();
	}else if (teamData.water.count < teamData.earth.count && teamData.earth.count <= teamData.fire.count){
		this.teamId = teamData.water.id;
		teamData.water.add();
	}else if (teamData.earth.count < teamData.fire.count && teamData.fire.count <= teamData.water.count){
		this.teamId = teamData.earth.id;
		teamData.earth.add();
	}else{		
		var tId = Math.floor(Math.random() * teamData.numberOfTeams);
		for (var team in teamData){
			if (teamData[team].id === tId){
				this.teamId = tId;
				teamData[team].add();
			}
		}
	}

}

Player.prototype.randPos = function(map){
	var pos = {
		x: Math.floor(Math.random() * (map.mapCol - 1)),
		y: Math.floor(Math.random() * (map.mapRow - 1))
	}
	console.log('is Block : ' + (map.activeMap[pos.x][pos.y] === 0 ? true : false));
	if (map.activeMap[pos.x][pos.y] === 0){
		return this.randPos(map);
	}else{
		return pos;
	}
}

Player.prototype.updatePos = function(pos){
	this.pos.x = pos.x || this.pos.x;
	this.pos.y = pos.y || this.pos.y;
}

Player.prototype.checkCol = function(map, pos){
	if (map.activeMap[pos.x][pos.y].isBlock){
		return this.pos;
	}else{
		return pos;
	}
}

module.exports = Player;