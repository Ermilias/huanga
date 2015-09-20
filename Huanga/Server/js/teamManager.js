function Team(id){
	this.id = id;
	this.count = 0;
}
Team.prototype.constructor = Team;

Team.prototype.add = function(){
	this.count++;
}
Team.prototype.remove = function(){
	this.count--;
}
module.exports = Team;