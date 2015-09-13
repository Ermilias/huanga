
app.models.PlayerModel = (function(){
	function PlayerModel(){
		this.id = '';
		this.team = {image : "./image/earth.png"};
		this.pos = {x: 0,y: 0};
		this.prevPos = {x: 0,y: 0};
		this.direction = {top: 0,  left: 1, bottom: 2, right: 3};
		this.look = 2;
		this.ref = {height: 0, width: 0};
		this.estateAnimation = -1;
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
	PlayerModel.prototype.setDirection = function(direction){ // {top:true}
		this.look = direction;
	}
	PlayerModel.prototype.setView = function(view){
		this.view = view;
		this.view.player = this;
	}
	PlayerModel.prototype.updateViewMap = function(view){
		view.player = this;
	}
	
	PlayerModel.prototype.deplacer = function(direction) {
		// On ne peut pas se déplacer si un mouvement est déjà en cours !
		if(this.estateAnimation !== -1) {
			return false;
		}

		// On change la direction du personnage
		this.look = direction;
			
		var prochaineCase = this.getCoordonneesAdjacentes(this.look);
		
		// On commence l'animation
		this.estateAnimation = 1;
			
		// On effectue le déplacement
		this.pos.x = prochaineCase.x;
		this.pos.y = prochaineCase.y;
		return true;
	}

	PlayerModel.prototype.getCoordonneesAdjacentes = function(direction) {
	//var coord = {'x' : this.pos.x, 'y' : this.pos.y};
	switch(direction) {
		case this.direction.bottom : 
			this.prevPos.y = this.pos.y;
			this.pos.y++;
			break;
		case this.direction.left : 
			this.prevPos.x = this.pos.x;
			this.pos.x--;
			break;
		case this.direction.right: 
			this.prevPos.x = this.pos.x;
			this.pos.x++;
			break;
		case this.direction.top : 
			this.prevPos.y = this.pos.y;
			this.pos.y--;
			break;
	}
	return this.pos;
}


	return PlayerModel;
}).call(this);