app.models.PlayerModel = (function(){
	function PlayerModel(){
		this.id = '';
		this.team = {};
		this.pos = {x: 0,y: 0};
		this.direction = {top: false, bottom: true, left: false, right: false};
	}



	return PlayerModel;
}).call(this);