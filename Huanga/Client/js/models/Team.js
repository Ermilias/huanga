function Team(id, name, sprite, members) {
    this.setId(id)
        .setName(name)
        .setTeamSprite(sprite)
        .initMembers(members);
	this.model;
	return this;
}
Team.prototype.setModel = function(model){
	this.model = model;	
	return this;
};

Team.prototype.setId = function(id) {
	this.id = id;
	return this;
};

Team.prototype.setName = function(name) {
	this.name = name;
	return this;
};

Team.prototype.setTeamSprite = function(sprite) {
	this.sprite = sprite;
	return this;
};

Team.prototype.initMembers = function(...members) {
	this.name = name;
	return this;
};

Team.prototype.getName = function() {
	return this.name;
};
Team.prototype.setImageSrc = function(path) {
	this.imageSrc = path;
	console.log(path);
	return this;
};

Team.prototype.getImageSrc = function() {
	return this.imageSrc;
};
Team.prototype.setImage = function(image) {
	this.image = this.getImageSrc() + image;
	console.log(this.image);
	return this;
};

Team.prototype.getImage = function() {
	return this.image;
};

Team.prototype.addMember = function(player) {
	this.members[player.id] = player;
	player.team = this;
	return this;
};

Team.prototype.getMember = function(player) {
	return this.members[player.id];
};

Team.prototype.removeMember = function(player) {
	delete this.members[player.id];
	return this;
};

Team.prototype.updateMember = function(team1, team2, player) {
	team1.addMember(player);
	team2.removeMember(player);
	player.isEaten = true;
	return {add: team1.id, remove: team2.id, player: player.id}
}

Team.prototype.eat = function(player1,player2){
	//this.smokeScreen(player1);
	if (player1.team.id === player2.team.id){
		console.log('ups');
		return false;
	}else{
		var team1 = player1.team;
		var team2 = player2.team;
		var update = {};

		if (team1.name === 'earth' && team2.name === 'water') {
			update = this.updateMember(team1, team2, player2);
		}else if (team1.name === 'water' && team2.name === 'fire') {
			update = this.updateMember(team1, team2, player2);
		}else if (team1.name === 'fire' && team2.name === 'earth') {
			update = this.updateMember(team1, team2, player2);
		}else{
			update = this.updateMember(team2, team1, player1);
		}
		console.log('miam');
		console.log(socket.id,player1.id)
		if ('/#' + socket.id === player1.id){
			socket.emit('updateTeam', update);
		}
	}
};


