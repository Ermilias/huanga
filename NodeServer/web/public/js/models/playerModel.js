app.models.PlayerModel = (function(){
	function PlayerModel(){
		this.id = '';
		this.team = {};
		this.pos = {x: 0,y: 0};
		this.direction = {top: false, bottom: true, left: false, right: false};
	}

	PlayerModel.prototype.setTeam = function(team){
		this.team = team;
		return this;
	}
	PlayerModel.prototype.setPos = function(pos){
		this.pos.x = pos.x || this.pos.x;
		this.pos.y = pos.y || this.pos.y;
		return this;
	}
	PlayerModel.prototype.setDirection = function(direction){
		this.direction.top = direction.top || false;
		this.direction.bottom = direction.bottom || false;
		this.direction.left = direction.left || false;
		this.direction.right = direction.right || false;
	}

	PlayerModel.prototype.updateViewMap = function(view){
		view.player = this;
	}



	return PlayerModel;
}).call(this);