var Team = require('./teamManager.js');
function TeamGenerator(arrayOfTeamsNames,number){
	this.teamsNumber = number;
	this.teamsNames = arrayOfTeamsNames;
	this.teams = this.GenerateTeams(arrayOfTeamsNames,number);
};
TeamGenerator.prototype.constructor = TeamGenerator;

TeamGenerator.prototype.add = function(){
	this.count++;
};
TeamGenerator.prototype.remove = function(){
	this.count--;
};
TeamGenerator.prototype.selectTeam = function(id){
	for (team in this.teams){
		if (typeof this.teams[team] === 'object'){
			if (this.teams[team].id === id){
				console.log(team);
				return this.teams[team];
			}
		}
	}
};

TeamGenerator.prototype.GenerateTeams = function(arrayOfTeamsNames,numberOfTeams){
	var teams = {};
	for (var i = 0; i < numberOfTeams; i++) {
		teams[arrayOfTeamsNames[i]] = new Team(i);
	};
	teams.numberOfTeams = numberOfTeams;
	return teams;
};

TeamGenerator.prototype.setRandTeam = function(player){
	var teams = this.teams;
	var randomBool = true;
	var teamId = 0;
	var min;
	var prev;
	for (team in teams){
		if (typeof teams[team] === 'object'){
			min = typeof min === 'undefined' ? teams[team].count : min;
			console.log(team,' : ',teams[team].count, min,(typeof min !== 'undefined' && teams[team].count < min));
			if (typeof min !== 'undefined' && teams[team].count < min){
				min = teams[team].count;
				teamId = teams[team].id;
			}
			prev = typeof prev === 'undefined' ? teams[team].count : prev;
			randomBool = randomBool && prev === teams[team].count;
			prev = teams[team].count;
			
		}
	}
	console.log(randomBool);
	if (randomBool){
		var tId = Math.floor(Math.random() * teams.numberOfTeams);
		for (var team in teams){
			if (teams[team].id === tId){
				player.teamId = tId;
				teams[team].add();
			}
		}
	}else{
		player.teamId = teamId;
		this.selectTeam(teamId).add();
	}

}

module.exports = TeamGenerator;



//var teamsNames = ['fire','water','earth'];

