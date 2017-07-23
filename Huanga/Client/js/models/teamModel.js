function TeamModel(id) {
	this.id = id;
	this.name;
	this.imageSrc = '';
	this.image;
	this.model;
	this.members = {};
	this.estateAnimation = -1;
	return this;
}
TeamModel.prototype.setModel = function(model){
	this.model = model;	
	return this;
};

TeamModel.prototype.setName = function(name) {
	this.name = name;
	return this;
};

TeamModel.prototype.getName = function() {
	return this.name;
};
TeamModel.prototype.setImageSrc = function(path) {
	this.imageSrc = path;
	console.log(path);
	return this;
};

TeamModel.prototype.getImageSrc = function() {
	return this.imageSrc;
};
TeamModel.prototype.setImage = function(image) {
	this.image = this.getImageSrc() + image;
	console.log(this.image);
	return this;
};

TeamModel.prototype.getImage = function() {
	return this.image;
};

TeamModel.prototype.addMember = function(player) {
	this.members[player.id] = player;
	player.team = this;
	return this;
};

TeamModel.prototype.getMember = function(player) {
	return this.members[player.id];
};

TeamModel.prototype.removeMember = function(player) {
	delete this.members[player.id];
	return this;
};

<<<<<<< HEAD
TeamModel.prototype.eat = function(player1,player2){
=======
Team.prototype.updateMember = function(team1, team2, player) {
	team1.addMember(player);
	team2.removeMember(player);
	player.isEaten = true;
	return {add: team1.id, remove: team2.id, player: player.id}
}

Team.prototype.eat = function(player1,player2){
>>>>>>> 3b1b3428d94d6884c9b470a835b57cad6efa5966
	//this.smokeScreen(player1);
	if (player1.team.id === player2.team.id){
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


