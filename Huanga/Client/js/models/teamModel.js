function Team(id) {
	this.id = id;
	this.name;
	this.imageSrc = '';
	this.image;
	this.model;
	this.members = {};
	this.estateAnimation = -1;
	return this;
}
Team.prototype.setModel = function(model){
	this.model = model;	
	return this;
};

Team.prototype.setName = function(name) {
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

Team.prototype.eat = function(player1,player2){
	//this.smokeScreen(player1);
	if (player1.team.id === player2.team.id){
		console.log('ups');
		return false;
	}else{
		var team1 = player1.team;
		var team2 = player2.team;
		var plus = '';
		var minus = '';
		var playerChanged = '';

		if (team1.name === 'earth' && team2.name === 'water'){
			minus = team2.id;
			plus = team1.id;
			playerChanged = player2.id;
			team2.removeMember(player2);
			team1.addMember(player2);
			player2.isEaten = true;
		}else if (team1.name === 'water' && team2.name === 'fire'){
			minus = team2.id;
			plus = team1.id;
			playerChanged = player2.id;
			team2.removeMember(player2);
			team1.addMember(player2);
			player2.isEaten = true;
		}else if (team1.name === 'fire' && team2.name === 'earth'){
			minus = team2.id;
			plus = team1.id;
			playerChanged = player2.id;
			team2.removeMember(player2);
			team1.addMember(player2);
			player2.isEaten = true;
		}else{
			minus = team1.id;
			plus = team2.id;
			playerChanged = player1.id;
			team1.removeMember(player1);
			team2.addMember(player1);
			player1.isEaten = true;
		}
		console.log('miam');
		if (socket.id === player1.id){
			socket.emit('updateTeam', {add: plus, remove: minus, player: playerChanged});
		}
	}
};


